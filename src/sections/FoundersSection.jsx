import SectionHeading from '../components/ui/SectionHeading';
import { FOUNDERS } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/* Portraits resolved by the `photo` key stored against each founder. */
const PORTRAITS = import.meta.glob('../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../assets/people/${key}.jpg`];

/**
 * 10 — Founders. New section.
 *
 * The review's reasoning: in this category trust rests on the operator, not the
 * software, and neither founder story surfaced anywhere on the homepage. Names,
 * faces and specifics do more for conversion here than another feature card.
 *
 * Placeholders marked below should be replaced with real photographs; the
 * layout is built so a square portrait drops straight into the avatar slot.
 */
export default function FoundersSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="founders"
      aria-labelledby="founders-headline"
      className="section-band"
    >
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={FOUNDERS.eyebrow}
              headline={<span id="founders-headline">{FOUNDERS.headline}</span>}
            />

            {FOUNDERS.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                data-reveal-group="founders-body"
                className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}

            <p
              data-reveal
              data-reveal-group="founders-body"
              className="mt-8 font-display text-xl font-bold sm:text-2xl"
            >
              {FOUNDERS.closer}
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {FOUNDERS.people.map((person) => (
              <li
                key={person.name}
                data-reveal
                data-reveal-group="founders-people"
                className="flex items-start gap-5 rounded-3xl border border-hairline bg-white/60 p-6"
              >
                <img
                  src={portraitUrl(person.photo)}
                  alt={`${person.name}, ${person.role} at EcomSniper`}
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="size-20 shrink-0 rounded-2xl object-cover"
                />

                <span>
                  <span className="block text-lg font-extrabold tracking-tight">{person.name}</span>
                  <span className="mt-0.5 block micro-label text-muted">
                    {person.role}
                  </span>
                  <span className="mt-2.5 block text-[0.9rem] leading-relaxed text-muted">
                    {person.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
