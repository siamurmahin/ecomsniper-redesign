import { useState } from 'react';
import Seo from '../components/ui/Seo';
import { PLAYBOOK, SITE } from '../data/siteContent';
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
  const sectionRef = useRevealOnScroll({ start: 'top 95%' });
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [email, setEmail] = useState('');

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
        title="The Invisible Store — Free eBay Dropshipping Playbook | EcomSniper"
        description="A free 10 page playbook on how eBay dropshipping actually works with no stock, no website and no experience. Includes whether it is even allowed, and who EcomSniper is wrong for."
        path="/free-playbook"
      />

      <section ref={sectionRef} className="pb-24 pt-36 sm:pt-44">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
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

              <ul className="mt-9 flex flex-col gap-3">
                {PLAYBOOK.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    data-reveal
                    data-reveal-group="playbook-bullets"
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-ebay-green/15 text-[0.55rem] text-ebay-green"
                    >
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Capture form */}
            <div
              data-reveal
              data-reveal-group="playbook-form"
              className="rounded-3xl border border-hairline bg-white/70 p-8 shadow-lift sm:p-10"
            >
              {status === 'done' ? (
                <div role="status">
                  <h2 className="text-2xl font-extrabold tracking-tight">Check your inbox.</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    The playbook is on its way. If it has not arrived in a couple of minutes, look in
                    promotions or spam — and reply to it either way. A person reads those.
                  </p>
                  <a
                    href={SITE.discordUrl}
                    rel="noopener noreferrer"
                    className="btn-secondary mt-7"
                  >
                    Join the Discord while you wait
                  </a>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    Where should we send it?
                  </h2>

                  <label htmlFor="playbook-email" className="mt-6 block text-sm font-medium">
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
                    className="mt-2 w-full rounded-2xl border border-hairline bg-paper px-4 py-3.5 text-base outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-ink"
                  />

                  {status === 'error' && (
                    <p role="alert" className="mt-3 text-sm text-ebay-red">
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

                  <p id="playbook-smallprint" className="mt-4 text-xs leading-relaxed text-muted">
                    {PLAYBOOK.smallprint}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
