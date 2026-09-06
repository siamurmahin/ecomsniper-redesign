import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { CAREERS as EN_CAREERS } from '../content/en/careers';
import { overlay as germanCareers } from '../content/de/careers';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { MarkedLastWord } from '../components/ui/MarkedHeadline';
import HeroSurface from '../components/hero/HeroSurface';
import CtaButton from '../components/ui/CtaButton';
import NotFoundPage from './NotFoundPage';

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanCareers.CAREERS };

/** Where an application goes when no endpoint is configured. */
const CONTACT_EMAIL = 'management@ecomsniper.io';

function Band({ id, className = '', children }) {
  const ref = useRevealOnScroll();
  return (
    <section id={id} ref={ref} className={`section-band ${className}`.trim()}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

/**
 * A section of the advert, or nothing at all.
 *
 * Every prose field on a role is optional, because the copy currently in the
 * deck is our draft and the client's replacement may be shorter. A heading
 * over an empty list is worse than a missing section, so an empty one does not
 * render.
 */
function Prose({ heading, body, items }) {
  const hasItems = Array.isArray(items) && items.length > 0;
  if (!body && !hasItems) return null;

  return (
    <div data-reveal data-reveal-group="job-body" className="mt-10 first:mt-0">
      <h2 className="text-2xl font-bold tracking-[-0.02em]">{heading}</h2>

      {body && (
        <p className="mt-4 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted">
          {body}
        </p>
      )}

      {hasItems && (
        <ul className="mt-4 grid max-w-2xl gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The application, as a mail-client hand-off.
 *
 * The same shape as the contact and affiliate forms: POST to
 * `VITE_JOBS_ENDPOINT` when one is set, and otherwise hand the whole thing to
 * the applicant's own mail client rather than showing a success message for a
 * submission that went nowhere. The playbook form fakes it; this does not.
 *
 * There is no file field. A `mailto:` cannot carry an attachment, so a CV
 * upload would work only once an endpoint exists — and for this role a reel
 * link is the more useful thing anyway. The hand-off says to attach a CV,
 * which the mail client can do and the form cannot.
 */
function mailtoHref({ to, role, values }) {
  const subject = `Application: ${role.title}`;
  const body = [
    `Role: ${role.title}`,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.location && `Based: ${values.location}`,
    values.portfolio && `Portfolio: ${values.portfolio}`,
    values.profile && `Profile: ${values.profile}`,
    '',
    values.message,
    '',
    values.attachNote,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, placeholder, type = 'text', required, textarea }) {
  const shared =
    'mt-2.5 w-full rounded-xl border border-hairline bg-white/80 px-5 py-4 text-base text-ink ' +
    'transition-colors placeholder:text-muted hover:border-ink/20 ' +
    'focus-visible:border-accent focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-accent';

  return (
    <div>
      <label htmlFor={id} className="micro-label text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          required={required}
          className={shared}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={shared}
        />
      )}
    </div>
  );
}

function ApplyForm({ apply, role }) {
  const [state, setState] = useState('idle');
  const endpoint = import.meta.env.VITE_JOBS_ENDPOINT;
  const { fields } = apply;

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /* The honeypot. A real applicant never sees it, so anything in it is a
       bot, and the quiet success is deliberate: telling a bot it failed
       teaches it to try again. */
    if (data.get('company-website')) {
      setState('sent');
      return;
    }

    const values = {
      name: data.get('name')?.toString().trim() ?? '',
      email: data.get('email')?.toString().trim() ?? '',
      location: data.get('location')?.toString().trim() ?? '',
      portfolio: data.get('portfolio')?.toString().trim() ?? '',
      profile: data.get('profile')?.toString().trim() ?? '',
      message: data.get('message')?.toString().trim() ?? '',
      attachNote: apply.attachNote,
    };

    if (!endpoint) {
      window.location.href = mailtoHref({ to: CONTACT_EMAIL, role, values });
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, role: role.title, slug: role.slug }),
      });
      setState(response.ok ? 'sent' : 'failed');
    } catch {
      setState('failed');
    }
  };

  return (
    <div className="panel-brand-outline p-7 sm:p-9" data-reveal data-reveal-group="job-form">
      <p className="section-eyebrow">{apply.eyebrow}</p>

      <h2 id="apply-headline" className="mt-4 text-[length:var(--text-section)] leading-[1.05]">
        {apply.headline}
      </h2>

      <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted">{apply.lead}</p>

      <form className="mt-8 grid gap-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="name"
            label={fields.name.label}
            placeholder={fields.name.placeholder}
            required
          />
          <Field
            id="email"
            type="email"
            label={fields.email.label}
            placeholder={fields.email.placeholder}
            required
          />
          <Field
            id="location"
            label={fields.location.label}
            placeholder={fields.location.placeholder}
          />
          <Field
            id="portfolio"
            type="url"
            label={fields.portfolio.label}
            placeholder={fields.portfolio.placeholder}
          />
        </div>

        <Field id="profile" label={fields.profile.label} placeholder={fields.profile.placeholder} />
        <Field
          id="message"
          textarea
          label={fields.message.label}
          placeholder={fields.message.placeholder}
          required
        />

        {/* Off-screen rather than display:none — a field a bot cannot see is
            only useful if the bot's parser still finds it. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company-website">Do not fill this in</label>
          <input
            id="company-website"
            name="company-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={state === 'sending'}
            className="btn btn-primary disabled:opacity-70"
          >
            {state === 'sending' ? apply.sending : apply.submit}
          </button>

          {/* One live region, so a screen reader hears the outcome once. */}
          <p aria-live="polite" className="text-[0.9rem] text-muted">
            {state === 'sent' && apply.sent}
            {state === 'failed' && apply.failed}
          </p>
        </div>
      </form>
    </div>
  );
}

/**
 * One job advert, at `/careers/<slug>`.
 *
 * The slug comes from the deck, and `react-router.config.js` reads the same
 * list to decide what to prerender — so adding a role writes its page without
 * a second list to keep in step.
 *
 * A slug that is not in the deck renders the not-found page rather than an
 * empty advert. Every real slug is prerendered, so this is reachable only by
 * typing one that never existed, or by opening a link to a role that has since
 * been filled — and both of those are a 404, not a blank job.
 */
export default function JobPage() {
  const CAREERS = usePageContent(EN_CAREERS, OVERLAYS);
  const { slug } = useParams();
  const language = languageFromPath(useLocation().pathname);

  const role = useMemo(
    () => CAREERS.openRoles.roles.find((entry) => entry.slug === slug),
    [CAREERS.openRoles.roles, slug],
  );

  if (!role) return <NotFoundPage />;

  const labels = CAREERS.role;
  const facts = [
    [labels.factLabels.department, role.department],
    [labels.factLabels.location, role.location],
    [labels.factLabels.type, role.type],
    [labels.factLabels.salary, role.salary],
  ].filter(([, value]) => value);

  return (
    <>
      <HeroSurface>
        <Link
          to={pathForLanguage('/careers', language)}
          className="inline-flex items-center gap-2 font-label text-[0.7rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          data-reveal
          data-reveal-group="job-hero"
        >
          <span aria-hidden="true">&larr;</span>
          {labels.backLabel}
        </Link>

        <h1
          className="mt-5 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
          data-reveal
          data-reveal-group="job-hero"
        >
          <MarkedLastWord text={role.title} />
        </h1>

        {role.summary && (
          <p
            className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted"
            data-reveal
            data-reveal-group="job-hero"
          >
            {role.summary}
          </p>
        )}

        <dl
          className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
          data-reveal-group="job-hero"
        >
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="micro-label text-muted">{label}</dt>
              <dd className="mt-1 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9" data-reveal data-reveal-group="job-hero">
          <CtaButton href="#apply" intent="job-apply-hero">
            {labels.applyCta}
          </CtaButton>
        </div>
      </HeroSurface>

      <Band className="defer-render [--defer-h:1200px] lg:[--defer-h:900px]">
        <Prose heading={labels.aboutHeading} body={role.about} />
        <Prose heading={labels.responsibilitiesHeading} items={role.responsibilities} />
        <Prose heading={labels.requirementsHeading} items={role.requirements} />
        <Prose heading={labels.niceToHaveHeading} items={role.niceToHave} />
      </Band>

      <Band
        id="apply"
        className="defer-render bg-paper-sunk [--defer-h:1100px] lg:[--defer-h:820px]"
      >
        <ApplyForm apply={CAREERS.apply} role={role} />
      </Band>
    </>
  );
}
