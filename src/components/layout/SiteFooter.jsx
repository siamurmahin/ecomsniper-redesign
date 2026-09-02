import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import CtaButton from '../ui/CtaButton';
import Icon from '../ui/Icon';
import { FOOTER, PROOF_BAR, SITE } from '../../data/siteContent';

/**
 * The oversized wordmark that signs the page off. Outlined until a pointer
 * comes near, then each letter fills with its own colour and rises — the one
 * under the pointer most, its neighbours less, so the row bends.
 *
 * Written straight to the DOM on pointermove: ten restyles a frame is nothing,
 * ten React renders a frame is a dropped frame.
 */
const LETTER_COLOUR = [
  'text-signal-blue',
  'text-signal-red',
  'text-signal-green',
  'text-signal-gold',
];

/** How far the effect reaches, as a multiple of one letter's width. */
const REACH = 2.2;

function Wordmark() {
  const rowRef = useRef(null);

  const paint = (pointerX) => {
    const row = rowRef.current;
    if (!row) return;

    for (const letter of row.children) {
      const box = letter.getBoundingClientRect();
      const distance = Math.abs(pointerX - (box.left + box.width / 2));
      // 1 under the pointer, 0 once it is REACH letters away.
      const near = pointerX === null ? 0 : Math.max(0, 1 - distance / (box.width * REACH));
      // Eased, so the falloff is a curve rather than a cone.
      const strength = near * near;

      letter.style.transform = `translateY(${(-14 * strength).toFixed(2)}px) scale(${(
        1 +
        0.22 * strength
      ).toFixed(3)})`;
      /* The colour goes to full well before the movement does. Fading the
         fill in proportion to the lift left the neighbours a washed-out
         version of their own colour, which reads as a rendering artefact
         rather than as a choice; only the outermost letter in reach is still
         coming up. */
      letter.style.setProperty('--fill', Math.min(1, strength * 3).toFixed(3));
    }
  };

  return (
    <div
      aria-hidden="true"
      ref={rowRef}
      onPointerMove={(event) => paint(event.clientX)}
      onPointerLeave={() => paint(null)}
      className="mt-16 flex select-none justify-center whitespace-nowrap font-display text-[clamp(2.25rem,12.5vw,11.5rem)] font-extrabold leading-[0.86] tracking-[-0.04em]"
    >
      {[...'ECOMSNIPER'].map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="relative inline-block origin-bottom transition-transform duration-300 ease-out motion-reduce:!transform-none"
        >
          <span className="block text-transparent [-webkit-text-stroke:1.5px_rgb(251_251_250_/_0.22)]">
            {letter}
          </span>

          <span
            className={`absolute inset-0 block opacity-[var(--fill,0)] transition-opacity duration-200 ${
              LETTER_COLOUR[index % LETTER_COLOUR.length]
            }`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Each platform's own brand colour. Literal classes, not built from a name —
 * Tailwind only compiles what it can see.
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
 * Site footer. It closes the page and carries the legal copy, and it is where
 * someone checks whether these people are real — hence the contact block.
 *
 * It is the last thing on the page now section 15 is gone, so it opens with
 * the offer that costs nothing.
 */
export default function SiteFooter() {
  const { contact, social, secondDoor } = FOOTER;
  const { pathname } = useLocation();

  /* The free door is hidden on the page it opens. Offering somebody the
     playbook while they are looking at the form for it reads as the site not
     knowing where they are, and on a phone it put two identical calls to
     action within a screen of each other. */
  const showSecondDoor = pathname !== secondDoor.cta.href;

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
        {showSecondDoor && (
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
        )}

        <div className={`grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16 ${
          showSecondDoor ? 'mt-14' : ''
        }`}>
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

              {/* Five filled stars sat here while the real score is 4.7 —
                  a decoration that happened to state a number. Both figures
                  now come from the proof bar's own row. */}
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
        <Wordmark />

        <hr className="relative mt-14 h-px border-0 bg-ink-line" />

        <div className="relative mt-6 flex flex-col gap-5 text-xs leading-relaxed text-muted-dark lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">{FOOTER.disclaimer}</p>
          <p className="shrink-0">© {new Date().getFullYear()} EcomSniper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
