import { useMemo, useState } from 'react';
import { CONTACT as EN_CONTACT } from '../content/en/contact';
import { overlay as germanContact } from '../content/de/contact';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { toneOf } from '../lib/signalTones';
import Icon from '../components/ui/Icon';
import CtaButton from '../components/ui/CtaButton';
import HeroDots from '../components/hero/HeroDots';
import CircularSeal from '../components/ui/CircularSeal';

/**
 * Contact.
 *
 * Their page, rebuilt, with the one thing it is missing: somewhere for the
 * message to go. Theirs has no `action` attribute on the form at all —
 * confirmed on the live page, not inferred — so a visitor who types a message
 * and presses send has no idea it went nowhere.
 *
 * This one never claims a delivery it did not make. Two paths, and the visitor
 * is told which one happened:
 *
 * 1. `VITE_CONTACT_ENDPOINT` set — the message is POSTed, and success is
 *    reported only when the response says so.
 * 2. Unset — the form does NOT fake success the way the playbook form does.
 *    It hands the message to the visitor's own mail client, pre-filled, and
 *    says so plainly. A contact form that silently drops messages is worse
 *    than no contact form; the address is right there beside it.
 *
 * Without JavaScript the form cannot submit, which is why the phone number and
 * email address are page content beside it rather than behind it — a no-JS
 * visitor still has two working ways to reach a person.
 *
 * **On the design.** The first build of this page used none of the site's
 * vocabulary and read as a different product: a bare headline, naked inputs on
 * the page ground, and a `<dl>` of hairlines. Everything here now is a device
 * the homepage already owns — the ink pill with its live dot, `headline-type`
 * with one `headline-mark-brand` run, tone-carrying icon tiles from
 * `signalTones`, `card-paper` and `card-ink` surfaces, the corner wash. None
 * of it is new; it was all sitting in the system unused.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanContact.CONTACT };

/**
 * A colour and a glyph per method, by position.
 *
 * The three are an enumeration, not a sequence, so they take the signal set
 * the pillars and the hero already use rather than numbers. Blue, gold, red is
 * the order this site runs them in everywhere else.
 */
const METHOD_META = [
  { icon: 'phone', tone: 'blue' },
  { icon: 'mail', tone: 'gold' },
  { icon: 'mapPin', tone: 'red' },
];

/** Everything the mail client needs, encoded once. */
function mailtoHref({ to, name, email, message }) {
  const subject = `Website enquiry from ${name || 'a visitor'}`;
  const body = [message, '', '—', name, email].filter(Boolean).join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, type = 'text', placeholder, value, onChange, rows }) {
  const shared = {
    id,
    name: id,
    required: true,
    placeholder,
    value,
    onChange: (event) => onChange(event.target.value),
    className:
      'mt-2 w-full rounded-xl border border-hairline bg-white/80 px-4 py-3 text-ink ' +
      'transition-colors placeholder:text-muted hover:border-ink/20 ' +
      'focus-visible:border-accent focus-visible:outline focus-visible:outline-2 ' +
      'focus-visible:outline-offset-2 focus-visible:outline-accent',
  };

  return (
    <p>
      <label htmlFor={id} className="micro-label text-ink">
        {label}
      </label>
      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} />}
    </p>
  );
}

/**
 * One way to reach a person, carrying its own colour, as a row inside the ink
 * panel.
 *
 * The label takes `tone.onInk` rather than `tone.text`: the plain signal hues
 * are chosen to sit on paper and go muddy on ink, which is the whole reason
 * `signalTones` carries a second set. The filled tile keeps its full-strength
 * colour, since it is a block rather than type.
 */
function MethodRow({ method, meta }) {
  const tone = toneOf(meta.tone);

  return (
    <li data-reveal data-reveal-group="contact-methods" className="group flex items-start gap-4">
      <span
        aria-hidden="true"
        className={`grid size-9 shrink-0 place-items-center rounded-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 ${tone.tile}`}
      >
        <Icon name={meta.icon} className="size-4" />
      </span>

      <span className="min-w-0">
        <span className={`micro-label block ${tone.onInk}`}>{method.label}</span>
        <span className="mt-1 block font-display text-lg font-extrabold tracking-tight text-paper">
          {method.href ? (
            <a
              href={method.href}
              className="underline decoration-ink-line underline-offset-4 transition-colors hover:decoration-paper"
            >
              {method.value}
            </a>
          ) : (
            method.value
          )}
        </span>
      </span>
    </li>
  );
}

export default function ContactPage() {
  const CONTACT = usePageContent(EN_CONTACT, OVERLAYS);
  const ref = useRevealOnScroll();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  /* 'idle' | 'submitting' | 'posted' | 'handoff' | 'error' */
  const [status, setStatus] = useState('idle');
  /* A hidden field no human fills in. A bot that fills everything gets a
     silent no-op rather than a message in the inbox. */
  const [trap, setTrap] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  const emailAddress = useMemo(
    () => CONTACT.methods.find((m) => m.href?.startsWith('mailto:'))?.value,
    [CONTACT.methods],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    if (trap) return;

    if (!endpoint) {
      /* No endpoint: hand the message to their mail client and say so. This
         is deliberately not a fake success — see the header. */
      window.location.href = mailtoHref({ to: emailAddress, name, email, message });
      setStatus('handoff');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, source: 'contact' }),
      });
      setStatus(response.ok ? 'posted' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const { form } = CONTACT;
  const [headStart, headMark, headTail] = ['How can we ', 'help', '?'];

  return (
    /* Not `section-band`. That is py-16/20/24, which is shorter than the
       floating header, so the eyebrow landed under it — the same reason
       `PlaybookPage` sets its own top padding rather than using the band. The
       first section of a page has to clear the header and then leave room to
       breathe; a band between two sections does not. */
    <section
      ref={ref}
      className="brand-ground relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-24"
    >
      {/* The same dot field the homepage hero mounts, not a CSS imitation of
          it. Lazy, and its IntersectionObserver unmounts the canvas once this
          section scrolls away, so the rAF loop does not outlive the view. */}
      <HeroDots />

      <div className="site-shell">
        {/* The ink pill with its live dot — the homepage opens on this, and a
            page about 24/7 support is the one other place a "we are awake"
            indicator means something. */}
        <p
          data-reveal
          data-reveal-group="contact"
          className="inline-flex max-w-full items-center gap-x-2.5 rounded-full bg-ink px-4 py-2 font-label text-[0.7rem] font-semibold tracking-[0.14em] text-paper uppercase shadow-lift"
        >
          <span aria-hidden="true" className="relative grid size-2 place-items-center">
            <span className="absolute size-2 rounded-full bg-signal-green-soft/70 motion-safe:animate-ping" />
            <span className="size-2 rounded-full bg-signal-green-soft" />
          </span>
          {CONTACT.eyebrow}
        </p>

        <h1
          className="mt-8 text-[length:var(--text-hero)] leading-[0.95]"
          data-reveal
          data-reveal-group="contact"
        >
          {headStart}
          <span className="headline-mark-brand">{headMark}</span>
          {headTail}
        </h1>

        <p
          className="mt-7 max-w-2xl font-serif text-2xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group="contact"
        >
          {CONTACT.lead}
        </p>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14">
          {/* One ink panel holding every way to reach a person that does not
              depend on this form working, or on JavaScript running at all.
              Weighting it against the white form is the point: the block a
              hesitant visitor needs is the solid one, and the form is the
              optional half. */}
          <div
            className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-ink p-8 sm:p-10"
            data-reveal
            data-reveal-group="contact-methods"
          >
            {/* The corner wash the pillar cards use, in the accent, so the
                panel is not a flat rectangle of black. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-gradient-to-br from-signal-blue/25 to-transparent blur-3xl"
            />

            {/* Same shape as the form panel opposite: a title, a note, a rule.
                A heading on one side of a two-column layout and not the other
                reads as something half-finished. */}
            <div className="border-b border-ink-line pb-5">
              <p className="font-display text-xl font-extrabold tracking-tight text-paper">
                {CONTACT.methodsTitle}
              </p>
              <p className="mt-1.5 text-sm text-muted-dark">{CONTACT.intro}</p>
            </div>

            <ul className="mt-8 grid gap-6">
              {CONTACT.methods.map((method, i) => (
                <MethodRow
                  key={method.label}
                  method={method}
                  meta={METHOD_META[i % METHOD_META.length]}
                />
              ))}
            </ul>

            {/* The seal fills the space `mt-auto` opens between the methods
                and the second door, and restates the page's promise as a
                continuous thing rather than a line of text. The eyebrow pill
                above said the same words; a ring that never stops turning
                says them better, so the pill went back to being an eyebrow. */}
            <div className="mt-8 flex justify-end">
              <CircularSeal text={CONTACT.seal} className="text-signal-green-soft" />
            </div>

            {/* The second door, at the foot of the panel: the way out for
                someone who came to ask whether this is worth it and would
                rather read than write. `mt-auto` pins it to the bottom so the
                panel's base lines up with the form's however the rows fall. */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-5 border-t border-ink-line pt-8">
              <span className="min-w-0">
                <span className="block font-display text-base font-extrabold tracking-tight text-paper">
                  {CONTACT.secondDoor.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-dark">
                  {CONTACT.secondDoor.body}
                </span>
              </span>

              <CtaButton href={CONTACT.secondDoor.cta.href} variant="onInk">
                {CONTACT.secondDoor.cta.label}
              </CtaButton>
            </div>
          </div>

          {/* The brand ramp runs in this panel's border and nowhere else on
              the page. It is the one surface asking the visitor for something,
              so it is the one that earns the emphasis — the same reason the
              hero puts the ramp on its primary button and its marked phrase
              and then stops. */}
          <form
            onSubmit={onSubmit}
            className="panel-brand-outline grid gap-5 rounded-2xl p-6 shadow-lift sm:p-8"
            data-reveal
            data-reveal-group="contact-form"
          >
            <div className="border-b border-hairline pb-5">
              <p className="font-display text-xl font-extrabold tracking-tight">
                {form.panelTitle}
              </p>
              <p className="mt-1.5 text-sm text-muted">{form.panelNote}</p>
            </div>

            <Field
              id="name"
              label={form.name.label}
              placeholder={form.name.placeholder}
              value={name}
              onChange={setName}
            />
            <Field
              id="email"
              type="email"
              label={form.email.label}
              placeholder={form.email.placeholder}
              value={email}
              onChange={setEmail}
            />
            <Field
              id="message"
              label={form.message.label}
              placeholder={form.message.placeholder}
              value={message}
              onChange={setMessage}
              rows={6}
            />

            {/* The trap. Off-screen rather than display:none, because some
                bots skip hidden inputs, and never announced or focusable. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
              className="absolute left-[-9999px] size-px opacity-0"
            />

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? form.sending : form.submit}
              </button>
              <span className="font-serif text-base italic text-muted">
                A real person, usually the same day.
              </span>
            </div>

            {/* One live region, so a screen reader hears the outcome without
                the message moving focus. */}
            <p aria-live="polite" className="text-base leading-relaxed text-muted empty:hidden">
              {status === 'handoff' && (
                <>
                  {form.handoff} <span className="block">{form.handoffFallback}</span>
                </>
              )}
              {status === 'posted' && form.done}
              {status === 'error' && form.error}
            </p>
          </form>
        </div>

        <p
          className="mt-16 max-w-3xl border-t border-hairline pt-8 font-serif text-xl leading-relaxed italic text-muted"
          data-reveal
          data-reveal-group="contact"
        >
          {CONTACT.closing}
        </p>
      </div>
    </section>
  );
}
