import SectionHeading from '../../components/ui/SectionHeading';
import { FOUNDERS } from '../../data/siteContent';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const PORTRAITS = import.meta.glob('../../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../../assets/people/${key}.jpg`];

/**
 * 10 — option A, the origin.
 *
 * Section 09's course card now introduces both founders by name and face, two
 * sections above this one. So this stops introducing them and does the thing
 * 09 cannot: says why the software exists at all.
 *
 * One column, because the section is one argument. The faces become a
 * signature under it rather than two cards beside it — which is also what the
 * 200×200 portraits can actually carry: 80px is already their retina ceiling.
 *
 * The closer is the payoff and gets set as one. "We still take the questions
 * in chat" is the only line on this page that section 08 has already shown
 * happening, at 02:16 in the support thread.
 */
export default function FoundersOrigin({ id = 'founders' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band">
      <div className="site-shell">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow={FOUNDERS.eyebrow}
            headline={<span id={headlineId}>{FOUNDERS.headline}</span>}
          />

          {/* The origin paragraph only. The other one is two mini-biographies,
              which is the job section 09 now does with faces. */}
          <p
            data-reveal
            data-reveal-group="founders-body"
            className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-muted"
          >
            {FOUNDERS.body[1]}
          </p>

          <p
            data-reveal
            data-reveal-group="founders-closer"
            className="mx-auto mt-10 max-w-xl font-display text-[length:var(--text-section)] font-extrabold leading-[1.1] tracking-tight"
          >
            {FOUNDERS.closer}
          </p>
        </div>

        {/* The signature. Each name keeps its own credential, so dropping the
            biography paragraph costs the section no facts. */}
        <ul
          data-reveal
          data-reveal-group="founders-people"
          className="mx-auto mt-12 flex max-w-3xl flex-col items-stretch gap-6 border-t border-hairline pt-10 sm:flex-row sm:justify-center sm:gap-12"
        >
          {FOUNDERS.people.map((person) => (
            <li key={person.name} className="flex items-center gap-4">
              <img
                src={portraitUrl(person.photo)}
                alt={`${person.name}, ${person.role} at EcomSniper`}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0">
                <span className="block font-display text-lg font-extrabold tracking-tight">
                  {person.name}
                </span>
                <span className="mt-0.5 block text-[0.82rem] leading-relaxed text-muted">
                  {person.story}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
