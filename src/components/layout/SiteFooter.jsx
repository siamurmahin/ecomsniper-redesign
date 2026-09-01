import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import Icon from '../ui/Icon';
import { FOOTER, SITE } from '../../data/siteContent';

/** Renders an internal path as a router link and anything else as an anchor. */
function FooterLink({ href, label }) {
  const isRouted = href.startsWith('/') && !href.startsWith('/#');

  const className = 'text-sm text-muted-dark transition-colors duration-200 hover:text-paper';

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
 * real". It could not answer that: there was no phone number, no email, no
 * address and no way to reach the community, and eight of its links pointed
 * at routes this app does not have.
 *
 * The three the site does own — the brand, the contact block and the reviews —
 * now hold the left column, and the four link columns sit beside them.
 */
export default function SiteFooter() {
  const { contact, social } = FOOTER;

  return (
    <footer className="bg-ink pb-10 pt-16 text-paper sm:pt-20">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <Link to="/" aria-label="EcomSniper home" className="inline-block text-paper">
              <BrandLogo />
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
                a fourth list of words. Ruled off, because they are places to
                go rather than more pages to read. */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink-line pt-8">
              <h2 className="micro-label text-paper/70">{social.title}</h2>

              <ul className="flex flex-wrap items-center gap-2.5">
                {social.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="grid size-10 place-items-center rounded-full border border-ink-line text-muted-dark transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-paper/40 hover:text-paper"
                    >
                      <Icon name={link.icon} className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={SITE.trustpilotUrl}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-xs font-medium text-muted-dark transition-colors duration-300 hover:border-paper/40 hover:text-paper"
              >
                <span className="text-ebay-green" aria-hidden="true">
                  ★★★★★
                </span>
                {FOOTER.reviewsCta}
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-14 h-px border-0 bg-ink-line" />

        <div className="mt-6 flex flex-col gap-5 text-xs leading-relaxed text-muted-dark lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl">{FOOTER.disclaimer}</p>
          <p className="shrink-0">© {new Date().getFullYear()} EcomSniper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
