import { Link } from 'react-router-dom';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  brandOutline: 'btn-brand-outline',
  onInk: 'btn-on-ink',
  ghost: 'btn-ghost-on-ink',
};

/**
 * One button component for every call to action on the site.
 *
 * Picks the right element automatically: internal paths become router <Link>s,
 * in-page hashes and external URLs stay as anchors so they behave natively.
 * `intent` is forwarded to analytics as a data attribute so funnel steps can be
 * measured without hunting for selectors later.
 */
export default function CtaButton({
  href,
  children,
  variant = 'primary',
  intent,
  className = '',
  ...rest
}) {
  const classes = `${VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary} ${className}`.trim();
  const isExternal = /^https?:\/\//.test(href);
  const isHash = href?.startsWith('#') || href?.startsWith('/#');

  if (isExternal || isHash) {
    return (
      <a
        href={href}
        className={classes}
        data-cta-intent={intent}
        {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classes} data-cta-intent={intent} {...rest}>
      {children}
    </Link>
  );
}
