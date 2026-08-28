import { useState } from 'react';
import { PROOF_BAR } from '../data/siteContent';
import CountUp from '../components/reactbits/CountUp';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { prefersReducedMotion } from '../lib/motion';

/**
 * 02 — Proof bar.
 *
 * Its whole value is that every number here is checkable: the Trustpilot score
 * links to the live profile, and the member count is the same figure used
 * everywhere else on the site. Invented or inconsistent numbers read as
 * advertising; consistent ones read as evidence.
 *
 * The two real quantities count up on first view (React Bits `CountUp`). The
 * figure they land on is the one in the copy deck, and it is what renders with
 * no JS or under reduced motion — the animation draws the eye to the number,
 * it never invents one.
 */
/**
 * A figure that counts up and then states the exact number.
 *
 * `CountUp` drives the value with a spring, and a spring approaches its target
 * asymptotically — it was still reading "4.5" and "392+" a full second after
 * the animation was supposed to have finished. On a bar whose entire claim is
 * that these numbers are checkable, landing near the number is landing wrong.
 *
 * So the animation runs, and the moment it reports it is done the component is
 * swapped for the literal string from the copy deck. That also unmounts the
 * spring, so nothing can write over the settled figure afterwards.
 */
function ProofFigure({ item }) {
  const [settled, setSettled] = useState(false);

  if (settled) return item.value;

  return (
    <>
      <CountUp to={item.countTo} duration={1.6} onEnd={() => setSettled(true)} />
      {item.suffix}
    </>
  );
}

export default function ProofBarSection() {
  const sectionRef = useRevealOnScroll({ start: 'top 92%' });
  // Read once at mount: a number ticking upward is motion like any other.
  const staticNumbers = prefersReducedMotion();

  return (
    <section ref={sectionRef} aria-label="Proof and trust signals" className="relative pb-6">
      <div className="site-shell">
        <div className="rounded-3xl border border-hairline bg-white/60 px-6 py-7 backdrop-blur-sm sm:px-8">
          <p
            className="text-center text-sm text-muted"
            data-reveal
            data-reveal-group="proof-bar"
          >
            {PROOF_BAR.intro}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-6 lg:grid-cols-4">
            {PROOF_BAR.items.map((item) => {
              const Wrapper = item.href ? 'a' : 'div';

              return (
                <div
                  key={item.label}
                  data-reveal
                  data-reveal-group="proof-bar"
                  className="text-center"
                >
                  <Wrapper
                    {...(item.href
                      ? { href: item.href, rel: 'noopener noreferrer', className: 'group block' }
                      : { className: 'block' })}
                  >
                    <dd className="font-display text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                      {item.countTo && !staticNumbers ? (
                        <ProofFigure item={item} />
                      ) : (
                        item.value
                      )}
                      {item.href && (
                        <span
                          aria-hidden="true"
                          className="ml-1 inline-block text-base text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      )}
                    </dd>
                    <dt className="mt-1.5 text-sm font-semibold">{item.label}</dt>
                    <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
                  </Wrapper>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
