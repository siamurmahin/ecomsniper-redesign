import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import { FOOTER, SITE } from '../../data/siteContent';

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
 * Site footer. Dark band that closes the page and carries the legal copy the
 * claims elsewhere on the site depend on.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-ink pb-10 pt-16 text-paper sm:pt-20">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" aria-label="EcomSniper home" className="text-paper">
              <BrandLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-dark">{FOOTER.tagline}</p>

            <a
              href={SITE.trustpilotUrl}
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-xs font-medium text-muted-dark transition-colors hover:border-paper/40 hover:text-paper"
            >
              <span className="text-ebay-green" aria-hidden="true">
                ★★★★★
              </span>
              Read the reviews on Trustpilot
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER.columns.map((column) => (
              <div key={column.title}>
                <h2 className="micro-label text-paper/70">
                  {column.title}
                </h2>
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
