import SectionHeading from '../../components/ui/SectionHeading';
import CtaButton from '../../components/ui/CtaButton';
import Icon from '../../components/ui/Icon';
import playbookCover from '../../assets/brand/playbook-cover.webp';
import { FOUNDERS, PLAYBOOK } from '../../data/siteContent';
import { toneOf } from '../../lib/signalTones';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const PORTRAITS = import.meta.glob('../../assets/people/*.jpg', { eager: true, import: 'default' });
const portraitUrl = (key) => PORTRAITS[`../../assets/people/${key}.jpg`];

/**
 * 10 — option D, the book.
 *
 * The other shapes are arrangements of two paragraphs. This one gives the
 * section something to be about: the free playbook this site hands out —
 * "The Invisible Store" — was written by one of the two men in it, and nothing
 * anywhere on the site currently says so.
 *
 * That is worth a section on its own terms. It turns "trust the operator" from
 * an assertion into something checkable, and it puts a third free door on the
 * page at the point where a reader is asking who these people are.
 *
 * Authorship is the client's own wording, from ecomsniper.io/free-play-book:
 * "the exact system Sammy (CEO EcomSniper) used for 8 years". The cover in
 * `thumb-security-guard-300k` says the same — "Sammy, Founder of EcomSniper" —
 * and the summary video sits on his channel.
 *
 * That page says eight years where `FOUNDERS` says seven. The client confirmed
 * this site's figure is the right one, so seven stands and nothing here
 * repeats the number.
 */
export default function FoundersBookDark({ id = 'founders' }) {
  const sectionRef = useRevealOnScroll();
  const headlineId = `${id}-headline`;
  const tone = toneOf('blue');

  return (
    <section ref={sectionRef} id={id} aria-labelledby={headlineId} className="section-band bg-ink text-paper">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="ink"
              eyebrow={FOUNDERS.eyebrow}
              headline={<span id={headlineId}>{FOUNDERS.headline}</span>}
            />

            {FOUNDERS.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                data-reveal-group="book-body"
                className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted-dark"
              >
                {paragraph}
              </p>
            ))}

            <p
              data-reveal
              data-reveal-group="book-closer"
              className="mt-8 font-display text-xl font-bold sm:text-2xl"
            >
              {FOUNDERS.closer}
            </p>

            {/* The signature, small — the faces are already in section 09, so
                here they only need to say who is speaking. */}
            <ul
              data-reveal
              data-reveal-group="book-people"
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {FOUNDERS.people.map((person) => (
                <li key={person.name} className="flex items-center gap-3">
                  <img
                    src={portraitUrl(person.photo)}
                    alt={`${person.name}, ${person.role} at EcomSniper`}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold">{person.name}</span>
                    <span className="mt-0.5 block micro-label text-muted-dark">{person.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The book. An ink card, because the cover is a dark navy render on
              transparency — on a pale card it sits in a hole, and against near
              black with a wash behind it the title lifts off the page. */}
          <div data-reveal data-reveal-group="book-card" className="lg:justify-self-end">
            <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft p-7 text-paper shadow-float sm:p-9">
              {/* The brand ramp as a glow behind the book rather than a fifth
                  surface wearing it. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-20 size-64 rounded-full bg-[image:var(--gradient-brand)] opacity-25 blur-3xl"
              />

              <div className="relative flex items-start gap-6">
                {/* The real cover, from the client's own free-playbook page.
                    It was a drawn plate until the artwork was found — an
                    invented cover for a book that exists is a worse thing to
                    ship than no picture at all. Tilted, because a book standing
                    perfectly square reads as a placeholder for one. */}
                <img
                  src={playbookCover}
                  alt="The Invisible Store, the free EcomSniper playbook"
                  width={855}
                  height={1370}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-auto shrink-0 -rotate-3 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[var(--ease-out-expo)] motion-safe:hover:-rotate-1 motion-safe:hover:scale-[1.03]"
                />

                <span className="min-w-0 pt-1">
                  <span className="micro-label text-muted-dark">{PLAYBOOK.eyebrow}</span>
                  <span className="mt-2 block font-display text-2xl font-extrabold leading-tight tracking-tight">
                    {PLAYBOOK.headline}
                  </span>
                  <span className="mt-2 block text-[0.85rem] font-semibold text-signal-blue-soft">
                    Written by Sammy
                  </span>
                  <span className="mt-3 block text-[0.88rem] leading-relaxed text-muted-dark">
                    {PLAYBOOK.lead}
                  </span>
                </span>
              </div>

              {/* What is actually in it. These four are already written and
                  already true — they run the playbook page — and not one of
                  them appears anywhere on the homepage. The last is the hook:
                  a free book that names who the product is wrong for is worth
                  more than one that does not. */}
              <ul className="relative mt-7 flex flex-col gap-2.5 border-t border-paper/10 pt-6">
                {PLAYBOOK.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed">
                    <Icon
                      name="checkCircle"
                      className="mt-0.5 size-4 shrink-0 text-signal-green-soft"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7">
                <CtaButton
                  href={FOUNDERS.bookCta.href}
                  variant="onInk"
                  intent="founders-playbook"
                >
                  {FOUNDERS.bookCta.label}
                </CtaButton>

                {/* The four things a reader settles before typing an email
                    address, then the promise underneath. They sit under the
                    button rather than beside it: this is what you are agreeing
                    to when you press it. */}
                <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {PLAYBOOK.reassurances.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-paper"
                    >
                      <Icon
                        name="check"
                        className={`size-3 shrink-0 ${tone.onInk}`}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted-dark">
                  <Icon name="shield" className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  {PLAYBOOK.privacy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
