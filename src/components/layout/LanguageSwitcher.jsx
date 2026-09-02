import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * The language control, as the live site draws it: a short code in the header
 * that opens a small menu.
 *
 * A menu rather than a <select>: two items, and a native select on a phone
 * opens a full-screen wheel for a two-line choice.
 *
 * @param {object} props
 * @param {boolean} [props.stacked] Full width in the mobile panel rather than
 *   a pill in the header row.
 */
export default function LanguageSwitcher({ stacked = false }) {
  const { code, current, languages, switchTo } = useLanguage();
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

  return (
    <div ref={wrapRef} className={`relative ${stacked ? '' : 'shrink-0'}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Language: ${current.label}`}
        className={
          stacked
            ? 'flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-ink/5'
            : 'flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-ink/5 hover:text-ink'
        }
      >
        {stacked ? current.label : current.short}
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
          className={
            stacked
              ? 'mt-1 flex flex-col gap-0.5 pb-1'
              : 'absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-hairline bg-paper p-1 shadow-float'
          }
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
                /* Taller in the panel: at py-2.5 the rows came out 40px,
                   under the 44px a thumb needs. */
                className={`flex w-full items-center justify-between rounded-xl text-left transition-colors duration-200 hover:bg-ink/5 ${
                  stacked ? 'px-4 py-3.5 text-base' : 'px-3 py-2.5 text-sm'
                } ${
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
