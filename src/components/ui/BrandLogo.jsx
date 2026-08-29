import logoInk from '../../assets/brand/logo-wordmark-ink.png';
import logoPaper from '../../assets/brand/logo-wordmark-paper.png';
import logoReticle from '../../assets/brand/logo-reticle.png';

/**
 * The official wordmark. Two artworks rather than one recoloured file:
 * "Sniper" flips black to white by background, while the reticle and "eCom"
 * keep their brand colours in both.
 *
 * @param {object} props
 * @param {'ink'|'paper'} [props.tone] Which background the mark sits on.
 * @param {boolean} [props.reticleOnly] Render just the target, no wordmark.
 */
export default function BrandLogo({ tone = 'ink', reticleOnly = false, className = '' }) {
  if (reticleOnly) {
    return (
      <img
        src={logoReticle}
        alt="EcomSniper"
        width={32}
        height={32}
        className={`size-8 ${className}`.trim()}
      />
    );
  }

  return (
    <img
      src={tone === 'paper' ? logoPaper : logoInk}
      alt="EcomSniper"
      // Intrinsic size is 1501×336; width/height keep the box reserved so the
      // header does not shift when the image decodes.
      width={1501}
      height={336}
      // The reticle is the full height of the artwork and the lettering only
      // 46% of it, so the box has to be taller than a text logo would be for
      // the same reading size — 44px is where the cart that forms the "e"
      // still keeps its handle.
      //
      // The mark is 4.5:1, so height is really a width decision: at 44px it is
      // 197px, which is most of a phone's header once the sign-up button and
      // the menu toggle have taken their share. Rather than step it down at a
      // breakpoint and drop the name entirely on the narrowest phones, it
      // tracks the viewport and stops at both ends — never above the 44px it
      // is drawn for, never below the 24px where the lettering stops being
      // readable at all.
      // max-w-full with object-contain is the last resort under the clamp: on a
      // 320px phone the row is still a few pixels over, and a logo that gives
      // them up is better than a sign-up button clipped by the pill edge. The
      // aspect holds either way, so this only ever reads as slightly smaller.
      className={`h-[clamp(1.5rem,7.5vw,2.75rem)] w-auto max-w-full object-contain object-left ${className}`.trim()}
    />
  );
}
