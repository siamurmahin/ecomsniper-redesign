import SectionHeading from '../components/ui/SectionHeading';
import FaqAccordion from '../components/ui/FaqAccordion';
import { FAQ } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * 13 — FAQ. New on the homepage.
 *
 * Placed above the final CTA so the last objections are answered while the
 * visitor is still deciding, rather than sending them to a separate help page
 * and losing them. Marked up as FAQPage in HomePage's JSON-LD, which is why
 * every answer here is written to match what support already says.
 */
export default function FaqSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-headline" className="section-band">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={FAQ.eyebrow}
              headline={<span id="faq-headline">{FAQ.headline}</span>}
              lead={FAQ.lead}
            />
          </div>

          <FaqAccordion items={FAQ.items} />
        </div>
      </div>
    </section>
  );
}
