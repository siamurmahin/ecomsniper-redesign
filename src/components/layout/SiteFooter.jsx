import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { FOOTER, PROOF_BAR, SITE } from '../../data/siteContent';

/**
 * The oversized wordmark that signs the page off.
 *
 * Outlined rather than filled, so it reads as a watermark until a pointer
 * finds it; each letter then fills with its own signal colour and lifts. One
 * tone per letter, cycled — the same rule every enumerated set on this site
 * follows.
 *
 * Literal classes, because Tailwind compiles what it can see: a colour built
 * from an index would produce no stylesheet output at all.
 */
const LETTER_COLOUR = [
  'text-signal-blue',
  'text-signal-red',
  'text-signal-green',
  'text-signal-gold',
];

/**
 * Each platform's own colour, on the mark only.
 *
 * Written as literal classes rather than built from the link's icon name:
 * Tailwind compiles what it can see in the source, and a template literal
 * produces no stylesheet output at all. These are the platforms' published
 * brand values, not the site's signal set, which is why they are hex here
 * rather than tokens — they belong to Discord, YouTube and Facebook.
 */
const SOCIAL_COLOUR = {
  discord: 'text-[#5865F2]',
  youtube: 'text-[#FF0000]',
  facebook: 'text-[#1877F2]',
};

/** The Trustpilot row of the proof bar, so the score is stated once. */
const REVIEWS = PROOF_BAR.items.find((item) => item.href === SITE.trustpilotUrl);

/** Renders an internal path as a router link and anything else as an anchor. */
function FooterLink({ href, label }) {
  const isRouted = href.startsWith('/') && !href.startsWith('/#');

  const className =
    'text-sm text-muted-dark transition-colors duration-200 hover:text-paper';

  return isRouted ? (
    <Link to={href} className={className}>
      {label}
    </Link>
  ) : (
    <a
      href={href}
      className={className}
      {...(/^https?:/.test(href) ? { rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

/**
 * Site footer.
 *
 * It closes the page and carries the legal copy the claims elsewhere depend
 * on, and it is the one place a visitor looks to answer "are these people
 * real" — which is why the contact block is here and not buried.
 *
 * It is also the last thing on the page now that section 15 is gone, so it
 * opens with the offer that costs nothing rather than going straight to a wall
 * of links. Someone who read fifteen sections and did not buy is exactly who
 * the playbook is for.
 */
export default function SiteFooter() {
  const { contact, social, secondDoor } = FOOTER;

  return (
    <footer className="relative overflow-hidden bg-ink pb-10 pt-16 text-paper sm:pt-20">
      {/* Ties the foot of the page back to the top of it: the same ramp runs
          across the plan cards, the dialogs and the sticky bar. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)] opacity-60"
      />

      <div className="site-shell">
        {/* The free door, first, because it is the only thing here anyone can
            act on. */}
        <div className="flex flex-col gap-5 rounded-3xl border border-ink-line bg-paper/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight">
              {secondDoor.title}
            </p>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-dark">
              {secondDoor.body}
            </p>
          </div>

          <CtaButton
            href={secondDoor.cta.href}
            variant="onInk"
            intent="footer-playbook"
            className="shrink-0"
          >
            <Icon name="openBook" className="size-4 shrink-0" aria-hidden="true" />
            {secondDoor.cta.label}
          </CtaButton>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <Link to="/" aria-label="EcomSniper home" className="inline-block text-paper">
              <BrandLogo tone="paper" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-dark">
              {FOOTER.tagline}
            </p>

            {/* The answer to "are these people real". A page that asks for $97
                and states no address is asking to be taken on faith. */}
            <address className="mt-7 not-italic">
              <h2 className="micro-label text-paper/70">{contact.title}</h2>

              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li>
                  <a
                    href={contact.phone.href}
                    className="inline-flex items-center gap-2.5 text-muted-dark transition-colors duration-200 hover:text-paper"
                  >
                    <Icon name="phone" className="size-3.5 shrink-0" aria-hidden="true" />
                    {contact.phone.label}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.email.href}
                    className="inline-flex items-center gap-2.5 text-muted-dark transition-colors duration-200 hover:text-paper"
                  >
                    <Icon name="mail" className="size-3.5 shrink-0" aria-hidden="true" />
                    {contact.email.label}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-dark">
                  <Icon name="mapPin" className="size-3.5 shrink-0" aria-hidden="true" />
                  {contact.location}
                </li>
              </ul>
            </address>
          </div>

          <div className="flex flex-col gap-10">
            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {FOOTER.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="micro-label text-paper/70">{column.title}</h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink {...link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* The rooms the community actually lives in, as marks rather than
                a fifth list of words. Ruled off, because they are places to go
                rather than more pages to read. */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink-line pt-8">
              <h2 className="micro-label text-paper/70">{social.title}</h2>

              <ul className="flex flex-wrap items-center gap-2.5">
                {social.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`grid size-10 place-items-center rounded-full border border-ink-line transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-paper/25 hover:bg-paper/[0.06] ${
                        SOCIAL_COLOUR[link.icon] ?? 'text-muted-dark'
                      }`}
                    >
                      <Icon name={link.icon} className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Five filled stars sat here while the actual score is 4.7.
                  Nobody wrote that as a claim — it was a decoration that
                  happened to state a number — which is exactly how an
                  overstated review score gets onto a page. The real figure and
                  the real count now come from the proof bar's own row. */}
              <a
                href={SITE.trustpilotUrl}
                rel="noopener noreferrer"
                aria-label={FOOTER.reviewsCta}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-xs text-muted-dark transition-colors duration-300 hover:border-paper/40 hover:text-paper"
              >
                <Icon name="star" className="size-3.5 shrink-0 text-signal-gold" />
                <span className="font-semibold text-paper">{REVIEWS.value}</span>
                on Trustpilot
                <span className="text-paper/40">·</span>
                {REVIEWS.detail}
              </a>
            </div>
          </div>
        </div>

        {/* Decorative, and hidden from assistive tech: the name is already
            read out by the logo at the top of this footer, and ten separate
            letters would be announced as ten separate things. */}
        <div
          aria-hidden="true"
          className="mt-16 flex select-none justify-center whitespace-nowrap font-display text-[clamp(2.5rem,15vw,14rem)] font-extrabold leading-[0.86] tracking-[-0.04em]"
        >
          {[...'ECOMSNIPER'].map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="group/letter relative inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:scale-110"
            >
              <span className="block text-transparent [-webkit-text-stroke:1.5px_rgb(251_251_250_/_0.22)]">
                {letter}
              </span>

              <span
                className={`absolute inset-0 block opacity-0 transition-opacity duration-300 group-hover/letter:opacity-100 ${
                  LETTER_COLOUR[index % LETTER_COLOUR.length]
                }`}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        <hr className="relative mt-14 h-px border-0 bg-ink-line" />

        <div className="relative mt-6 flex flex-col gap-5 text-xs leading-relaxed text-muted-dark lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">{FOOTER.disclaimer}</p>
          <p className="shrink-0">© {new Date().getFullYear()} EcomSniper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
