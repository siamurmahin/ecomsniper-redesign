import { useState } from 'react';
import Seo from '../components/ui/Seo';
import { FOUNDERS, PLAYBOOK, SITE } from '../data/siteContent';
import Icon from '../components/ui/Icon';
import CtaButton from '../components/ui/CtaButton';
import playbookCover from '../assets/brand/playbook-cover.webp';

/** The author's portrait, resolved the way the founders section resolves it. */
const PORTRAITS = import.meta.glob('../assets/people/*.jpg', { eager: true, import: 'default' });
const author = FOUNDERS.people[0];
const authorPortrait = PORTRAITS[`../assets/people/${author.photo}.jpg`];
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * /free-playbook — the top of the nurture funnel.
 *
 * This is the destination for every "not ready yet" exit on the site: the hero
 * secondary CTA, the final second door, and the exit-intent offer. It is
 * deliberately a single-purpose page with no navigation competition below the
 * fold — one field, one button, one promise.
 *
 * The form posts to whichever ESP endpoint is configured; wire
 * VITE_PLAYBOOK_ENDPOINT to the list that fires the 5-email sequence.
 */
export default function PlaybookPage() {
  const sectionRef = useRevealOnScroll({ start: 'top 95%' });
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [email, setEmail] = useState('');

  const endpoint = import.meta.env.VITE_PLAYBOOK_ENDPOINT;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');

    // No endpoint configured yet: succeed locally so the page is demonstrable,
    // and log loudly so it is obvious this still needs wiring before launch.
    if (!endpoint) {
      console.warn('[playbook] VITE_PLAYBOOK_ENDPOINT is not set — submission not sent.');
      setStatus('done');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free-playbook' }),
      });
      setStatus(response.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Seo
        title="The Invisible Store — Free eBay Dropshipping Playbook | EcomSniper"
        description="A free 83 page playbook on how eBay dropshipping actually works with no stock, no website and no experience. Includes whether it is even allowed, and who EcomSniper is wrong for."
        path="/free-playbook"
      />

      <section ref={sectionRef} className="pb-20 pt-36 sm:pt-44">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            {/* The book itself. It was the one thing missing from its own
                landing page: the cover was in the exit-intent dialog and
                nowhere here, so the page asked for an email in exchange for
                something the reader could not see. */}
            <div
              data-reveal
              data-reveal-group="playbook"
              className="relative mx-auto max-w-xs lg:max-w-none"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full bg-accent/20 blur-3xl"
              />
              <img
                src={playbookCover}
                alt="The Invisible Store, the free EcomSniper playbook"
                width={855}
                height={1370}
                className="w-full drop-shadow-[0_30px_60px_rgba(30,31,35,0.28)]"
              />
            </div>

            <div>
              <p className="section-eyebrow" data-reveal data-reveal-group="playbook">
                {PLAYBOOK.eyebrow}
              </p>

              <h1
                className="mt-5 text-[length:var(--text-hero)] leading-[0.95]"
                data-reveal
                data-reveal-group="playbook"
              >
                {PLAYBOOK.headline}
              </h1>

              <p
                className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
                data-reveal
                data-reveal-group="playbook"
              >
                {PLAYBOOK.lead}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {PLAYBOOK.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    data-reveal
                    data-reveal-group="playbook-bullets"
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed"
                  >
                    {/* Was the raw brand green at about 2.4:1 on paper, the
                        same fault already fixed in sections 11 and 12. */}
                    <span
                      aria-hidden="true"
                      className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-signal-green/15 text-signal-green-deep"
                    >
                      <Icon name="check" className="size-2.5" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Capture form */}
              <div
                data-reveal
                data-reveal-group="playbook-form"
                className="mt-9 rounded-3xl border border-hairline bg-white p-6 shadow-lift sm:p-8"
              >
                {status === 'done' ? (
                  <div role="status">
                    <span
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-full bg-signal-green text-ink"
                    >
                      <Icon name="check" className="size-5" />
                    </span>

                    <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
                      {PLAYBOOK.done.title}
                    </h2>

                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {PLAYBOOK.done.body}
                    </p>

                    {/* The file, handed over here rather than only promised by
                        email. `download` so it saves instead of opening a
                        reader in a new tab and losing the page behind it. */}
                    <a
                      href={PLAYBOOK.file.href}
                      download={PLAYBOOK.file.name}
                      data-cta-intent="playbook-download"
                      className="btn-primary mt-6 w-full"
                    >
                      <Icon name="openBook" className="size-4 shrink-0" aria-hidden="true" />
                      {PLAYBOOK.done.downloadCta}
                    </a>

                    <p className="mt-3 text-center text-xs text-muted">
                      PDF · {PLAYBOOK.file.pages} pages · {PLAYBOOK.file.size}
                    </p>

                    {/* The only place on this site that asks for money from
                        somebody who has just been given something free, so it
                        is ruled off as a separate thought and carries the
                        guarantee rather than pressing. */}
                    <div className="mt-7 border-t border-hairline pt-6">
                      <p className="font-display text-lg font-bold leading-snug">
                        {PLAYBOOK.done.upsell.title}
                      </p>

                      <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                        {PLAYBOOK.done.upsell.body}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <CtaButton
                          href={SITE.startCta.href}
                          intent="playbook-signup"
                          className="w-full sm:w-auto"
                        >
                          Start for $97
                        </CtaButton>

                        <a
                          href={SITE.discordUrl}
                          rel="noopener noreferrer"
                          className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
                        >
                          Or join the Discord first
                        </a>
                      </div>

                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-signal-green-deep">
                        <Icon name="shield" className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                        {SITE.guarantee}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                      Where should we send it?
                    </h2>

                    <label htmlFor="playbook-email" className="mt-5 block text-sm font-medium">
                      Email address
                    </label>

                    <input
                      id="playbook-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      aria-describedby="playbook-smallprint"
                      className="mt-2 w-full rounded-2xl border border-hairline bg-paper px-4 py-3.5 text-base outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-ink"
                    />

                    {status === 'error' && (
                      <p role="alert" className="mt-3 text-sm text-signal-red-deep">
                        That did not send. Try again, or email us and we will pass it on manually.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Sending…' : PLAYBOOK.formCta}
                    </button>

                    {/* Both of these were already written and neither was on
                        the page. The exit-intent dialog was the only thing
                        rendering them. */}
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {PLAYBOOK.reassurances.map((item) => (
                        <li key={item} className="flex items-center gap-1.5 text-xs text-muted">
                          <Icon
                            name="check"
                            className="size-3 shrink-0 text-signal-green-deep"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                      <Icon name="shield" className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                      {PLAYBOOK.privacy}
                    </p>

                    <p id="playbook-smallprint" className="mt-3 text-xs leading-relaxed text-muted">
                      {PLAYBOOK.smallprint}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who wrote it. Their own page runs a "meet the author" block and it is
          the right instinct: a free book from nobody is a lead magnet, a free
          book from the person who built the software is the software's own
          argument. The facts are the founders section's, so there is no second
          version of his history to keep in step — and none of the figures
          their page attaches to him. */}
      <section aria-labelledby="playbook-author" className="section-band bg-paper-sunk">
        <div className="site-shell">
          <div className="grid gap-8 rounded-3xl border border-hairline bg-white p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-10">
            <img
              src={authorPortrait}
              alt={author.name}
              width={200}
              height={200}
              loading="lazy"
              className="mx-auto size-28 rounded-full object-cover sm:mx-0 sm:size-32"
            />

            <div>
              <p className="section-eyebrow">Written by</p>

              <h2
                id="playbook-author"
                className="mt-3 font-display text-2xl font-extrabold tracking-tight"
              >
                {author.name}
              </h2>

              <p className="mt-1 text-sm text-muted">{author.role}</p>

              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                {/* Just his own line. Appending FOUNDERS.closer put "still
                    running stores today" and "we still run stores" in the same
                    paragraph. */}
                {author.detail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
