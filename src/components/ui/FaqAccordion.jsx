import { useRef, useState, useId } from 'react';

/**
 * Accessible single-open accordion used for the homepage FAQ.
 *
 * Built on real buttons with aria-expanded / aria-controls rather than
 * <details>, so the open/close height can be animated and so only one answer
 * is open at a time. Heights are measured from the panel's scrollHeight, which
 * keeps the transition correct when text reflows on resize.
 */
/**
 * @param {object} props
 * @param {Array} props.items Question and answer pairs.
 * @param {number} [props.defaultOpen] Index open on mount; -1 for none. Several
 *   accordions on one page would otherwise each open their own first answer.
 * @param {boolean} [props.reveal] Set false where the list is re-rendered after
 *   mount — a filtered view, say. The scroll reveal only animates nodes that
 *   existed when its trigger was built, so later ones would stay hidden.
 */
export default function FaqAccordion({ items, defaultOpen = 0, reveal = true }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const panelRefs = useRef([]);
  const baseId = useId();

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  // Roving arrow-key navigation between question buttons.
  const onKeyDown = (event, index) => {
    const lastIndex = items.length - 1;
    const focusAt = (i) => {
      const next = document.getElementById(`${baseId}-q-${i}`);
      next?.focus();
      event.preventDefault();
    };
    if (event.key === 'ArrowDown') focusAt(index === lastIndex ? 0 : index + 1);
    if (event.key === 'ArrowUp') focusAt(index === 0 ? lastIndex : index - 1);
    if (event.key === 'Home') focusAt(0);
    if (event.key === 'End') focusAt(lastIndex);
  };

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const questionId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={item.q} {...(reveal ? { 'data-reveal': '', 'data-reveal-group': 'faq' } : {})}>
            <h3>
              <button
                id={questionId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-ink/65"
              >
                <span className="text-base font-semibold leading-snug sm:text-lg">{item.q}</span>

                {/* Plus that rotates into a minus — cheap, and reads instantly. */}
                <span
                  aria-hidden="true"
                  className="relative mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-hairline transition-colors duration-300 group-hover:border-ink/40"
                >
                  <span className="absolute h-px w-2.5 bg-current" />
                  <span
                    className={`absolute h-px w-2.5 bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] ${
                      isOpen ? 'rotate-0' : 'rotate-90'
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={questionId}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              style={{
                maxHeight: isOpen ? `${panelRefs.current[index]?.scrollHeight ?? 600}px` : '0px',
              }}
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-out-expo)]"
              // Hidden answers stay in the DOM for crawlers, but out of the tab order.
              {...(isOpen ? {} : { 'aria-hidden': 'true' })}
            >
              <p
                className={`max-w-2xl pb-7 pr-10 text-[0.95rem] leading-relaxed text-muted transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
