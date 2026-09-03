import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useContent } from '../hooks/useContent';
import { languageFromPath, pathForLanguage } from '../lib/language';
import { LEGAL_ROUTES } from '../config/site';
import { CATEGORIES } from '../config/consent';
import { applyConsent } from '../third-party';
import { acceptAll, decide, readDecision, rejectAll, subscribe } from './store';

/**
 * The cookie banner, and the panel behind "Customise".
 *
 * Rendered by `SiteChrome`, which is lazy — so none of this is in the bundle
 * the first screen waits for. The tags it governs cannot load before it
 * mounts either way: `gtag('consent', 'default', ...)` has already denied
 * everything from the inline block in `root.jsx`.
 *
 * Nothing renders until the component knows whether a decision exists, and it
 * cannot know that during prerender — `localStorage` and `document.cookie`
 * are browser-only. So the first client render shows nothing and the effect
 * decides. That also keeps the banner out of the prerendered HTML, which is
 * what stops a crawler indexing "Accept all" as page content.
 */
export default function ConsentBanner() {
  const { CONSENT } = useContent();
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);

  const [asking, setAsking] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [checked, setChecked] = useState(() => new Set());

  /* Ask only when there is no decision to honour — `readDecision` already
     treats expired and superseded ones as absent. */
  useEffect(() => {
    const decision = readDecision();

    if (decision) {
      /* A decision made on a previous visit still has to be acted on: the
         page it was made on is long gone. */
      applyConsent(decision.granted);
      return;
    }

    setAsking(true);
  }, []);

  /* The footer's "Cookie choices" link resets the decision, which announces
     null — that is the signal to ask again. */
  useEffect(
    () =>
      subscribe((decision) => {
        if (decision) return;
        setChecked(new Set());
        setCustomising(false);
        setAsking(true);
      }),
    [],
  );

  const settle = useCallback((granted) => {
    applyConsent(granted);
    setAsking(false);
    setCustomising(false);
  }, []);

  const onAcceptAll = () => settle(acceptAll().granted);
  const onRejectAll = () => settle(rejectAll().granted);
  const onSave = () => settle(decide([...checked]).granted);

  const toggle = (id) =>
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!asking) return null;

  const policyHref = pathForLanguage(LEGAL_ROUTES.cookies, language);

  return (
    <div
      role="region"
      aria-label={CONSENT.banner.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-hairline bg-paper px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        {customising ? (
          <div>
            <h2 className="text-base font-semibold text-ink">{CONSENT.panel.title}</h2>
            <p className="mt-1 text-sm text-muted">{CONSENT.panel.body}</p>

            <ul className="mt-4 space-y-3">
              {CATEGORIES.map(({ id, locked }) => {
                const copy = CONSENT.categories[id];
                if (!copy) return null;

                return (
                  <li key={id} className="flex gap-3">
                    <input
                      type="checkbox"
                      id={`consent-${id}`}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand-violet)]"
                      checked={locked || checked.has(id)}
                      disabled={locked}
                      onChange={() => toggle(id)}
                    />
                    <label htmlFor={`consent-${id}`} className="text-sm">
                      <span className="font-semibold text-ink">{copy.label}</span>
                      {locked ? (
                        <span className="ml-2 text-xs uppercase tracking-wide text-muted">
                          {CONSENT.panel.alwaysOn}
                        </span>
                      ) : null}
                      <span className="mt-0.5 block text-muted">{copy.body}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={onSave}>
                {CONSENT.panel.save}
              </button>
              <button type="button" className="btn-secondary" onClick={onAcceptAll}>
                {CONSENT.panel.acceptAll}
              </button>
              <button
                type="button"
                className="btn-ghost-on-ink text-ink"
                onClick={() => setCustomising(false)}
              >
                {CONSENT.panel.back}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-muted">
              {CONSENT.banner.body}{' '}
              <Link to={policyHref} className="text-ink underline underline-offset-2">
                {CONSENT.banner.policyLabel}
              </Link>
            </p>

            {/* Reject is the same variant as accept on purpose: a quieter
                reject button is a dark pattern, and under the TTDSG it is
                also not valid consent. */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={onRejectAll}>
                {CONSENT.banner.rejectAll}
              </button>
              <button
                type="button"
                className="btn-ghost-on-ink text-ink"
                /* Opens with everything off. Pre-ticking a box is consent the
                   visitor did not give, which is the one thing every
                   regulator agrees on. */
                onClick={() => setCustomising(true)}
              >
                {CONSENT.banner.customise}
              </button>
              <button type="button" className="btn-primary" onClick={onAcceptAll}>
                {CONSENT.banner.acceptAll}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
