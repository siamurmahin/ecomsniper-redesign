import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import BrandLogo from '../ui/BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { languageFromPath, pathForLanguage } from '../../lib/language';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { useContent } from '../../hooks/useContent';

/**
 * Fixed header in two states: transparent over the hero, condensed and frosted
 * once past it. The mobile panel traps nothing and closes on route change and
 * Escape, which is what people expect from a marketing menu.
 *
 * **The Features dropdown reuses the panel machinery rather than adding its
 * own.** Escape, the outside `pointerdown` and the close-on-route-change were
 * already here for the mobile panel; the dropdown joins the same effects, so
 * what it costs is one piece of state and the markup. A second set of
 * listeners doing the same job would have been the expensive way to write the
 * same behaviour, and this component is eager on every route.
 *
 * Body scroll locks for the panel and deliberately not for the dropdown: a
 * dropdown is a few links in a bar, the page behind it stays usable, and
 * locking scroll for it is the modal treatment applied to something that is
 * not a modal.
 *
 * **Nav links are `Link`, not `<a>`.** They were anchors while four of them
 * were hash links into the homepage. Now that every one is a real route, an
 * anchor would reload the whole application to move between two prerendered
 * pages the router already has in hand.
 */
export default function SiteHeader() {
  const { NAV_LINKS, SITE, A11Y } = useContent();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /* Which dropdown is open, by label, or null. One at a time: two open menus
     in a seven-item bar is a mess, and a single value makes that impossible
     rather than merely discouraged. */
  const [openGroup, setOpenGroup] = useState(null);
  /* Whether this page's hero is one of the dark ones. About and the course
     stand on `surface-deep`, and the ink wordmark loses half its lettering on
     it — "Sniper" is black artwork, so it simply disappears. */
  const [hasDeepHero, setHasDeepHero] = useState(false);
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

  // Close the mobile panel and any open dropdown whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenGroup(null);
  }, [location.pathname, location.hash]);

  /* Read after paint rather than during render, and re-read on navigation.
     False on the server and on the hydrating render, which is what keeps the
     markup matching; the swap is an ordinary update the frame after. */
  useEffect(() => {
    const hero = document.querySelector('main section, section');
    setHasDeepHero(Boolean(hero?.classList.contains('surface-deep')));
  }, [location.pathname]);

  /* Escape or a tap outside closes the panel; body scroll is locked while it
     is open. Without the outside tap the only way out was the X, which is the
     opposite of what a tap on the page behind a menu is asking for.

     pointerdown, not click: with body scroll locked, a tap on the page behind
     can end without ever producing a click. */
  useEffect(() => {
    if (!isMenuOpen && !openGroup) return undefined;

    const closeAll = () => {
      setIsMenuOpen(false);
      setOpenGroup(null);
    };

    const onKey = (event) => event.key === 'Escape' && closeAll();
    const onOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) closeAll();
    };

    /* Only the panel locks the page. A dropdown is a few links in a bar and
       the page behind it stays usable; locking scroll for it would be the
       modal treatment applied to something that is not a modal. */
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, [isMenuOpen, openGroup]);

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
          {/* Paper lettering while the bar is transparent over a dark hero;
              ink once it condenses onto its own paper surface, which is the
              state every other page is in from the first pixel. */}
          <Link to={homeHref} aria-label={A11Y.home} className="min-w-0 shrink">
            <BrandLogo tone={hasDeepHero && !isCondensed ? 'paper' : 'ink'} />
          </Link>

          {/* shrink-0 and nowrap: seven items wrapped to a second row between
              1024 and ~1400px and took the header from 62px to 94px. The logo
              gives up the pixels instead — it is already clamped for this. */}
          <nav
            aria-label={A11Y.navPrimary}
            className="hidden shrink-0 items-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1"
          >
            {NAV_LINKS.map((link) =>
              link.items ? (
                <div
                  key={link.label}
                  data-nav-group
                  className="relative"
                  /* Hover opens it on a pointer device. Click is kept rather
                     than replaced: it is what a keyboard and a touch screen
                     have, and a menu that only answers hover is a menu half
                     the visitors cannot open. */
                  onMouseEnter={() => setOpenGroup(link.label)}
                  onMouseLeave={() =>
                    setOpenGroup((current) => (current === link.label ? null : current))
                  }
                >
                  {/* A button, not a link: it goes nowhere, and a link that goes
                      nowhere is the thing screen-reader users complain about.
                      `aria-expanded` announces the state; the chevron is only
                      for the people who can see it. */}
                  <button
                    type="button"
                    data-nav-group-toggle
                    aria-expanded={openGroup === link.label}
                    onClick={() =>
                      setOpenGroup((current) => (current === link.label ? null : link.label))
                    }
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium transition-colors duration-200 hover:bg-ink/5 hover:text-ink xl:px-3.5 ${
                      openGroup === link.label ? 'bg-ink/5 text-ink' : 'text-muted'
                    }`}
                  >
                    {link.label}
                    <Icon
                      name="chevronDown"
                      className={`size-3 transition-transform duration-200 ${
                        openGroup === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* `hidden` rather than unmounting: the links are in the
                      prerendered HTML either way, so a crawler and a no-JS
                      visitor both get four real hrefs rather than a button that
                      does nothing. */}
                  <div
                    data-nav-group-panel
                    hidden={openGroup !== link.label}
                    className="absolute top-full left-0 mt-2 min-w-[15rem] rounded-2xl border border-hairline bg-paper/95 p-2 shadow-float backdrop-blur-xl"
                  >
                    {link.items.map((item) => (
                      <Link
                        key={item.href}
                        to={pathForLanguage(item.href, language)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={pathForLanguage(link.href, language)}
                  className="rounded-full px-2.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-ink/5 hover:text-ink xl:px-3.5"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Between the nav and the account links, where the live site
                puts it. Hidden below lg with the nav — the mobile panel
                carries its own copy. */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            <Link
              to={pathForLanguage(SITE.loginUrl, language)}
              // whitespace-nowrap and shrink-0: from about 1090px down, the
              // row got tight enough to break "Log in" across two lines, which
              // took the header's height with it.
              className="hidden shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:block xl:px-3.5"
            >
              {SITE.loginLabel}
            </Link>

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
            {NAV_LINKS.map((link) =>
              link.items ? (
                <div key={link.label}>
                  {/* A control, not a heading. It was rendered permanently open
                     on the theory that a second tap to reach four pages is a
                     tap too many; in the panel that reads as four stray links
                     under a label rather than as a group somebody opened. */}
                  <button
                    type="button"
                    aria-expanded={openGroup === link.label}
                    onClick={() =>
                      setOpenGroup((current) => (current === link.label ? null : link.label))
                    }
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-ink/5"
                  >
                    {link.label}
                    <Icon
                      name="chevronDown"
                      className={`size-3.5 transition-transform duration-200 ${
                        openGroup === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div hidden={openGroup !== link.label} className="flex flex-col pb-1 pl-4">
                    {link.items.map((item) => (
                      <Link
                        key={item.href}
                        to={pathForLanguage(item.href, language)}
                        className="rounded-2xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={pathForLanguage(link.href, language)}
                  className="rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to={pathForLanguage(SITE.loginUrl, language)}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-muted transition-colors hover:bg-ink/5"
            >
              {SITE.loginLabel}
            </Link>

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
