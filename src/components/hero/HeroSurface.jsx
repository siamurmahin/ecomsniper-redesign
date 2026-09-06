import HeroDots from './HeroDots';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

/**
 * The first screen of a page that is not the homepage.
 *
 * Every hero on this site stands on the same two things: `brand-ground`, the
 * colour floor lifted out of `HeroSection` so a second page could use it, and
 * `HeroDots`, the canvas dot field — the same component the homepage mounts,
 * not a CSS imitation, because two dot fields that are nearly the same read
 * worse than one that is.
 *
 * `AffiliatePage`, `ProductHunterPage` and `AiListerPage` each write that out
 * by hand. This is it once, so a page built next week gets the treatment by
 * importing it rather than by remembering it.
 *
 * The padding clears the floating header, which `section-band` alone does not
 * — it is shorter than the header is tall, and a heading that starts under the
 * header is the bug this replaces on every page that has ever forgotten it.
 *
 * It owns its own reveal scope, like every other band, so the copy inside
 * animates in as its own group rather than joining whatever came before.
 *
 * @param {object} props
 * @param {string} [props.className] Extra classes for the section.
 * @param {React.ReactNode} props.children Rendered inside the shell.
 */
export default function HeroSurface({ className = '', children }) {
  const ref = useRevealOnScroll();

  return (
    <section
      ref={ref}
      className={`brand-ground relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20 lg:pt-52 lg:pb-24 ${className}`.trim()}
    >
      <HeroDots />
      <div className="site-shell">{children}</div>
    </section>
  );
}
