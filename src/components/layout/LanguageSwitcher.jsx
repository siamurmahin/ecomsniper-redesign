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
    <div ref={wrapRef} className={`relative ${stacked ? 'inline-block' : 'shrink-0'}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Language: ${current.label}`}
        /* Bordered, with the globe: as bare text beside "Log in" it read as
           another link and nobody found it. The box is what says "control". */
        /* Sized to its own words in both places. Full width in the panel made
           a two-item setting look like the most important thing on it. */
        className={
          stacked
            ? 'flex items-center gap-2 rounded-full border border-hairline px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5'
            : 'flex items-center gap-1.5 rounded-full border border-hairline px-3 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-ink/5'
        }
      >
        <Icon
          name="globe"
          className={`shrink-0 text-muted ${stacked ? 'size-4' : 'size-3.5'}`}
          aria-hidden="true"
        />
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
          /* In flow when stacked, not absolute: the panel is overflow-hidden,
             so a floating menu would be cut off at its rounded edge. */
          className={
            stacked
              ? 'mt-2 w-44 overflow-hidden rounded-2xl border border-hairline bg-paper p-1'
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
                className={`flex w-full items-center justify-between rounded-xl text-left text-sm transition-colors duration-200 hover:bg-ink/5 ${
                  stacked ? 'px-3 py-3' : 'px-3 py-2.5'
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
