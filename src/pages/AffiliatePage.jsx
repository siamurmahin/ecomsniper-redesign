import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AFFILIATE as EN_AFFILIATE } from '../content/en/affiliate';
import { overlay as germanAffiliate } from '../content/de/affiliate';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { toneOf } from '../lib/signalTones';
import CtaButton from '../components/ui/CtaButton';
import HeroDots from '../components/hero/HeroDots';
import Icon from '../components/ui/Icon';

/**
 * The affiliate programme — the offer, and the application.
 *
 * **This page has no equivalent on their site.** `/affiliate` renders a blank
 * white document there: their router carries no such route, only
 * `/affiliate/join`, which is the contract. Their footer then links
 * "Affiliate" at `/login`. So the programme is, on their live site,
 * simultaneously unlinked and unexplained. This page is the missing half; the
 * contract keeps its own page at `/affiliate/terms`.
 *
 * **The hero shows the payout terms rather than a number.** Clause 7 declines
 * to state a commission rate, so there is no rate to headline and inventing
 * one would be writing the company's offer for it. What the contract does
 * state is concrete — quarterly, PayPal, $100, 18+ — and that is the panel.
 * It is the one loud thing on the page; everything under it is quiet.
 *
 * The steps carry numbers because applying, promoting and being paid is a
 * real sequence. Nothing else here is numbered.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAffiliate.AFFILIATE };

/** Their device: a run of the headline set in an inverted block. */
function Marked({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        part.mark ? (
          <span key={i} className="headline-mark-ink">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/**
 * The payout terms, as one ink panel.
 *
 * Deliberately shaped like a statement rather than a marketing card: the
 * facts are the offer here, and dressing them up would be covering for the
 * rate the contract will not give.
 */
function PayoutPanel({ facts }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-ink shadow-lift">
      <ul className="grid grid-cols-2">
        {facts.map((fact, i) => {
          const tone = toneOf(fact.tone);
          return (
            <li
              key={fact.label}
              /* Hairlines drawn per cell rather than as a grid gap: a gap on
                 ink shows the page behind it and breaks the panel into four
                 floating boxes. */
              className={`p-6 lg:p-7 ${i % 2 === 0 ? 'border-r border-ink-line' : ''} ${
                i < 2 ? 'border-b border-ink-line' : ''
              }`}
            >
              <span className={`micro-label block ${tone.onInk}`}>{fact.label}</span>
              <span className="mt-2 block font-display text-2xl font-extrabold tracking-tight text-paper lg:text-3xl">
                {fact.value}
              </span>
              <span className="mt-1.5 block text-sm leading-snug text-muted-dark">{fact.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** One labelled field. Same shape the contact form uses. */
function Field({ id, copy, type = 'text', value, onChange, rows, required = true }) {
  const shared = {
    id,
    name: id,
    required,
    placeholder: copy.placeholder,
    value,
    onChange: (event) => onChange(event.target.value),
    className:
      'mt-2.5 w-full rounded-xl border border-hairline bg-white/80 px-5 py-4 text-base text-ink ' +
      'transition-colors placeholder:text-muted hover:border-ink/20 ' +
      'focus-visible:border-accent focus-visible:outline focus-visible:outline-2 ' +
      'focus-visible:outline-offset-2 focus-visible:outline-accent',
  };

  return (
    <p>
      <label htmlFor={id} className="micro-label text-ink">
        {copy.label}
      </label>
      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} />}
    </p>
  );
}

/** Everything the mail client needs, encoded once. */
function mailtoHref({ to, application }) {
  const subject = `Affiliate application from ${application.name || 'a visitor'}`;
  const body = [
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Country: ${application.country}`,
    `Audience: ${application.audience}`,
    '',
    'Where they would promote it:',
    application.channels,
    '',
    'Links:',
    application.links,
  ].join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const CONTACT_EMAIL = 'management@ecomsniper.io';

export default function AffiliatePage() {
  const AFFILIATE = usePageContent(EN_AFFILIATE, OVERLAYS);
  const heroRef = useRevealOnScroll();
  const stepsRef = useRevealOnScroll();
  const applyRef = useRevealOnScroll();
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);

  const [application, setApplication] = useState({
    name: '',
    email: '',
    country: '',
    audience: '',
    channels: '',
    links: '',
  });
  /* 'idle' | 'submitting' | 'posted' | 'handoff' | 'error' */
  const [status, setStatus] = useState('idle');
  /* A hidden field no human fills in. A bot that fills everything gets a
     silent no-op rather than an application in the inbox. */
  const [trap, setTrap] = useState('');

  const endpoint = import.meta.env.VITE_AFFILIATE_ENDPOINT;
  const set = (key) => (value) => setApplication((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    if (trap) return;

    if (!endpoint) {
      /* No endpoint: hand the application to their mail client and say so.
         Deliberately not a fake success — the same rule the contact form is
         built on, and the reason neither page shows a tick for something that
         never left the browser. */
      window.location.href = mailtoHref({ to: CONTACT_EMAIL, application });
      setStatus('handoff');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...application, source: 'affiliate' }),
      });
      setStatus(response.ok ? 'posted' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const { form, terms } = AFFILIATE;
  const termsHref = pathForLanguage(terms.cta.href, language);

  return (
    <>
      <section
        ref={heroRef}
        className="brand-ground relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-24"
      >
        <HeroDots />

        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="section-eyebrow" data-reveal data-reveal-group="aff-hero">
                {AFFILIATE.eyebrow}
              </p>

              <h1
                className="mt-5 max-w-[15ch] text-[length:var(--text-hero)] leading-[0.95]"
                data-reveal
                data-reveal-group="aff-hero"
              >
                <Marked parts={AFFILIATE.headlineParts} />
              </h1>

              <p
                className="mt-6 max-w-xl font-serif text-2xl leading-relaxed italic text-muted"
                data-reveal
                data-reveal-group="aff-hero"
              >
                {AFFILIATE.lead}
              </p>

              <div
                className="mt-9 flex flex-wrap items-center gap-4"
                data-reveal
                data-reveal-group="aff-hero"
              >
                <CtaButton href={AFFILIATE.ctas.primary.href} intent="affiliate-apply">
                  {AFFILIATE.ctas.primary.label}
                </CtaButton>
                <CtaButton href={termsHref} variant="secondary" intent="affiliate-to-terms">
                  {AFFILIATE.ctas.secondary.label}
                </CtaButton>
              </div>
            </div>

            {/* The one loud thing on the page. */}
            <div data-reveal data-reveal-group="aff-hero">
              <PayoutPanel facts={AFFILIATE.facts} />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stepsRef}
        aria-labelledby="aff-steps-headline"
        className="section-band defer-render bg-paper-sunk [--defer-h:1500px] lg:[--defer-h:900px]"
      >
        <div className="site-shell">
          <p className="section-eyebrow" data-reveal data-reveal-group="aff-steps-head">
            {AFFILIATE.steps.eyebrow}
          </p>

          <h2
            id="aff-steps-headline"
            className="mt-4 max-w-[18ch] text-[length:var(--text-section)] leading-[1.05]"
            data-reveal
            data-reveal-group="aff-steps-head"
          >
            <Marked parts={AFFILIATE.steps.headlineParts} />
          </h2>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {AFFILIATE.steps.items.map((step, i) => {
              const tone = toneOf(step.tone);
              return (
                <li key={step.title} data-reveal data-reveal-group={`aff-step-${i}`}>
                  <span
                    className={`grid size-11 place-items-center rounded-xl font-display text-sm font-extrabold ${tone.tile}`}
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        ref={applyRef}
        id={form.id}
        aria-labelledby="aff-form-headline"
        className="section-band defer-render [--defer-h:2200px] lg:[--defer-h:1400px]"
      >
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* What gets an application declined, said before the fields. */}
            <div className="lg:pt-2">
              <h2
                id="aff-eligibility-headline"
                className="text-2xl font-bold tracking-[-0.02em]"
                data-reveal
                data-reveal-group="aff-elig"
              >
                {AFFILIATE.eligibility.title}
              </h2>

              <p
                className="mt-4 leading-relaxed text-muted"
                data-reveal
                data-reveal-group="aff-elig"
              >
                {AFFILIATE.eligibility.lead}
              </p>

              <ul className="mt-7 grid gap-4">
                {AFFILIATE.eligibility.items.map((item) => (
                  <li
                    key={item}
                    data-reveal
                    data-reveal-group="aff-elig"
                    className="flex items-start gap-3 text-muted"
                  >
                    <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* The contract, named as what it is. */}
              <div
                className="mt-10 border-t border-hairline pt-8"
                data-reveal
                data-reveal-group="aff-elig"
              >
                <h3 className="font-display text-lg font-extrabold tracking-tight">
                  {terms.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-muted">{terms.body}</p>
                <p className="mt-5">
                  <Link
                    to={termsHref}
                    className="inline-flex items-center gap-2 font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {terms.cta.label}
                    <Icon name="arrowRight" className="size-3.5" />
                  </Link>
                </p>
              </div>
            </div>

            <div
              className="panel-brand-outline p-7 sm:p-9"
              data-reveal
              data-reveal-group="aff-form"
            >
              <p className="section-eyebrow">{form.eyebrow}</p>

              <h2
                id="aff-form-headline"
                className="mt-4 text-[length:var(--text-section)] leading-[1.05]"
              >
                {form.title}
              </h2>

              <p className="mt-4 leading-relaxed text-muted">{form.lead}</p>

              <form className="mt-8 grid gap-4" onSubmit={onSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="name"
                    copy={form.name}
                    value={application.name}
                    onChange={set('name')}
                  />
                  <Field
                    id="email"
                    type="email"
                    copy={form.email}
                    value={application.email}
                    onChange={set('email')}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="country"
                    copy={form.country}
                    value={application.country}
                    onChange={set('country')}
                  />
                  <Field
                    id="audience"
                    copy={form.audience}
                    value={application.audience}
                    onChange={set('audience')}
                  />
                </div>

                <Field
                  id="channels"
                  copy={form.channels}
                  value={application.channels}
                  onChange={set('channels')}
                  rows={3}
                />

                <Field
                  id="links"
                  copy={form.links}
                  value={application.links}
                  onChange={set('links')}
                  rows={2}
                />

                {/* The honeypot. Off-screen rather than display:none, because a
                    bot that reads computed style skips a hidden field. */}
                <p className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="company-website">{form.trap}</label>
                  <input
                    id="company-website"
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={(event) => setTrap(event.target.value)}
                  />
                </p>

                <p className="mt-1 flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1 size-4 shrink-0 rounded border-hairline text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-muted">
                    {form.consent.before}
                    <Link
                      to={pathForLanguage(form.consent.link.href, language)}
                      className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {form.consent.link.label}
                    </Link>
                    {form.consent.after}
                  </label>
                </p>

                <div className="mt-3">
                  <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                    {status === 'submitting' ? form.sending : form.submit}
                  </button>
                </div>

                <p
                  aria-live="polite"
                  className="mt-1 text-base leading-relaxed text-muted empty:hidden"
                >
                  {status === 'handoff' && form.handoff}
                  {status === 'posted' && form.done}
                  {status === 'error' && form.error}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
