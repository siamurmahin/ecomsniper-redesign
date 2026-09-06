import { Link, useLocation } from 'react-router';
import { CAREERS as EN_CAREERS } from '../content/en/careers';
import { overlay as germanCareers } from '../content/de/careers';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../lib/language';
import SectionHeading from '../components/ui/SectionHeading';
import CtaButton from '../components/ui/CtaButton';
import MarkedHeadline from '../components/ui/MarkedHeadline';
import HeroSurface from '../components/hero/HeroSurface';

/**
 * Careers.
 *
 * Three bands: the pitch, the open roles, the speculative door. Their page
 * puts four filter controls and a search field above a single listing; none of
 * that is here, because a filter over one row is furniture pretending to be a
 * feature.
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

/** Department names are content, so the id they produce has to be safe. */
function slugify(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'other'
  );
}

/**
 * One role, as a row.
 *
 * The facts are pills rather than the `<dl>` this used to render: at this size
 * they are labels a reader scans, not values they look up, and four
 * label/value pairs under every row buried the job titles they belonged to.
 *
 * Pay stays out of the pills and sits at the end of the row on its own,
 * because it is the fact people are actually looking for and it should not be
 * the fourth grey chip.
 *
 * The whole row is the link. A row with a link somewhere inside it makes the
 * reader aim; a row that is a link is a target the width of the page.
 */
function RoleRow({ role, language, viewLabel }) {
  const pills = [role.location, role.type].filter(Boolean);

  return (
    <li data-reveal data-reveal-group="roles" className="border-b border-hairline">
      <Link
        to={pathForLanguage(`/careers/${role.slug}`, language)}
        className="group flex flex-col gap-3 rounded-xl px-2 py-6 outline-none transition-colors hover:bg-paper-sunk/70 focus-visible:bg-paper-sunk/70 sm:flex-row sm:items-center sm:gap-6"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-xl font-bold tracking-[-0.02em] sm:text-2xl">
            {role.title}
          </span>

          {role.summary && (
            <span className="mt-1.5 block max-w-2xl text-[0.95rem] leading-relaxed text-muted">
              {role.summary}
            </span>
          )}

          {pills.length > 0 && (
            <span className="mt-3 flex flex-wrap items-center gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-hairline px-2.5 py-1 font-label text-[0.68rem] uppercase tracking-[0.12em] text-muted"
                >
                  {pill}
                </span>
              ))}
            </span>
          )}
        </span>

        {role.salary && <span className="shrink-0 font-semibold sm:text-right">{role.salary}</span>}

        <span className="flex shrink-0 items-center gap-1.5 font-label text-[0.7rem] uppercase tracking-[0.14em] text-accent">
          {viewLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </span>
      </Link>
    </li>
  );
}

/**
 * The open roles, grouped by department.
 *
 * Grouping is derived from the roles themselves rather than declared, so a
 * department exists only while something is open in it. A heading over nothing
 * is the same mistake as a filter over one listing. With a single role this is
 * one heading over one row, which is the honest shape of one open job.
 */
function RolesByDepartment({ openRoles, language }) {
  const groups = [];
  for (const role of openRoles.roles) {
    const name = role.department ?? '';
    const found = groups.find((group) => group.name === name);
    if (found) found.roles.push(role);
    else groups.push({ name, roles: [role] });
  }

  if (!groups.length) {
    return (
      <p
        data-reveal
        data-reveal-group="roles"
        className="mt-10 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
      >
        {openRoles.empty}
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-10">
      {groups.map((group) => {
        const headingId = `dept-${slugify(group.name)}`;

        return (
          <section key={group.name} aria-labelledby={headingId}>
            <h3
              id={headingId}
              data-reveal
              data-reveal-group="roles"
              className="micro-label text-muted"
            >
              {group.name}
            </h3>

            <ul className="mt-3 border-t border-hairline">
              {group.roles.map((role) => (
                <RoleRow
                  key={role.slug}
                  role={role}
                  language={language}
                  viewLabel={openRoles.viewLabel}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default function CareersPage() {
  const CAREERS = usePageContent(EN_CAREERS, OVERLAYS);
  const { openRoles, speculative } = CAREERS;
  const language = languageFromPath(useLocation().pathname);

  return (
    <>
      {/* The hero carries the dot field and the colour floor every page's
          first screen wears — `brand-ground` under `HeroDots`, the same canvas
          the homepage mounts rather than a CSS imitation of it. The padding
          clears the floating header, which `section-band` alone does not. */}
      <HeroSurface>
        <p className="section-eyebrow" data-reveal data-reveal-group="hero">
          {CAREERS.eyebrow}
        </p>

        <h1
          className="mt-4 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
          data-reveal
          data-reveal-group="hero"
        >
          <MarkedHeadline parts={CAREERS.headlineParts} />
        </h1>

        <p
          className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
          data-reveal
          data-reveal-group="hero"
        >
          {CAREERS.lead}
        </p>
      </HeroSurface>

      <Band className="defer-render [--defer-h:620px] lg:[--defer-h:440px]">
        <SectionHeading eyebrow={openRoles.eyebrow} headline={openRoles.headline} />
        <RolesByDepartment openRoles={openRoles} language={language} />
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
