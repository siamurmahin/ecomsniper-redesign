import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import { FOUNDERS } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const PORTRAITS = import.meta.glob('../../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../../assets/people/${key}.jpg`];

/** One tone each, as every enumerated pair on this page is coloured. */
const PERSON_TONES = ['blue', 'gold'];

/**
 * 10 — option B, two stories.
 *
 * Keeps both men on the page but gives each one his own story rather than a
 * role and a line. Section 09's instructor row becomes the name-drop; this is
 * where the names get substance.
 *
 * The portraits stay at 88px. They are 200×200 files, so 100px is their
 * ceiling before a retina screen starts softening them — a founders section
 * built around large photography needs new files first.
 *
 * The origin paragraph leads, because "we built this for ourselves" is what
 * makes two biographies worth reading rather than two biographies.
 */
export default function FoundersStories({ id = 'founders' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={FOUNDERS.eyebrow}
            headline={<span id={headlineId}>{FOUNDERS.headline}</span>}
          />
          <p
            data-reveal
            data-reveal-group="founders-body"
            className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-muted"
          >
            {FOUNDERS.body[1]}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {FOUNDERS.people.map((person, index) => {
            const tone = toneOf(PERSON_TONES[index % PERSON_TONES.length]);

            return (
              <li
                key={person.name}
                data-reveal
                data-reveal-group="founders-people"
                className="group relative overflow-hidden rounded-3xl border border-hairline bg-white p-6 shadow-lift transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-float sm:p-8"
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${tone.rule}`} />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br to-transparent blur-2xl ${tone.wash}`}
                />

                <div className="relative flex items-center gap-5">
                  <img
                    src={portraitUrl(person.photo)}
                    alt={`${person.name}, ${person.role} at EcomSniper`}
                    width={176}
                    height={176}
                    loading="lazy"
                    decoding="async"
                    className="size-[88px] shrink-0 rounded-2xl object-cover shadow-lift"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                      {person.name}
                    </span>
                    <span className={`mt-1 block micro-label ${tone.text}`}>{person.role}</span>
                  </span>
                </div>

                {/* `story` only. `detail` says the same thing in fewer words —
                    "7 years selling on eBay" under "Seven years selling on
                    eBay" — so rendering both had each card repeating itself. */}
                <p className="relative mt-6 text-[0.95rem] leading-relaxed text-ink/80">
                  {person.story}
                </p>
              </li>
            );
          })}
        </ul>

        {/* The closer, marked as the payoff. Section 08 shows this happening. */}
        <p
          data-reveal
          data-reveal-group="founders-closer"
          className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-3 text-center font-display text-xl font-extrabold leading-snug tracking-tight sm:text-2xl"
        >
          <Icon
            name="checkCircle"
            className="mt-1 size-5 shrink-0 text-signal-green-deep"
            aria-hidden="true"
          />
          {FOUNDERS.closer}
        </p>
      </div>
    </section>
  );
}
