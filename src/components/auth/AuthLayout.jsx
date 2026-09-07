import { Link, useLocation } from 'react-router';
import HeroDots from '../hero/HeroDots';
import Icon from '../ui/Icon';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { languageFromPath, pathForLanguage } from '../../lib/language';

/**
 * The shell both auth pages stand in: the form on the left, something to look
 * at on the right.
 *
 * Their own login page is a Material card centred on an empty white page, and
 * their registration page is the same card with an income claim over it. A
 * login page is the most-visited page a subscription product has — the one
 * screen a paying member sees every week — so it gets the site's own ground
 * rather than a default.
 *
 * **The dot field is `HeroDots`, the component the homepage hero mounts**, not
 * a CSS imitation of it. Two dot fields that are nearly the same read worse
 * than one that is, and it unmounts its own canvas when scrolled away.
 *
 * **The right column is not load-bearing.** Below `lg` it is not rendered at
 * all — not hidden, not collapsed — because on a phone the job is to get to
 * the fields, and a decorative column above them is a screen of scrolling
 * before anybody can type. Nothing in it is information the form needs.
 *
 * **Padding, not `section-band`.** A band is shorter than the floating header,
 * so its first line lands underneath it. `ContactPage` and `PlaybookPage`
 * both set their own top padding for this reason; this is the third.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The form column.
 * @param {React.ReactNode} props.aside What stands on the right from `lg` up.
 * @param {string} props.notConnected The line saying nothing is wired up.
 */
export default function AuthLayout({ children, aside, notConnected }) {
  const ref = useRevealOnScroll();

  return (
    <section
      ref={ref}
      className="brand-ground relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-24"
    >
      <HeroDots />

      <div className="site-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div className="min-w-0">{children}</div>

          {/* Rendered from `lg` only — see the header. */}
          <div className="hidden lg:block" data-reveal data-reveal-group="auth-aside">
            {aside}
          </div>
        </div>

        {/* The honest line, at the foot of both pages and in both languages.
            It is not a toast and not a tooltip: a form that looks like it signs
            you in and does not is worse than no page, so this is stated before
            anybody types rather than after they press the button. */}
        <p
          className="mt-14 flex max-w-2xl items-start gap-2.5 border-t border-hairline pt-6 text-sm leading-relaxed text-muted"
          data-reveal
          data-reveal-group="auth-note"
        >
          <Icon name="shield" className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {notConnected}
        </p>
      </div>
    </section>
  );
}

/**
 * The foot of a form: one sentence and the door to the other page.
 *
 * `Link`, not `<a>`: both routes are prerendered and the router already holds
 * them, so an anchor here would reload the whole application to move between
 * two pages it has in memory. The nav learned this the hard way on 7 Sep.
 */
export function AuthSwitch({ prompt, cta }) {
  const { pathname } = useLocation();

  return (
    <p className="mt-7 text-sm text-muted">
      {prompt}{' '}
      <Link
        to={pathForLanguage(cta.href, languageFromPath(pathname))}
        className="font-semibold text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
      >
        {cta.label}
      </Link>
    </p>
  );
}
