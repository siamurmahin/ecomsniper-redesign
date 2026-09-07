import Icon from '../ui/Icon';

const PORTRAITS = import.meta.glob('../../assets/people/*.webp', {
  eager: true,
  import: 'default',
});
const portraitUrl = (key) => PORTRAITS[`../../assets/people/${key}.webp`];

/**
 * The course hero's right-hand panel: what the course actually covers.
 *
 * Chosen 8 Sep from three built beside each other in a lab, which is deleted
 * with this commit. What it beat, and why:
 *
 * - **The four-node loop** that shipped first. Its four nodes were the four
 *   steps the "How it works" section expands immediately below, so the first
 *   screen spent its picture on the page's second section. It was also
 *   `bg-ink` on a hero that became `surface-deep` in `7e07b92` — a dark card
 *   on a dark ground, which is what prompted this in the first place.
 * - **The offer**, price and bonuses above the fold. Strong, and a second copy
 *   of the "What you get" section three screens above it.
 *
 * A syllabus is the one thing the first screen was not showing: the page sells
 * a course and had no picture of one.
 *
 * **Paper on a dark hero**, for the contrast the ink panel lost.
 *
 * **One bold thing, and it is the spine.** The brand ramp runs down the left
 * as a single rule rather than four coloured tiles — the four parts are one
 * course, and colouring them separately would say they are four products.
 *
 * Numbers are used because a syllabus genuinely is ordered: you cannot fulfil
 * before you list. The site's rule is that numbering means sequence, and here
 * it is true.
 *
 * The copy lives in the deck (`content/en/course.js` → `heroPanel`) in both
 * languages. Nothing here is invented: the four names are the client's own
 * line, and there are no lesson counts, no durations and no hours of content,
 * because none of that is known.
 */
const TEACHERS = [
  { name: 'Marc Augustine', photo: 'founder-marc' },
  { name: 'Sammy', photo: 'founder-sammy' },
];

export default function CourseSyllabusPanel({ panel }) {
  return (
    <figure className="card-raised relative overflow-hidden rounded-3xl border border-hairline bg-paper p-7 sm:p-9">
      <p className="micro-label text-muted">{panel.eyebrow}</p>
      <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
        {panel.name}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{panel.lead}</p>

      {/* The spine. One rule for four parts, because they are one course. */}
      <ol className="relative mt-7 flex flex-col gap-5 pl-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-0 w-0.5 rounded-full bg-[image:var(--gradient-brand)]"
        />

        {panel.modules.map((module) => (
          <li key={module.name} className="relative">
            <span className="font-label text-[0.7rem] tracking-[0.14em] text-muted">
              {module.n}
            </span>
            <p className="mt-0.5 font-display text-base leading-snug font-extrabold text-ink">
              {module.name}
            </p>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{module.body}</p>
          </li>
        ))}
      </ol>

      <figcaption className="mt-8 border-t border-hairline pt-6">
        <span className="flex items-center gap-3">
          {/* shrink-0 on the stack, not only on the images inside it.

              Without it the wrapper is a flex item that may shrink, and at
              375px the sentence beside it is long enough to make it: the
              wrapper collapsed under its own content and the two photographs
              overflowed it, landing on top of the first line of text — the
              images ran to x113 while the sentence started at x98. The images
              were already `shrink-0`, which is why this looked like it should
              have been safe. A stack of overlapping avatars is one atom, and
              the atom is what has to refuse to shrink. */}
          <span className="flex shrink-0 -space-x-2">
            {TEACHERS.map((teacher) => (
              <img
                key={teacher.name}
                src={portraitUrl(teacher.photo)}
                alt={`${teacher.name}, instructor on Dropship Mastery`}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="size-9 rounded-full object-cover ring-2 ring-paper"
              />
            ))}
          </span>
          <span className="text-[0.85rem] leading-relaxed text-muted">{panel.taughtBy}</span>
        </span>

        <span className="mt-4 flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted">
          <Icon name="shield" className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {panel.updated}
        </span>
      </figcaption>
    </figure>
  );
}
