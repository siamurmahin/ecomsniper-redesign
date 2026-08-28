import Seo from '../components/ui/Seo';
import CtaButton from '../components/ui/CtaButton';

/**
 * 404 — kept short, and routed back into the funnel rather than into a dead end.
 * Marked noindex so broken inbound links never dilute the site's own ranking.
 */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found — EcomSniper"
        description="That page does not exist. Head back to the homepage or take the free playbook."
        path="/404"
        noindex
      />

      <section className="grid min-h-[70vh] place-items-center py-32">
        <div className="site-shell text-center">
          <p className="section-eyebrow">Error 404</p>

          <h1 className="mx-auto mt-5 max-w-2xl text-[length:var(--text-display)] leading-[1.02]">
            That page is not here.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
            The link may be old, or the page may have moved. Either way, the two things worth
            reading are below.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href="/" intent="404-home">
              Back to the homepage
            </CtaButton>
            <CtaButton href="/free-playbook" variant="secondary" intent="404-playbook">
              Get the free playbook
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
