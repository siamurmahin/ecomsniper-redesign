import { CAREERS as EN_CAREERS } from '../content/en/careers';
import { overlay as germanCareers } from '../content/de/careers';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';

/**
 * Careers.
 *
 * Three bands: the pitch, the one open role, the speculative door. Their page
 * puts four filter controls and a search field above a single listing; none of
 * that is here, because a filter over one row is furniture pretending to be a
 * feature. When there is a second role this becomes a list. When there are
 * twenty it earns a CMS — see `docs/TODO.md`.
 *
 * Each band owns its reveal scope, for the reason written in `AboutPage`.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanCareers.CAREERS };

function Band({ className = '', children }) {
  const ref = useRevealOnScroll();
  return (
    <section ref={ref} className={`section-band ${className}`.trim()}>
      <div className="site-shell">{children}</div>
    </section>
  );
}

/**
 * One open role.
 *
 * The facts sit in a `<dl>` because that is what they are — labelled values,
 * not prose. `summary` is deliberately allowed to be absent: their live
 * listing's description is placeholder text, and an invented one would be a
 * promise about someone's job.
 */
function Role({ role }) {
  const facts = [
    ['Department', role.department],
    ['Location', role.location],
    ['Type', role.type],
    ['Pay', role.salary],
  ].filter(([, value]) => value);

  return (
    <li
      data-reveal
      data-reveal-group="roles"
      className="rounded-2xl border border-hairline bg-paper-sunk p-6 sm:p-8"
    >
      <h3 className="text-2xl font-bold tracking-[-0.02em]">{role.title}</h3>

      {role.summary && (
        <p className="mt-3 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted">
          {role.summary}
        </p>
      )}

      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="micro-label text-muted">{label}</dt>
            <dd className="mt-1 font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

export default function CareersPage() {
  const CAREERS = usePageContent(EN_CAREERS, OVERLAYS);
  const { openRoles, speculative } = CAREERS;

  return (
    <>
      <Band>
        <p className="section-eyebrow" data-reveal data-reveal-group="hero">
          {CAREERS.eyebrow}
        </p>

        <h1
          className="mt-4 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
          data-reveal
          data-reveal-group="hero"
        >
          {CAREERS.headline}
        </h1>

        <p
          className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="hero"
        >
          {CAREERS.lead}
        </p>
      </Band>

      <Band className="defer-render [--defer-h:620px] lg:[--defer-h:440px]">
        <SectionHeading eyebrow={openRoles.eyebrow} headline={openRoles.headline} />

        <ul className="mt-10 grid gap-4">
          {openRoles.roles.map((role) => (
            <Role key={role.title} role={role} />
          ))}
        </ul>
      </Band>

      <Band className="defer-render bg-paper-sunk [--defer-h:520px] lg:[--defer-h:400px]">
        <SectionHeading eyebrow={speculative.eyebrow} headline={speculative.headline} />

        <p
          className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="speculative"
        >
          {speculative.body}
        </p>

        <div className="mt-8" data-reveal data-reveal-group="speculative">
          <CtaButton href={`mailto:${speculative.email}`} intent="careers-speculative">
            {speculative.cta}
          </CtaButton>
        </div>
      </Band>
    </>
  );
}
