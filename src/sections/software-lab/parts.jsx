import Icon from '../../components/ui/Icon';
import { toneOf } from '../../lib/signalTones';

/**
 * Shared pieces for the four section-07 variants.
 *
 * One copy rather than four: the options are being compared on SHAPE, and if
 * each drew its own step card the comparison would quietly become one about
 * card design. Everything here is deliberately neutral.
 *
 * Deleted with the lab once a direction is picked.
 */

/**
 * The named tools, as the live site draws them: dashed pills in the accent,
 * uppercase and tracked.
 *
 * They leave for the live site — see the note on `FEATURES.items` — so they
 * open in a new tab and carry `rel`. If the feature pages are ever rebuilt
 * here, this is the only place the target has to change.
 */
export function ToolPills({ links, className = '' }) {
  if (!links?.length) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/pill inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/60 px-3 py-1.5 font-label text-[0.62rem] font-semibold uppercase tracking-[0.09em] text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper"
          >
            {link.label}
            <Icon
              name="arrowRight"
              className="size-3 transition-transform duration-300 group-hover/pill:translate-x-0.5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The number, as a tone tile. Same glyph vocabulary as every other set. */
export function StepNumber({ item, size = 'md' }) {
  const tone = toneOf(item.tone);
  const box = size === 'lg' ? 'size-12 text-base' : 'size-10 text-sm';

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl font-display font-extrabold ${box} ${tone.tile}`}
    >
      {item.n}
    </span>
  );
}

/** The metric line under a step's copy. */
export function StepMetric({ item }) {
  const tone = toneOf(item.tone);

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.dot}`} />
      <span className={`micro-label ${tone.text}`}>{item.metric}</span>
    </span>
  );
}

/**
 * One step's words. Every variant renders exactly this, so the four differ
 * only in how they arrange and animate them.
 */
export function StepBody({ item, titleClass = 'text-xl sm:text-2xl' }) {
  return (
    <>
      <h3 className={`font-display font-extrabold leading-tight tracking-tight ${titleClass}`}>
        {item.title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
      <div className="mt-5">
        <StepMetric item={item} />
      </div>
      <ToolPills links={item.links} className="mt-5" />
    </>
  );
}
