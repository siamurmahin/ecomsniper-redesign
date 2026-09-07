import CtaButton from '../ui/CtaButton';
import HeroSurface from '../hero/HeroSurface';
import MarkedHeadline from '../ui/MarkedHeadline';
import { toneOf } from '../../lib/signalTones';

/** One signal each, so the three figures are told apart at a glance. */
const PROOF_TONES = ['blue', 'gold', 'green'];

/**
 * The course page's first screen, with its right-hand panel passed in.
 *
 * Lifted out of `CoursePage` so the hero can be seen with more than one panel
 * beside it without either copy of the markup drifting from the other — the
 * lab renders this three times, the page renders it once, and there is one
 * hero.
 *
 * @param {object} props
 * @param {object} props.course The COURSE deck, in the language being read.
 * @param {object} props.site The shared SITE deck, for the Discord door.
 * @param {React.ReactNode} props.panel What stands on the right.
 */
export default function CourseHero({ course, site, panel }) {
  return (
    <HeroSurface className="surface-deep">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="section-eyebrow" data-reveal data-reveal-group="course-hero">
            {course.eyebrow}
          </p>

          <h1
            className="mt-5 text-[length:var(--text-hero)] leading-[0.98]"
            data-reveal
            data-reveal-group="course-hero"
          >
            <MarkedHeadline parts={course.headlineParts} />
          </h1>

          <p
            className="mt-6 max-w-2xl font-serif text-2xl leading-relaxed italic text-muted"
            data-reveal
            data-reveal-group="course-hero"
          >
            {course.lead}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4"
            data-reveal
            data-reveal-group="course-hero"
          >
            <CtaButton href={course.ctas.primary.href}>{course.ctas.primary.label}</CtaButton>
            {/* Their above-the-fold button. It keeps its place as the second
                door: the free room is the right one for a reader who has not
                decided yet, and this page is long. */}
            <CtaButton href={site.discordUrl} variant="secondary">
              {course.ctas.secondary.label}
            </CtaButton>
          </div>

          {/* The price, beside the button rather than behind it.
              A reader who reaches /pricing without knowing the number arrives
              to a surprise, and that is where a funnel loses people who were
              otherwise sold. The guarantee sits with it, because a risk
              reversal against an unknown price reassures nobody. */}
          <p
            className="mt-5 text-sm leading-relaxed text-muted"
            data-reveal
            data-reveal-group="course-hero"
          >
            <span className="font-semibold text-ink">
              {course.price.value} {course.price.suffix}
            </span>{' '}
            — {course.price.thereafter}
            <br />
            {course.price.reversal}
          </p>

          {/* What stands in for the income claims their page opens with:
              three figures a reader can go and check, each standing on its own
              signal rule rather than a row of identical grey hairlines. */}
          <dl
            className="mt-12 grid gap-6 sm:grid-cols-3"
            data-reveal
            data-reveal-group="course-hero"
          >
            {course.proof.map((item, index) => (
              <div
                key={item.label}
                className={`border-t-2 pt-4 ${toneOf(PROOF_TONES[index]).edge}`}
              >
                <dt className="font-display text-2xl font-extrabold text-ink">{item.value}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal data-reveal-group="course-hero">
          {panel}
        </div>
      </div>
    </HeroSurface>
  );
}
