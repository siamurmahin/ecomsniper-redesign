import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import CtaButton from '../ui/CtaButton';
import { NAV_LINKS, SITE } from '../../data/siteContent';

/**
 * Fixed header in two states: transparent over the hero, condensed and frosted
 * once past it. The mobile panel traps nothing and closes on route change and
 * Escape, which is what people expect from a marketing menu.
 */
export default function SiteHeader() {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Condense the bar after roughly one viewport-third of scrolling.
  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel whenever the route changes.
  useEffect(() => setIsMenuOpen(false), [location.pathname, location.hash]);

  // Escape closes the panel; body scroll is locked while it is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setIsMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="site-shell">
        <div
          // py-2 rather than py-2.5: the wordmark is now the tallest thing in
          // the pill, so the smaller inset keeps the bar the height it was.
          // The tighter gap and inset below sm are what pay for the wordmark:
          // every pixel not spent on padding here is one the logo can keep, and
          // keeping the name legible on a phone is worth more than the inset.
          className={`relative flex items-center justify-between gap-2 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow,padding] duration-500 ease-[var(--ease-out-expo)] sm:gap-4 sm:px-5 ${
            isCondensed
              ? 'border-hairline bg-paper/85 shadow-lift backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* The signal set as a hairline under the bar, as on the live
              header. Only once the bar has a surface to sit on. */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-6 -bottom-px h-px bg-[linear-gradient(90deg,var(--color-signal-blue)_0%,var(--color-signal-red)_34%,var(--color-signal-gold)_67%,var(--color-signal-green)_100%)] transition-opacity duration-500 sm:inset-x-8 ${
              isCondensed ? 'opacity-70' : 'opacity-0'
            }`}
          />
          <Link to="/" aria-label="EcomSniper home" className="min-w-0 shrink">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.loginUrl}
              className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:block"
            >
              Log in
            </a>

            <CtaButton
              href={SITE.signupUrl}
              intent="header-signup"
              // whitespace-nowrap: the label is two words and a price, and by
              // ~500px the pill ran out of room and broke it onto a second
              // line, which doubled the height of the whole header.
              className="whitespace-nowrap !px-3 !py-2.5 text-[0.82rem] sm:!px-5"
            >
              Start for $97
            </CtaButton>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline bg-paper/60 sm:size-10 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ${
                    isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ${
                    isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        <div
          id="mobile-nav-panel"
          hidden={!isMenuOpen}
          className="mt-2 overflow-hidden rounded-3xl border border-hairline bg-paper/95 p-2 shadow-float backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.loginUrl}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-muted transition-colors hover:bg-ink/5"
            >
              Log in
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
