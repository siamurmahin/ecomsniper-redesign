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
      // the same reading size. Below 44px the cart that forms the "e" loses
      // its handle and the wordmark starts reading as "7eComSniper".
      className={`h-11 w-auto ${className}`.trim()}
    />
  );
}
