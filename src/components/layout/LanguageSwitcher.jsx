import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { useLanguage } from '../../hooks/useLanguage';
import { useContent } from '../../hooks/useContent';

/**
 * The language control, as the live site draws it: a short code in the header
 * that opens a small menu.
 *
 * A menu rather than a <select>: two items, and a native select on a phone
 * opens a full-screen wheel for a two-line choice.
 *
 * @param {object} props
 * @param {boolean} [props.stacked] Both languages side by side for the mobile
 *   panel, rather than the header's pill and menu.
 */
export default function LanguageSwitcher({ stacked = false }) {
  const { code, current, languages, switchTo } = useLanguage();
  const { A11Y } = useContent();
  const label = `${A11Y.language}: ${current.label}`;
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on Escape or a click anywhere else, like any other menu.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event) => event.key === 'Escape' && setIsOpen(false);
    const onClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) setIsOpen(false);
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  /*
   * In the panel there is room to show both languages at once, so nothing is
   * hidden behind a second tap. A menu inside an already-open menu was the
   * wrong shape here: full width it dominated the panel, and narrow it looked
   * like an afterthought. Two segments say what the choice is and which one
   * you are on, and switching costs one tap.
   */
  if (stacked) {
    return (
      <div className="flex items-center gap-2 px-2 py-1">
        <Icon name="globe" className="size-4 shrink-0 text-muted" aria-hidden="true" />
        <div
          role="group"
          aria-label={label}
          className="flex flex-1 gap-1 rounded-full border border-hairline p-1"
        >
          {languages.map((item) => {
            const isCurrent = item.code === code;

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => switchTo(item.code)}
                aria-current={isCurrent ? 'true' : undefined}
                /* py-3: 20px of line box plus 12px each side is the 44px a
                   thumb needs. py-2.5 measured 40px. */
                className={`flex-1 rounded-full px-3 py-3 text-sm font-semibold transition-colors duration-200 ${
                  isCurrent ? 'bg-ink text-paper' : 'text-muted hover:bg-ink/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
        /* Bordered, with the globe: as bare text beside "Log in" it read as
           another link and nobody found it. The box is what says "control". */
        className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-ink/5"
      >
        <Icon name="globe" className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
        {current.short}
        <Icon
          name="chevronDown"
          className={`size-3 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-hairline bg-paper p-1 shadow-float"
        >
          {languages.map((language) => (
            <li key={language.code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={language.code === code}
                onClick={() => {
                  switchTo(language.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 hover:bg-ink/5 ${
                  language.code === code ? 'font-semibold' : 'text-muted'
                }`}
              >
                {language.label}
                {language.code === code && (
                  <Icon name="check" className="size-3 shrink-0" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
