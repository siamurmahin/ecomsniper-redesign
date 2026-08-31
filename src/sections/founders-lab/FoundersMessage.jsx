import { FOUNDERS } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const PORTRAITS = import.meta.glob('../../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../../assets/people/${key}.jpg`];

/**
 * 10 — option C, the message.
 *
 * Every other section on this page is cards on a band. This one is two people
 * talking, so it is set as that: their words at display size, signed at the
 * bottom. The point is the change of register — it stands out because it is
 * not another grid.
 *
 * An ink band, because 10 currently sits as paper between two sunk bands and
 * has no presence at all. It also puts the section's own claim next to the
 * evidence: the words are the founders', and section 08 shows them answering
 * at 02:16.
 */
export default function FoundersMessage({ id = 'founders' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headlineId}
      className="section-band bg-ink text-paper"
    >
      <div className="site-shell">
        <div className="mx-auto max-w-3xl">
          <p data-reveal data-reveal-group="msg-eyebrow" className="section-eyebrow section-eyebrow-on-ink">
            {FOUNDERS.eyebrow}
          </p>

          <h2
            id={headlineId}
            data-reveal
            data-reveal-group="msg-headline"
            className="mt-6 text-[length:var(--text-display)] leading-[1.05]"
          >
            {FOUNDERS.headline}
          </h2>

          {/* Their words, at reading size rather than caption size. Two
              paragraphs, the second of which is the origin. */}
          {FOUNDERS.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              data-reveal
              data-reveal-group="msg-body"
              className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-muted-dark"
            >
              {paragraph}
            </p>
          ))}

          <p
            data-reveal
            data-reveal-group="msg-closer"
            className="mt-10 font-display text-[length:var(--text-section)] font-extrabold leading-[1.1] tracking-tight text-paper"
          >
            {FOUNDERS.closer}
          </p>

          {/* The signature. The brand ramp as a short rule above it, the way a
              letter is signed under a line rather than beside one. */}
          <div
            data-reveal
            data-reveal-group="msg-sign"
            className="mt-10 border-t border-paper/15 pt-8"
          >
            <ul className="flex flex-col gap-5 sm:flex-row sm:gap-10">
              {FOUNDERS.people.map((person) => (
                <li key={person.name} className="flex items-center gap-3.5">
                  <img
                    src={portraitUrl(person.photo)}
                    alt={`${person.name}, ${person.role} at EcomSniper`}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-full object-cover ring-2 ring-ink-line"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-extrabold tracking-tight text-paper">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block micro-label text-muted-dark">{person.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
