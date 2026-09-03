import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import BrandLogo from '../ui/BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { languageFromPath, pathForLanguage } from '../../lib/language';
import CtaButton from '../ui/CtaButton';
import { useContent } from '../../hooks/useContent';

/**
 * Fixed header in two states: transparent over the hero, condensed and frosted
 * once past it. The mobile panel traps nothing and closes on route change and
 * Escape, which is what people expect from a marketing menu.
 */
export default function SiteHeader() {
  const { NAV_LINKS, SITE, A11Y } = useContent();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  /* Every internal link keeps the language the reader is in. */
  const language = languageFromPath(location.pathname);
  const homeHref = pathForLanguage('/', language);

  // Condense the bar after roughly one viewport-third of scrolling.
  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel whenever the route changes.
  useEffect(() => setIsMenuOpen(false), [location.pathname, location.hash]);

  /* Escape or a tap outside closes the panel; body scroll is locked while it
     is open. Without the outside tap the only way out was the X, which is the
     opposite of what a tap on the page behind a menu is asking for.

     pointerdown, not click: with body scroll locked, a tap on the page behind
     can end without ever producing a click. */
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKey = (event) => event.key === 'Escape' && setIsMenuOpen(false);
    const onOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
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
          <Link to={homeHref} aria-label={A11Y.home} className="min-w-0 shrink">
            <BrandLogo />
          </Link>

          {/* shrink-0 and nowrap: seven items wrapped to a second row between
              1024 and ~1400px and took the header from 62px to 94px. The logo
              gives up the pixels instead — it is already clamped for this. */}
          <nav
            aria-label={A11Y.navPrimary}
            className="hidden shrink-0 items-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={pathForLanguage(link.href, language)}
                className="rounded-full px-2.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-ink/5 hover:text-ink xl:px-3.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Between the nav and the account links, where the live site
                puts it. Hidden below lg with the nav — the mobile panel
                carries its own copy. */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            <a
              href={SITE.loginUrl}
              // whitespace-nowrap and shrink-0: from about 1090px down, the
              // row got tight enough to break "Log in" across two lines, which
              // took the header's height with it.
              className="hidden shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:block xl:px-3.5"
            >
              {SITE.loginLabel}
            </a>

            <CtaButton
              href={SITE.signupUrl}
              intent="header-signup"
              // whitespace-nowrap: the label is two words and a price, and by
              // ~500px the pill ran out of room and broke it onto a second
              // line, which doubled the height of the whole header.
              className="whitespace-nowrap !px-3 !py-2.5 text-[0.82rem] sm:!px-5"
            >
              {SITE.headerCta}
            </CtaButton>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isMenuOpen ? A11Y.closeMenu : A11Y.openMenu}
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
          <nav aria-label={A11Y.navMobile} className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={pathForLanguage(link.href, language)}
                className="rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.loginUrl}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-muted transition-colors hover:bg-ink/5"
            >
              {SITE.loginLabel}
            </a>

            {/* Ruled off: a language is a setting, not another destination. */}
            <div className="mt-1 border-t border-hairline pt-1">
              <LanguageSwitcher stacked />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
