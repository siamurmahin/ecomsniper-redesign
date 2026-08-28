import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { COMMUNITY } from '../data/siteContent';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * 08 — Support and community.
 *
 * The review identified this as the real differentiator against cheaper listing
 * tools, so it gets a full band rather than a row of icons, and it closes on a
 * verbatim member quote about support — the claim and its evidence in the same
 * viewport.
 */
export default function CommunitySection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="community"
      aria-labelledby="community-headline"
      className="section-band"
    >
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={COMMUNITY.eyebrow}
              headline={<span id="community-headline">{COMMUNITY.headline}</span>}
              lead={COMMUNITY.lead}
            />

            <p
              data-reveal
              data-reveal-group="community-body"
              className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted"
            >
              {COMMUNITY.body}
            </p>

            <figure
              data-reveal
              data-reveal-group="community-quote"
              className="mt-10 border-l-2 border-ink pl-6"
            >
              <blockquote className="font-serif text-xl italic leading-snug sm:text-2xl">
                “{COMMUNITY.pullQuote.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">
                <span className="font-semibold text-ink">{COMMUNITY.pullQuote.author}</span> ·{' '}
                {COMMUNITY.pullQuote.source}
              </figcaption>
            </figure>
          </div>

          <ul className="flex flex-col gap-3 lg:pt-4">
            {COMMUNITY.items.map((item) => (
              <li
                key={item.label}
                data-reveal
                data-reveal-group="community-items"
                className="flex items-start gap-5 rounded-2xl border border-hairline bg-white/60 p-6 transition-[transform,border-color] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/25"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-paper">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block font-semibold">{item.label}</span>
                  <span className="mt-1 block text-[0.9rem] leading-relaxed text-muted">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
