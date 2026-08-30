import { useCallback, useEffect, useRef, useState } from 'react';
import FigureRail from '../components/ui/FigureRail';
import Icon from '../components/ui/Icon';
import VideoLightbox from '../components/ui/VideoLightbox';
import { PROOF } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { thumbUrl } from '../lib/proofMedia';

/** Seconds an interview holds the stage before the next one takes it. */
const DWELL = 5;

/**
 * 04b — Member interviews.
 *
 * Its own section, on an ink band. Video is the one kind of proof that asks
 * for the lights down, and the band also separates it from the paper sections
 * either side so the three kinds of evidence stop reading as one long list.
 *
 * Twelve interviews in a grid would be four rows of large thumbnails and most
 * of a screen. A lead interview beside a list of the rest is the shape a
 * channel already has: one thing offered, the rest waiting, and the whole
 * library legible without scrolling past it.
 *
 * EVERY THUMBNAIL PLAYS. It used to be a stage plus a playlist, where clicking
 * the list only *selected* and you then had to press play on the stage — two
 * clicks, and the first one looked like it should have started the video. Now
 * the lead card and all eleven list rows open the same lightbox, so there is
 * one thing a thumbnail can do and it is the thing it looks like it does.
 *
 * The player lives in the lightbox and nowhere else, so the privacy note below
 * stays true: nothing is requested from YouTube until something is opened.
 */
export default function InterviewsSection() {
  const sectionRef = useRevealOnScroll();
  const { interviews } = PROOF;

  const [openIndex, setOpenIndex] = useState(null);
  /* The thumbnail that opened the lightbox, so focus goes back to it rather
     than to the top of the document. */
  const openerRef = useRef(null);

  /* The stage cycles all twelve interviews rather than holding the first.
     Same shape as the rotation in section 03: it parks off screen, holds
     under the pointer, and never runs under reduced motion. */
  const [leadIndex, setLeadIndex] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isStatic] = useState(() => prefersReducedMotion());
  const stageRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef(new Map());

  /* Follow the stage with the list. The highlighted row is useless if it has
     scrolled out of the panel, and by the twelfth interview it has.

     Only ever `scrollTop` on the list itself — `scrollIntoView` walks every
     scrollable ancestor including the page, and the page belongs to Lenis.
     This cannot fight a reader either: the turn only happens when the pointer
     is nowhere near the section, because hovering either half holds it. */
  useEffect(() => {
    const list = listRef.current;
    const row = rowRefs.current.get(PROOF.videos[leadIndex].id);
    if (!list || !row) return;

    const target = row.offsetTop - (list.clientHeight - row.offsetHeight) / 2;
    list.scrollTo({
      top: Math.max(0, target),
      behavior: isStatic ? 'auto' : 'smooth',
    });
  }, [leadIndex, isStatic]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    // Nothing rotates where nobody is looking.
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /* Paused while the lightbox is open — turning the stage under someone who
     is watching would change what they come back to.

     A bare timer: this drove a progress bar for a while, which is why section
     03 runs its rotation off a tween. Without a bar to keep in step there is
     nothing to synchronise, and a countdown the reader cannot see does not
     need one. */
  useEffect(() => {
    if (isStatic || isHeld || !isInView || openIndex !== null) return undefined;

    const turn = gsap.delayedCall(DWELL, () =>
      setLeadIndex((index) => (index + 1) % PROOF.videos.length),
    );
    return () => turn.kill();
  }, [leadIndex, isHeld, isInView, isStatic, openIndex]);

  const openAt = (index, event) => {
    openerRef.current = event.currentTarget;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    openerRef.current?.focus?.();
  }, []);

  /* Wraps, so the arrows never dead-end on the twelfth. */
  const step = useCallback((direction) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      const count = PROOF.videos.length;
      return (current + direction + count) % count;
    });
  }, []);

  const lead = PROOF.videos[leadIndex];

  return (
    <section
      ref={sectionRef}
      id="interviews"
      aria-labelledby="interviews-headline"
      className="section-band relative overflow-hidden bg-ink text-paper"
    >
      {/* One wash, off to the side of the lead card, so the band has a light
          source rather than being a flat fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(46rem_26rem_at_25%_8%,rgb(91_157_240/0.18),transparent_70%)]"
      />

      <div className="site-shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <header className="max-w-2xl">
            <p
              className="section-eyebrow section-eyebrow-on-ink"
              data-reveal
              data-reveal-group="interviews-heading"
            >
              {interviews.eyebrow}
            </p>

            <h2
              id="interviews-headline"
              className="mt-4 text-[length:var(--text-section)] leading-[0.98] text-paper"
              data-reveal
              data-reveal-group="interviews-heading"
            >
              {interviews.headline}
            </h2>

            <p
              className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-muted-dark"
              data-reveal
              data-reveal-group="interviews-heading"
            >
              {interviews.lead}
            </p>
          </header>

          <a
            href={interviews.channelHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-dark transition-colors hover:text-paper"
          >
            <Icon name="youtube" className="size-4 shrink-0 text-ebay-red" />
            {interviews.channelLabel}
            <Icon
              name="arrowRight"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* The numbers, before the thumbnails. Eight of the twelve carry a
            figure in their title, and buried mid-sentence in a scrolling list
            none of them lands. Read across, they make the section's whole
            argument before anyone opens anything: twelve people, twelve
            different results. Each pill plays its interview. */}
        <div className="mt-9" data-reveal data-reveal-group="interviews-figures">
          <FigureRail videos={PROOF.videos} onSelect={openAt} />
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.65fr_1fr] lg:items-start">
          {/* The stage. It cycles all twelve; the player itself only ever
              appears in the lightbox. Holding the pointer anywhere over it
              stops the turn, so a title can be read without it moving. */}
          <div
            ref={stageRef}
            data-reveal
            data-reveal-group="interviews-stage"
            onPointerEnter={() => setIsHeld(true)}
            onPointerLeave={() => setIsHeld(false)}
            onFocusCapture={() => setIsHeld(true)}
            onBlurCapture={() => setIsHeld(false)}
          >
            <button
              type="button"
              onClick={(event) => openAt(leadIndex, event)}
              aria-haspopup="dialog"
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-ink-line bg-ink text-left shadow-float"
            >
              {/* `key` restarts the fade on every turn, so a change reads as
                  a change rather than the poster swapping underneath. CSS,
                  not a tween: it runs on the compositor and cannot stutter
                  behind whatever else the page is doing. */}
              <img
                key={lead.id}
                src={thumbUrl(lead.thumb)}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full animate-[panel-in_0.6s_var(--ease-out-expo)_both] object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10"
              />

              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-float transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-110"
              >
                <Icon name="play" className="size-5 translate-x-0.5" />
              </span>

              <span key={lead.id} className="absolute inset-x-0 bottom-0 block animate-[panel-in_0.6s_var(--ease-out-expo)_both] p-5">
                <span className="block text-[0.7rem] uppercase tracking-[0.14em] text-muted-dark">
                  {lead.guest}
                  {lead.views && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="tabular-nums">{lead.views} views</span>
                    </>
                  )}
                </span>
                <span className="mt-1.5 block font-display text-lg font-extrabold leading-snug tracking-tight text-paper">
                  {lead.title}
                </span>
              </span>
            </button>

            <p className="mt-4 flex items-center gap-2 text-xs text-muted-dark">
              <Icon name="shield" className="size-4 shrink-0 text-accent-soft" />
              {interviews.privacyNote}
            </p>
          </div>

          {/* All twelve, including the one currently on stage — the stage
              cycles through them now, so a list of "the others" would change
              membership every five seconds and nothing would stay where the
              reader last saw it.

              Holding the pointer here stops the turn too: picking a row off a
              list that is quietly rotating behind you is how you end up
              opening the wrong interview.

              `data-lenis-prevent` hands the wheel back to this panel; without
              it Lenis scrolls the page while the pointer is over a list that
              plainly scrolls itself. */}
          <div
            data-reveal
            data-reveal-group="interviews-list"
            onPointerEnter={() => setIsHeld(true)}
            onPointerLeave={() => setIsHeld(false)}
            onFocusCapture={() => setIsHeld(true)}
            onBlurCapture={() => setIsHeld(false)}
            className="rounded-2xl border border-ink-line bg-ink-soft/60 p-2"
          >
            <h3 className="micro-label px-3 pb-2 pt-2 text-muted-dark">
              {interviews.listLabel}
              <span className="ml-2 rounded-full bg-paper/10 px-1.5 py-0.5 text-[0.65rem] font-bold tabular-nums">
                {PROOF.videos.length}
              </span>
            </h3>

            <ul
              ref={listRef}
              data-lenis-prevent
              className="max-h-[22rem] overflow-y-auto lg:max-h-[26rem]"
            >
              {PROOF.videos.map((video, index) => (
                <li
                  key={video.id}
                  ref={(node) => {
                    if (node) rowRefs.current.set(video.id, node);
                    else rowRefs.current.delete(video.id);
                  }}
                >
                  <button
                    type="button"
                    onClick={(event) => openAt(index, event)}
                    aria-haspopup="dialog"
                    aria-current={index === leadIndex}
                    className={`group flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors duration-300 ${
                      index === leadIndex ? 'bg-paper/12' : 'hover:bg-paper/8'
                    }`}
                  >
                    <span className="relative block w-24 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={thumbUrl(video.thumb)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover"
                      />
                      {/* Every row is a play button, so every row says so on
                          hover and on keyboard focus. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 grid place-items-center bg-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <Icon name="play" className="size-3.5 text-paper" />
                      </span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[0.8rem] font-semibold leading-snug transition-colors duration-300 group-hover:text-paper ${
                          index === leadIndex ? 'text-paper' : 'text-muted-dark'
                        }`}
                      >
                        {video.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-[0.68rem] text-muted-dark">
                        {video.guest}
                        {/* Only the videos whose figure was recorded show one.
                            An invented count is worse than none. */}
                        {video.views && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{video.views} views</span>
                          </>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <VideoLightbox
        video={openIndex === null ? null : PROOF.videos[openIndex]}
        onClose={close}
        onStep={step}
        index={openIndex ?? 0}
        total={PROOF.videos.length}
      />
    </section>
  );
}
