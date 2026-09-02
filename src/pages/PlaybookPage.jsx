import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { useContent } from '../hooks/useContent';
import Icon from '../components/ui/Icon';
import PlaybookDelivered from '../components/layout/PlaybookDelivered';
import playbookCover from '../assets/brand/playbook-cover.webp';

/** The author's portrait, resolved the way the founders section resolves it. */
const PORTRAITS = import.meta.glob('../assets/people/*.jpg', { eager: true, import: 'default' });
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * /free-playbook — the top of the nurture funnel.
 *
 * This is the destination for every "not ready yet" exit on the site: the hero
 * secondary CTA, the final second door, and the exit-intent offer. It is
 * deliberately a single-purpose page with no navigation competition below the
 * fold — one field, one button, one promise.
 *
 * The form posts to whichever ESP endpoint is configured; wire
 * VITE_PLAYBOOK_ENDPOINT to the list that fires the 5-email sequence.
 */
export default function PlaybookPage() {
  const { FOUNDERS, PLAYBOOK, SEO } = useContent();
  const author = FOUNDERS.people[0];
  const authorPortrait = PORTRAITS[`../assets/people/${author.photo}.jpg`];
  const sectionRef = useRevealOnScroll({ start: 'top 95%' });
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  /* Closing the dialog leaves the page, deliberately. Once the file is in
     their hands this page has nothing left to offer — it is a form they have
     already filled in — and dropping them back on it would read as the form
     having failed. Home is where the argument is. */
  const closeDone = () => navigate('/');

  const endpoint = import.meta.env.VITE_PLAYBOOK_ENDPOINT;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');

    // No endpoint configured yet: succeed locally so the page is demonstrable,
    // and log loudly so it is obvious this still needs wiring before launch.
    if (!endpoint) {
      console.warn('[playbook] VITE_PLAYBOOK_ENDPOINT is not set — submission not sent.');
      setStatus('done');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free-playbook' }),
      });
      setStatus(response.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Seo
        title={SEO.playbook.title}
        description={SEO.playbook.description}
        path="/free-play-book"
      />

      <section ref={sectionRef} className="pb-20 pt-36 sm:pt-44">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-eyebrow" data-reveal data-reveal-group="playbook">
                {PLAYBOOK.eyebrow}
              </p>

              <h1
                className="mt-5 text-[length:var(--text-hero)] leading-[0.95]"
                data-reveal
                data-reveal-group="playbook"
              >
                {PLAYBOOK.headline}
              </h1>

              <p
                className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted"
                data-reveal
                data-reveal-group="playbook"
              >
                {PLAYBOOK.lead}
              </p>

              {/* The cover sits with the copy at the size the founders section
                  already uses for it — tilted, height-constrained, a prop
                  rather than the subject. Full width in its own column it was
                  most of the screen, which made the page about the object
                  instead of about what is in it. */}
              <div
                data-reveal
                data-reveal-group="playbook"
                className="mt-9 flex flex-col gap-6 rounded-3xl border border-hairline bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
              >
                <img
                  src={playbookCover}
                  alt="The Invisible Store, the free EcomSniper playbook"
                  width={855}
                  height={1370}
                  className="mx-auto h-44 w-auto shrink-0 -rotate-3 drop-shadow-[0_18px_30px_rgba(30,31,35,0.22)] sm:mx-0"
                />

                <ul className="flex flex-col gap-3">
                  {PLAYBOOK.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[0.95rem] leading-relaxed"
                    >
                      {/* Was the raw brand green at about 2.4:1 on paper, the
                          same fault already fixed in sections 11 and 12. */}
                      <span
                        aria-hidden="true"
                        className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-signal-green/15 text-signal-green-deep"
                      >
                        <Icon name="check" className="size-2.5" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who wrote it, in the shape the founders section uses. A free
                  book from nobody is a lead magnet; a free book from the
                  person who built the software is the software's argument. */}
              <div
                data-reveal
                data-reveal-group="playbook"
                className="mt-4 flex items-center gap-5 rounded-3xl border border-hairline bg-white p-6 sm:p-7"
              >
                <img
                  src={authorPortrait}
                  alt={author.name}
                  width={200}
                  height={200}
                  loading="lazy"
                  className="size-16 shrink-0 rounded-full object-cover"
                />

                <div>
                  <p className="micro-label text-muted">Written by</p>
                  <p className="mt-1.5 font-display text-lg font-extrabold tracking-tight">
                    {author.name}
                    <span className="ms-2 text-sm font-medium text-muted">{author.role}</span>
                  </p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{author.detail}</p>
                </div>
              </div>
            </div>

            {/* Capture form */}
            <div
              data-reveal
              data-reveal-group="playbook-form"
              className="relative overflow-hidden rounded-3xl bg-ink p-6 text-paper shadow-float sm:p-8 lg:sticky lg:top-28"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-brand)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-accent/25 blur-3xl"
              />

              <form onSubmit={onSubmit} noValidate className="relative">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Where should we send it?
                </h2>

                <label htmlFor="playbook-email" className="mt-5 block text-sm font-medium">
                  Email address
                </label>

                <input
                  id="playbook-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  aria-describedby="playbook-smallprint"
                  className="mt-2 w-full rounded-2xl border border-ink-line bg-paper/[0.06] px-4 py-3.5 text-base text-paper outline-none transition-colors duration-200 placeholder:text-muted-dark focus:border-accent-soft"
                />

                {status === 'error' && (
                  <p role="alert" className="mt-3 text-sm text-signal-red-soft">
                    That did not send. Try again, or email us and we will pass it on manually.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : PLAYBOOK.formCta}
                </button>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {PLAYBOOK.reassurances.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-muted-dark">
                      <Icon
                        name="check"
                        className="size-3 shrink-0 text-signal-green-soft"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-dark">
                  <Icon name="shield" className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                  {PLAYBOOK.privacy}
                </p>

                <p
                  id="playbook-smallprint"
                  className="mt-3 text-xs leading-relaxed text-muted-dark"
                >
                  {PLAYBOOK.smallprint}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* The hand-over, as a dialog rather than a panel that replaces the
          form. The page behind it is spent — a form they have already filled
          in — and a modal is what stops the download competing with it. */}
      {status === 'done' && <PlaybookDelivered onClose={closeDone} />}
    </>
  );
}
