import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";
import { CONSULT } from "../../data/siteContent";
import { useModalLayer } from "../../hooks/useModalLayer";
import { alreadyInterrupted, claimInterruption } from "../../lib/interruptions";

/** Both fields, so the pair cannot drift apart. */
const FIELD_CLASS =
  "mt-2.5 w-full rounded-full border border-ink-line bg-paper/[0.06] px-5 py-3 text-sm text-paper placeholder:text-muted-dark focus:border-accent-soft focus:outline-none";

/**
 * The consultation offer.
 *
 * Opens once a visitor reaches section 07 — the point where the page stops
 * talking about them and starts talking about the software, which is where
 * someone either leans in or begins wondering whether any of it applies to
 * them. That is the question this answers, so it is asked there rather than at
 * a scroll percentage: a percentage is a different place on a phone than on a
 * desktop, and this one has to land on a specific argument.
 *
 * Once per visitor, and it shares one interruption with the exit-intent
 * dialog, so nobody is stopped twice in a visit.
 */
export default function ConsultOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const endpoint = import.meta.env.VITE_CONSULT_ENDPOINT;

  const close = useCallback(() => {
    setIsOpen(false);
    previouslyFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    if (alreadyInterrupted(CONSULT.storageKey)) return undefined;

    let observer;
    let openTimer;

    const open = () => {
      previouslyFocused.current = document.activeElement;
      claimInterruption(CONSULT.storageKey);
      setIsOpen(true);
    };

    /*
     * The trigger section is mounted a frame after the hero by
     * DeferUntilPainted, so it does not exist when this effect runs. Looking
     * it up once and keeping the result is exactly the bug the sticky bar had:
     * the lookup returns null, stays null, and the thing never fires. Poll
     * until it appears, then stop polling.
     */
    const pollStartedAt = performance.now();
    const findTarget = window.setInterval(() => {
      const target = document.getElementById(CONSULT.triggerId);

      // Give up rather than poll forever on a page that has no such section.
      if (!target) {
        if (performance.now() - pollStartedAt > 15000)
          window.clearInterval(findTarget);
        return;
      }

      window.clearInterval(findTarget);

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          // A beat after it lands, so the dialog does not race the section in.
          openTimer = window.setTimeout(open, 900);
        },
        // A third of the way in: reached and being read, not merely clipped.
        { threshold: 0, rootMargin: "-33% 0px -33% 0px" },
      );

      observer.observe(target);
    }, 200);

    return () => {
      window.clearInterval(findTarget);
      window.clearTimeout(openTimer);
      observer?.disconnect();
    };
  }, []);

  useModalLayer(isOpen, { onClose: close, dialogRef });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email || status === "submitting") return;

    setStatus("submitting");

    // No endpoint configured yet: succeed locally so the flow is demonstrable,
    // and log loudly so it is obvious this still needs wiring before launch.
    // Same contract as the playbook form, deliberately.
    if (!endpoint) {
      console.warn(
        "[consult] VITE_CONSULT_ENDPOINT is not set — submission not sent.",
      );
      setStatus("done");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "consultation" }),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        tabIndex={-1}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-ink text-paper shadow-float"
        style={{ animation: "consult-in 520ms var(--ease-out-expo) both" }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-accent/25 blur-3xl"
        />

        {/* A form has to be abandonable without hunting for the backdrop. */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-ink-line text-muted-dark transition-colors duration-200 hover:border-paper/40 hover:text-paper"
        >
          <Icon name="close" className="size-3" aria-hidden="true" />
        </button>

        <div className="relative p-5 sm:p-9">
          {status === "done" ? (
            <div>
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full bg-signal-green text-ink"
              >
                <Icon name="check" className="size-5" />
              </span>

              <h2
                id="consult-title"
                className="mt-5 font-display text-2xl font-extrabold"
              >
                {CONSULT.done.title}
              </h2>

              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-dark">
                {CONSULT.done.body}
              </p>

              <button type="button" onClick={close} className="btn-on-ink mt-7">
                Back to the page
              </button>
            </div>
          ) : (
            <>
              <p className="section-eyebrow section-eyebrow-on-ink">
                {CONSULT.eyebrow}
              </p>

              <h2
                id="consult-title"
                className="mt-3 font-display text-[1.6rem] font-extrabold leading-[1.08] sm:text-[length:var(--text-section)]"
              >
                {CONSULT.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-dark sm:mt-4 sm:text-[0.95rem]">
                {CONSULT.body}
              </p>

              <ul className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-2.5">
                {CONSULT.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[0.9rem] leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-signal-green text-ink"
                    >
                      <Icon name="check" className="size-2.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Stacked, not a row. The button's label is five words long, so
                  beside it the email field collapsed to about 170px — narrower
                  than the address it was asking for, with the placeholder
                  clipped before anyone had typed anything. */}
              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-5 flex flex-col gap-3 sm:mt-7 sm:gap-4"
              >
                {/* Side by side on anything wider than a phone, stacked below.
                    The pair is one question — who are you and where do we
                    write — so it reads as one row rather than two steps. */}
                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label
                      htmlFor="consult-name"
                      className="block text-sm font-medium"
                    >
                      {CONSULT.nameLabel}
                    </label>

                    <input
                      id="consult-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={CONSULT.namePlaceholder}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="consult-email"
                      className="block text-sm font-medium"
                    >
                      {CONSULT.fieldLabel}
                    </label>

                    <input
                      id="consult-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder={CONSULT.placeholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-on-ink w-full disabled:opacity-60"
                    data-cta-intent="consult-submit"
                  >
                    {status === "submitting" ? "Sending…" : CONSULT.cta}
                  </button>
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-3 text-xs text-signal-red-soft">
                    {CONSULT.error}
                  </p>
                )}

                {/* The mark is inline rather than a flex child. As a flex
                    child the text node took the rest of the row, so there was
                    nothing for justify-center to move: the sentence centred
                    inside its own box and the shield stayed pinned to the far
                    left of the card. Inline, it sits against the first word
                    and the whole line centres together. */}
                <p className="mt-4 text-center text-xs leading-relaxed text-muted-dark sm:text-left">
                  <Icon
                    name="shield"
                    className="me-2 inline-block size-3.5 align-[-2px]"
                    aria-hidden="true"
                  />
                  {CONSULT.privacy}
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="self-center text-xs text-muted-dark underline underline-offset-4 transition-colors duration-200 hover:text-paper sm:self-start"
                >
                  {CONSULT.dismiss}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes consult-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
