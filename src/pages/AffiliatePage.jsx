import { AFFILIATE as EN_AFFILIATE } from '../content/en/affiliate';
import { overlay as germanAffiliate } from '../content/de/affiliate';
import { usePageContent } from '../hooks/usePageContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import CtaButton from '../components/ui/CtaButton';

/**
 * The affiliate programme terms.
 *
 * A legal document, so it is laid out as one: numbered clauses at a reading
 * measure, no cards, no illustration, nothing that would make a contract look
 * like a pitch. The numbers are content — a clause is referred to by number —
 * which is the only reason they are here.
 *
 * One reveal scope for the whole page rather than one per clause. Eleven
 * scopes would mean eleven IntersectionObservers for a document nobody
 * scrolls slowly, and the group names below are already unique per clause
 * because they carry the clause index. See `AboutPage` for why that matters.
 */

/* Module scope so the hook memo has a stable dependency. */
const OVERLAYS = { de: germanAffiliate.AFFILIATE };

/** A run of clause bullets. */
function Clauses({ items, group }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          data-reveal
          data-reveal-group={group}
          className="relative pl-5 text-muted before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-hairline"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AffiliatePage() {
  const AFFILIATE = usePageContent(EN_AFFILIATE, OVERLAYS);
  const scopeRef = useRevealOnScroll();

  return (
    <div ref={scopeRef}>
      <section className="section-band">
        <div className="site-shell">
          <p className="section-eyebrow" data-reveal data-reveal-group="hero">
            {AFFILIATE.eyebrow}
          </p>

          <h1
            className="mt-4 max-w-3xl text-[length:var(--text-display)] leading-[0.98]"
            data-reveal
            data-reveal-group="hero"
          >
            {AFFILIATE.headline}
          </h1>

          <p
            className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted"
            data-reveal
            data-reveal-group="hero"
          >
            {AFFILIATE.intro}
          </p>
        </div>
      </section>

      <section className="section-band defer-render bg-paper-sunk [--defer-h:4200px] lg:[--defer-h:3200px]">
        <div className="site-shell">
          <ol className="grid max-w-2xl gap-12">
            {AFFILIATE.sections.map((section, index) => {
              const group = `clause-${index}`;
              return (
                <li key={section.title}>
                  <p
                    className="micro-label tabular-nums text-muted"
                    data-reveal
                    data-reveal-group={group}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  <h2
                    className="mt-2 text-2xl font-bold tracking-[-0.02em]"
                    data-reveal
                    data-reveal-group={group}
                  >
                    {section.title}
                  </h2>

                  {section.lead && (
                    <p className="mt-4 text-muted" data-reveal data-reveal-group={group}>
                      {section.lead}
                    </p>
                  )}

                  {section.items && <Clauses items={section.items} group={group} />}

                  {/* Section 8 is the only one their document writes as labelled
                      clauses, and the label governs what follows it. */}
                  {section.definitions && (
                    <dl className="mt-4 grid gap-4">
                      {section.definitions.map((def) => (
                        <div key={def.term} data-reveal data-reveal-group={group}>
                          <dt className="font-semibold">{def.term}</dt>
                          <dd className="mt-1 text-muted">{def.body}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {section.closerLead && (
                    <p className="mt-5 text-muted" data-reveal data-reveal-group={group}>
                      {section.closerLead}
                    </p>
                  )}

                  {section.closerItems && <Clauses items={section.closerItems} group={group} />}

                  {section.closer && (
                    <p className="mt-5 text-muted" data-reveal data-reveal-group={group}>
                      {section.closer}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section-band">
        <div className="site-shell">
          <div className="max-w-2xl border-t border-hairline pt-10">
            <h2
              className="text-2xl font-bold tracking-[-0.02em]"
              data-reveal
              data-reveal-group="final"
            >
              {AFFILIATE.final.title}
            </h2>

            {AFFILIATE.final.body.map((paragraph) => (
              <p
                key={paragraph}
                data-reveal
                data-reveal-group="final"
                className="mt-4 leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}

            <p data-reveal data-reveal-group="final" className="mt-6 text-muted">
              {AFFILIATE.final.contact}
            </p>

            <div className="mt-8" data-reveal data-reveal-group="final">
              <CtaButton
                href={AFFILIATE.final.cta.href}
                variant="secondary"
                intent="affiliate-to-contact"
              >
                {AFFILIATE.final.cta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
