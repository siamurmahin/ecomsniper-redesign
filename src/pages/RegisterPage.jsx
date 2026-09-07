import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AUTH as EN_AUTH } from '../content/en/auth';
import { overlay as germanAuth } from '../content/de/auth';
import { usePageContent } from '../hooks/usePageContent';
import AuthLayout, { AuthSwitch } from '../components/auth/AuthLayout';
import AuthField from '../components/auth/AuthField';
import Icon from '../components/ui/Icon';
import { languageFromPath, pathForLanguage } from '../lib/language';

/**
 * Create an account.
 *
 * **Their `/register` is not a registration page — it is step one of a
 * checkout.** Two steps across the top, an order summary down the side, and a
 * button reading "Proceed to Secure Payment". Captured in
 * `docs/source-copy/auth.md`.
 *
 * So this page is step one and stops there, and says so where step two would
 * begin. Checkout is outside the scope line in `TODO.md` → Decided, and a card
 * form that takes no card is exactly what the contact form refuses to be.
 *
 * ## The headline is not theirs
 *
 * Theirs reads *"99% of People Who Use EcomSniper for 3 Months Make
 * 1-3k/month"* — the one claim this repository has banned by name since the
 * start; `CLAUDE.md` carries the rule. It is the first thing a reader sees on
 * the page where they are about to pay, which is the worst place on the site
 * for a number nobody can stand behind.
 *
 * What replaces it is the pair of facts somebody about to pay actually wants:
 * what it costs today, and how to leave. Both are already true and already
 * published here.
 *
 * ## The password minimum is eight, not six
 *
 * Their helper says "Must be 6 characters". Six is below every current
 * guideline, and a form that asks for six is telling people six is enough.
 * Their server will accept whatever it accepts — that is theirs, not ours —
 * but the design asks for eight, and imposes no composition rules: a forced
 * symbol buys less than four more characters do.
 *
 * ## What it does with what you type
 *
 * Nothing. It validates in the browser, marks the fields that are wrong, and
 * says the form is not connected. No request, no storage, no logging, no
 * third party. `ssr: false` — there is nowhere for it to go.
 */
const OVERLAYS = { de: germanAuth.AUTH };

/** Deliberately loose: the server decides what an address is. This only
    catches the typo that stops a form being submitted at all. */
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

export default function RegisterPage() {
  const AUTH = usePageContent(EN_AUTH, OVERLAYS);
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const { register } = AUTH;
  const { form, summary, errors: messages, steps } = register;

  const [values, setValues] = useState({ email: '', confirmEmail: '', password: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  /* Errors appear on the first submit and are corrected live after it. Before
     that a half-typed address is not a mistake, it is a person typing. */
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle');

  const validate = (next, agreed) => {
    const found = {};
    if (!LOOKS_LIKE_EMAIL.test(next.email)) found.email = messages.email;
    /* An empty confirmation is not a match. Comparing the two directly made
       two blanks equal, so submitting an empty form flagged three problems
       out of four and the reader fixed them one short. */
    if (!next.confirmEmail || next.confirmEmail !== next.email) {
      found.confirmEmail = messages.confirmEmail;
    }
    if (next.password.length < MIN_PASSWORD) found.password = messages.password;
    if (!agreed) found.consent = messages.consent;
    return found;
  };

  const setField = (key) => (value) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next, consent));
  };

  const onConsent = (event) => {
    const agreed = event.target.checked;
    setConsent(agreed);
    if (submitted) setErrors(validate(values, agreed));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(values, consent);
    setErrors(found);
    /* A valid form gets the honest answer rather than a spinner. */
    setStatus(Object.keys(found).length ? 'invalid' : 'blocked');
  };

  const consentId = 'consent';
  const consentError = errors.consent;

  return (
    <AuthLayout
      notConnected={form.notConnected}
      aside={
        /* Their subscription panel, their figures and their billing sentence.
           Ink, because it is the one block on the page that is a statement
           rather than a question, and because a summary that looks like
           another form field gets read as one. */
        <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink p-8 text-paper shadow-float">
          <span
            aria-hidden="true"
            className="brand-fill pointer-events-none absolute inset-0 opacity-[0.07]"
          />

          <div className="relative">
            <p className="micro-label text-muted-dark">{summary.title}</p>
            <p className="mt-2 font-display text-xl font-extrabold tracking-tight">
              {summary.plan}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {summary.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed">
                  <Icon
                    name="checkCircle"
                    className="mt-0.5 size-4 shrink-0 text-signal-green-soft"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-baseline justify-between gap-4 border-t border-paper/10 pt-6">
              <span className="text-sm text-muted-dark">{summary.dueLabel}</span>
              <span className="font-display text-3xl font-extrabold">
                {summary.dueValue}{' '}
                <span className="text-sm font-semibold text-muted-dark">{summary.dueCurrency}</span>
              </span>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[0.85rem] leading-relaxed text-paper">
              <Icon
                name="shield"
                className="mt-0.5 size-4 shrink-0 text-signal-green-soft"
                aria-hidden="true"
              />
              {summary.guarantee}
            </p>

            {/* The sentence their page puts here, kept in full. What you are
                billed later belongs beside what you are billed today. */}
            <p className="mt-4 text-[0.8rem] leading-relaxed text-muted-dark">{summary.billing}</p>
          </div>
        </div>
      }
    >
      <p className="section-eyebrow" data-reveal data-reveal-group="auth">
        {register.eyebrow}
      </p>

      <h1
        className="mt-5 max-w-[20ch] text-[length:var(--text-hero)] leading-[0.98]"
        data-reveal
        data-reveal-group="auth"
      >
        {register.headline}
      </h1>

      <p
        className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
        data-reveal
        data-reveal-group="auth"
      >
        {register.lead}
      </p>

      {/* The two steps, as a rail. Numbered because this genuinely is a
          sequence — you cannot pay before the account exists — and the second
          one is visibly not reached rather than merely greyed: it is the
          honest state of this page. */}
      <ol
        className="mt-10 flex max-w-xl flex-wrap gap-x-8 gap-y-3"
        data-reveal
        data-reveal-group="auth"
      >
        {steps.map((step, index) => {
          const isCurrent = index === 0;

          return (
            <li key={step.label} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`grid size-7 shrink-0 place-items-center rounded-full font-label text-xs font-bold ${
                  isCurrent ? 'bg-ink text-paper' : 'border border-hairline text-muted'
                }`}
              >
                {index + 1}
              </span>
              <span>
                <span
                  className={`block text-sm font-semibold ${isCurrent ? 'text-ink' : 'text-muted'}`}
                >
                  {step.label}
                </span>
                <span className="block text-xs text-muted">{step.note}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <form
        noValidate
        onSubmit={onSubmit}
        className="panel-brand-outline mt-8 grid max-w-xl gap-5 rounded-2xl p-6 shadow-lift sm:p-8"
        data-reveal
        data-reveal-group="auth-form"
      >
        <p className="font-display text-xl font-extrabold tracking-tight">{form.panelTitle}</p>

        <AuthField
          id="email"
          type="email"
          label={form.email.label}
          placeholder={form.email.placeholder}
          value={values.email}
          onChange={setField('email')}
          autoComplete="email"
          error={errors.email}
        />

        <AuthField
          id="confirmEmail"
          type="email"
          label={form.confirmEmail.label}
          placeholder={form.confirmEmail.placeholder}
          value={values.confirmEmail}
          onChange={setField('confirmEmail')}
          autoComplete="email"
          error={errors.confirmEmail}
        />

        <AuthField
          id="password"
          type="password"
          label={form.password.label}
          placeholder={form.password.placeholder}
          value={values.password}
          onChange={setField('password')}
          autoComplete="new-password"
          reveal={form.reveal}
          hint={form.passwordHint}
          error={errors.password}
        />

        <div>
          <label htmlFor={consentId} className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              id={consentId}
              name={consentId}
              type="checkbox"
              checked={consent}
              onChange={onConsent}
              aria-invalid={consentError ? true : undefined}
              aria-describedby={consentError ? `${consentId}-error` : undefined}
              /* size-5 rather than size-4: 16px is under the 24px WCAG 2.2
                 target minimum, and while the label wraps the box so the whole
                 sentence toggles it, the box is what a thumb aims at. */
              className="mt-0.5 size-5 shrink-0 rounded border-hairline text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <span className="text-muted">
              {form.consent.before}
              <Link
                to={pathForLanguage(form.consent.terms.href, language)}
                className="font-semibold text-ink underline decoration-hairline underline-offset-4"
              >
                {form.consent.terms.label}
              </Link>
              {form.consent.between}
              <Link
                to={pathForLanguage(form.consent.privacy.href, language)}
                className="font-semibold text-ink underline decoration-hairline underline-offset-4"
              >
                {form.consent.privacy.label}
              </Link>
              {form.consent.after}
            </span>
          </label>

          <p
            id={`${consentId}-error`}
            className="mt-2 text-[0.8rem] leading-relaxed font-semibold text-signal-red-deep empty:hidden"
          >
            {consentError}
          </p>
        </div>

        <div>
          <button type="submit" className="btn-primary">
            {form.submit}
          </button>

          <p className="mt-3 flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted">
            <Icon name="shield" className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {form.stepTwoNote}
          </p>
        </div>

        <p
          aria-live="polite"
          className="text-sm leading-relaxed font-semibold text-ink empty:hidden"
        >
          {status === 'blocked' && form.notConnected}
        </p>
      </form>

      <AuthSwitch prompt={form.switchPrompt} cta={form.switchCta} />
    </AuthLayout>
  );
}
