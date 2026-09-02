import { useEffect, useRef } from 'react';
import ReticleMark from '../components/ui/ReticleMark';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { COMMUNITY } from '../data/siteContent';
import { toneOf } from '../lib/signalTones';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';


/** How long a reply is composed before its first character lands. */
const THINK_MS = 900;
/** Per character. ~55 a second — brisk enough not to stall, slow enough to read. */
const CHAR_MS = 18;
/** After the last reply, before the two other members are shown replying. */
const TAIL_MS = 600;

/**
 * 08 — Support and community, the real differentiator against cheaper tools,
 * so it gets a full band rather than a row of icons.
 *
 * The section claims a question at 2am gets answered, so it draws that
 * happening — DOM and CSS, like section 07. The thread composes itself,
 * because the claim is about a reply arriving, not about one already there.
 *
 * Labelled in words as an illustration: an invented interface that does not
 * say so is a claim.
 */
export default function CommunitySection() {
  const sectionRef = useRevealOnScroll();
  const threadRef = useRef(null);
  const { drawn } = COMMUNITY;
  const callTone = toneOf('green');

  /**
   * One rAF loop writing textContent straight to the nodes, never React state:
   * a character every 18ms through setState re-renders this subtree ~55 times
   * a second. Rendered in full first and cleared when the sequence starts, so
   * anyone without JS reads the finished thread instead of empty bubbles.
   */
  useEffect(() => {
    const thread = threadRef.current;
    if (!thread || prefersReducedMotion()) return undefined;

    const rows = Array.from(thread.querySelectorAll('[data-reply]'));
    if (!rows.length) return undefined;

    const steps = rows.map((row) => ({
      row,
      out: row.querySelector('[data-reply-text]'),
      full: row.querySelector('[data-reply-text]')?.textContent ?? '',
    }));
    const tail = thread.querySelector('[data-reply-tail]');

    let raf = 0;
    let started = 0;
    let index = 0;
    let phase = 'thinking';

    const reset = () => {
      steps.forEach((step) => {
        step.row.dataset.reply = 'pending';
        step.out.textContent = '';
      });
      if (tail) tail.dataset.replyTail = 'pending';
    };

    const tick = (now) => {
      /* The tail is handled before anything reads `steps[index]`: once the
         last reply is done `index` is past the end of the array, and reaching
         for `step.full` there throws inside the rAF callback — which kills the
         loop silently and leaves the closing line hidden for good. */
      if (phase === 'tail') {
        if (now - started >= TAIL_MS) {
          if (tail) tail.dataset.replyTail = 'shown';
          return;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      const step = steps[index];
      const elapsed = now - started;

      if (phase === 'thinking') {
        step.row.dataset.reply = 'thinking';
        if (elapsed >= THINK_MS) {
          phase = 'typing';
          started = now;
          step.row.dataset.reply = 'typing';
        }
      } else {
        const chars = Math.min(step.full.length, Math.floor(elapsed / CHAR_MS));
        step.out.textContent = step.full.slice(0, chars);

        if (chars >= step.full.length) {
          step.row.dataset.reply = 'done';
          index += 1;
          started = now;
          phase = index < steps.length ? 'thinking' : 'tail';
        }
      }

      raf = requestAnimationFrame(tick);
    };

    /* Gated on the card being properly in view rather than on mount: the
       sequence is ~4s long and running it above the fold means the visitor
       arrives to a conversation that already finished without them. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        reset();
        started = performance.now();
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(thread);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      aria-labelledby="community-headline"
      className="section-band"
    >
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={COMMUNITY.eyebrow}
              headline={
                <span id="community-headline">
                  {COMMUNITY.headline}{' '}
                  <span className="headline-mark">{COMMUNITY.headlineMark}</span>
                  {COMMUNITY.headlineTail}
                </span>
              }
              lead={COMMUNITY.lead}
            />
            <p
              data-reveal
              data-reveal-group="drawn-body"
              className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted"
            >
              {COMMUNITY.body}
            </p>

            <ul className="mt-10 flex flex-col gap-3">
              {COMMUNITY.items.map((item) => {
                const tone = toneOf(item.tone);
                return (
                  <li
                    key={item.label}
                    data-reveal
                    data-reveal-group="drawn-items"
                    className="flex items-center gap-4"
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone.tile}`}>
                      <Icon name={item.icon} className="size-[1.1rem]" />
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-xl font-extrabold tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-sm font-semibold text-muted">{item.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            {/* An ink card because a chat at 2am is read with the lights down,
                and because it separates the illustration from the claims
                beside it at a glance. */}
            <div ref={threadRef} className="card-ink overflow-hidden rounded-3xl">
              {/* Padding steps down below `sm`. At 361px the card was giving
                  up 48px to its own gutters, 24px more to each reply's indent
                  and 32px inside the bubble — 104px of a 361px screen before
                  a word of the conversation. The desktop measure is unchanged. */}
              {/* Headed by the mark and "EcomSniper Support", as the live site
                  heads it. A channel name claimed a Discord; this claims what
                  the section actually claims — a person, at any hour. */}
              <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-3.5 sm:px-6 sm:py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper">
                  <ReticleMark className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9rem] font-semibold text-paper">
                    {drawn.support.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-signal-green-soft">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-signal-green" />
                    {drawn.support.status}
                  </span>
                </span>
              </div>

              <ol className="flex flex-col gap-4 px-4 py-5 sm:gap-5 sm:px-6 sm:py-7">
                <li>
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-dark">
                    You · {drawn.question.time}
                  </p>
                  <p className="mt-2 rounded-2xl rounded-tl-sm bg-paper/10 px-3.5 py-2.5 text-[0.95rem] leading-relaxed text-paper sm:px-4 sm:py-3">
                    {drawn.question.body}
                  </p>
                </li>

                {drawn.replies.map((reply) => (
                  <li key={reply.time} data-reply="done" className="group/reply pl-3 sm:pl-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-dark">
                      {reply.role} · {reply.time}
                    </p>

                    {/* The dots and the bubble share one cell, so the row is
                        the height of the finished reply from the first frame.
                        Sized from the real text rather than a guess: a bubble
                        that grows as it types walks the whole page down the
                        screen while the visitor is reading it. */}
                    <div className="mt-2 grid">
                      <span
                        aria-hidden="true"
                        className="flex items-center gap-1.5 self-start rounded-2xl rounded-tr-sm border border-paper/12 bg-paper/[0.04] px-3.5 py-3 opacity-0 transition-opacity duration-200 [grid-area:1/1] group-data-[reply=thinking]/reply:opacity-100 sm:px-4 sm:py-3.5"
                      >
                        <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                        <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                        <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                      </span>

                      <p className="grid rounded-2xl rounded-tr-sm border border-paper/12 bg-paper/[0.04] px-3.5 py-2.5 text-[0.95rem] leading-relaxed text-paper/90 [grid-area:1/1] group-data-[reply=pending]/reply:invisible group-data-[reply=thinking]/reply:invisible sm:px-4 sm:py-3">
                        {/* The accessible copy is the finished sentence. The
                            typed layer spends most of its life as a fragment,
                            so it is hidden from assistive tech, and the
                            invisible copy stacked under it in the same grid
                            cell is what holds the box at its final height. */}
                        <span className="sr-only">{reply.body}</span>
                        <span aria-hidden="true" className="invisible [grid-area:1/1]">
                          {reply.body}
                        </span>
                        <span aria-hidden="true" data-reply-text className="[grid-area:1/1]">
                          {reply.body}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}

                <li
                  data-reply-tail="shown"
                  className="flex items-center gap-2 pl-3 text-[0.8rem] text-muted-dark transition-opacity duration-300 data-[reply-tail=pending]:opacity-0 sm:pl-6"
                >
                  <span aria-hidden="true" className="flex items-center gap-1">
                    <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                    <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                    <span className="typing-dot size-1.5 rounded-full bg-muted-dark" />
                  </span>
                  {drawn.typing}
                </li>
              </ol>

              {/* The call sits in the same card rather than beside it: it is
                  the same promise on a longer clock, not a second product. */}
              {/* One grid placed differently at each width, not two layouts.
                  The icon and the face pile are fixed, so wrapping left the
                  sentence ~137px and six lines on a phone. */}
              {/* Two fixed-width children on one line starve the flexible one.
                  At 361px the 40px tile and the 108px pile left the title
                  ~102px and it broke across two lines. Below `sm` the pile
                  drops to its own row and the title gets the full measure;
                  from `sm` there is room for all three abreast. */}
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-t border-paper/10 px-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-4 sm:gap-y-2 sm:px-6 sm:py-5">
                <span
                  className={`col-start-1 row-start-1 grid size-10 shrink-0 place-items-center rounded-xl sm:row-span-2 ${callTone.tile}`}
                >
                  <Icon name="videoCamera" className="size-[1.1rem]" />
                </span>
                <span className="col-start-2 row-start-1 min-w-0 text-sm font-semibold text-paper">
                  {drawn.call.title}
                </span>
                <span className="col-span-2 col-start-1 row-start-2 text-[0.82rem] leading-relaxed text-muted-dark sm:col-span-1 sm:col-start-2">
                  {drawn.call.body}
                </span>

                {/* Overlapping discs, the way the live site draws them: four
                    initials in the four signal tones, each ringed in the
                    card's own ground so the pile reads as one group with
                    depth rather than four separate circles. */}
                <span
                  aria-hidden="true"
                  className="col-span-2 col-start-1 row-start-3 flex shrink-0 items-center justify-self-start sm:col-span-1 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:justify-self-end"
                >
                  {drawn.call.initials.map((member) => (
                    <span
                      key={member.letter}
                      className={`-ml-2 grid size-7 place-items-center rounded-full font-display text-[0.72rem] font-extrabold ring-2 ring-ink first:ml-0 ${toneOf(member.tone).tile}`}
                    >
                      {member.letter}
                    </span>
                  ))}
                  {/* Neutral, not a fifth tone. The four discs are members;
                      this is the count of the rest, so it has to read as a
                      different kind of thing — and gold here sat next to the
                      gold disc and made two of them. Ink on paper, the
                      highest contrast available on this card. */}
                  <span className="-ml-2 grid size-7 place-items-center rounded-full bg-paper text-[0.6rem] font-bold text-ink ring-2 ring-ink">
                    {drawn.call.overflow}
                  </span>
                </span>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[0.82rem] leading-relaxed text-muted">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {drawn.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
