import { Link, useLocation } from 'react-router';
import { useContent } from '../hooks/useContent';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { LEGAL_ROUTES } from '../config/site';
import { CATEGORIES } from '../config/consent';
import { declaredCookies } from '../config/vendors';
import { reset } from '../consent/store';

/**
 * One component for both legal pages.
 *
 * They are the same document with different words — a heading, a date, and a
 * list of sections that are prose, a list, or both. Two components would be
 * two places to fix a typo in the type scale.
 *
 * The cookie page adds one thing the privacy page does not: a table built
 * from `config/vendors.js` rather than from the copy deck. A policy listing
 * cookies by hand is a policy that describes whatever was true when someone
 * last remembered to edit it.
 *
 * @param {'privacy' | 'cookies'} which Which of the two documents to render.
 */
export default function LegalPage({ which }) {
  const { LEGAL, CONSENT } = useContent();
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const doc = LEGAL[which];
  const cookies = which === 'cookies' ? declaredCookies() : [];

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">{doc.updated}</p>

      {doc.intro?.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}

      {/* The cookie page explains the categories before listing the cookies,
          and takes those words from the banner's own deck — the panel and the
          policy must describe the same three things in the same terms. */}
      {which === 'cookies' ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{doc.categoriesHeading}</h2>
          <dl className="mt-4 space-y-4">
            {CATEGORIES.map(({ id }) => {
              const copy = CONSENT.categories[id];
              if (!copy) return null;

              return (
                <div key={id}>
                  <dt className="text-base font-semibold text-ink">{copy.label}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-muted">{copy.body}</dd>
                </div>
              );
            })}
          </dl>

          <h2 className="mt-10 text-xl font-semibold text-ink">{doc.tableHeading}</h2>

          {cookies.length ? (
            /* Wide content scrolls inside its own box rather than making the
               page scroll sideways on a phone. */
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-2 pr-4 font-semibold text-ink">{doc.columns.name}</th>
                    <th className="py-2 pr-4 font-semibold text-ink">{doc.columns.vendor}</th>
                    <th className="py-2 pr-4 font-semibold text-ink">{doc.columns.purpose}</th>
                    <th className="py-2 font-semibold text-ink">{doc.columns.retention}</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((cookie) => (
                    <tr
                      key={`${cookie.vendor}-${cookie.name}`}
                      className="border-b border-hairline"
                    >
                      <td className="py-2 pr-4 font-mono text-xs text-ink">{cookie.name}</td>
                      <td className="py-2 pr-4 text-muted">{cookie.vendor}</td>
                      <td className="py-2 pr-4 text-muted">
                        {CONSENT.categories[cookie.purpose]?.label ?? cookie.purpose}
                      </td>
                      <td className="py-2 text-muted">{cookie.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-base leading-relaxed text-muted">{doc.emptyTable}</p>
          )}

          {/* Withdrawing consent has to be as easy as giving it, so the way
              back to the banner is on the page the footer's cookie link
              already points at. It lives here rather than in the footer
              because the footer is inside a lazy boundary that does not
              hydrate on a cold load — see docs/TODO.md. Route content does. */}
          <button
            type="button"
            onClick={reset}
            className="btn-secondary mt-8"
            data-testid="reopen-consent"
          >
            {CONSENT.reopen}
          </button>

          <p className="mt-8 text-base leading-relaxed text-muted">{doc.contact}</p>
        </section>
      ) : null}

      {doc.sections?.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>

          {section.body?.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          {section.list ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {/* Each policy points at the other. Someone who lands on one from a
          search result should not have to go via the footer. */}
      <p className="mt-12 border-t border-hairline pt-6 text-sm">
        <Link
          to={pathForLanguage(
            which === 'cookies' ? LEGAL_ROUTES.privacy : LEGAL_ROUTES.cookies,
            language,
          )}
          className="text-ink underline underline-offset-2"
        >
          {which === 'cookies' ? LEGAL.privacy.title : LEGAL.cookies.title}
        </Link>
      </p>
    </article>
  );
}
