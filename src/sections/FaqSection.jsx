import SectionHeading from '../components/ui/SectionHeading';
import FaqAccordion from '../components/ui/FaqAccordion';
import CtaButton from '../components/ui/CtaButton';
import Icon from '../components/ui/Icon';
import { FAQ, SITE } from '../data/siteContent';
import { toneOf } from '../lib/signalTones';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * 13 — FAQ. New on the homepage.
 *
 * Placed above the final CTA so the last objections are answered while the
 * visitor is still deciding, rather than sending them to a separate help page
 * and losing them. Marked up as FAQPage in HomePage's JSON-LD, which is why
 * every answer here is written to match what support already says.
 *
 * Thirteen questions in one flat list was a wall, and the sticky heading left
 * two thirds of its own column empty for the length of it. The questions are
 * grouped now — four groups, one signal tone each, in the order an objection
 * actually arrives — and that column carries the map and the way out.
 */
export default function FaqSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-headline" className="section-band">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={FAQ.eyebrow}
              headline={<span id="faq-headline">{FAQ.headline}</span>}
              lead={FAQ.lead}
            />

            {/* Jump links, not a filter: every answer stays in the document
                for the FAQPage markup and for anyone reading straight down.
                Hidden below lg — there is no sticky rail to navigate from on
                one column, and it would only push the questions down. */}
            <nav aria-label="Question groups" className="mt-8 hidden lg:block">
              <ul className="flex flex-col gap-1">
                {FAQ.groups.map((group) => {
                  const tone = toneOf(group.tone);
                  const count = FAQ.items.filter((item) => item.group === group.id).length;

                  return (
                    <li key={group.id}>
                      <a
                        href={`#faq-${group.id}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-paper-sunk"
                      >
                        <span aria-hidden="true" className={`size-2 rounded-full ${tone.dot}`} />
                        <span className="font-semibold">{group.label}</span>
                        <span className="ms-auto text-xs text-muted">{count}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              data-reveal
              data-reveal-group="faq-support"
              className="mt-8 rounded-2xl border border-hairline bg-white p-6"
            >
              <p className="font-display text-base font-extrabold">{FAQ.support.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{FAQ.support.body}</p>
              <div className="mt-5">
                {/* The button already carries the gap; .btn is inline-flex. */}
                <CtaButton href={SITE.discordUrl} variant="secondary" intent="faq-discord">
                  <Icon name="discord" className="size-4 shrink-0" aria-hidden="true" />
                  {FAQ.support.cta.label}
                </CtaButton>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {FAQ.groups.map((group, groupIndex) => {
              const tone = toneOf(group.tone);
              const items = FAQ.items.filter((item) => item.group === group.id);

              return (
                <div key={group.id} id={`faq-${group.id}`} className="scroll-mt-28">
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden="true" className={`h-3 w-1 rounded-full ${tone.rule}`} />
                    <span className={`micro-label ${tone.text}`}>{group.label}</span>
                  </p>

                  <div className="mt-3">
                    {/* Only the first group opens an answer. Four accordions
                        each opening their own first one is four open answers
                        and no shape. */}
                    <FaqAccordion items={items} defaultOpen={groupIndex === 0 ? 0 : -1} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
