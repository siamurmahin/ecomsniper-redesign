import Seo from '../components/ui/Seo';
import CtaButton from '../components/ui/CtaButton';
import { useContent } from '../hooks/useContent';

/**
 * 404 — kept short, and routed back into the funnel rather than into a dead end.
 * Marked noindex so broken inbound links never dilute the site's own ranking.
 */
export default function NotFoundPage() {
  const { SEO, NOT_FOUND } = useContent();
  return (
    <>
      <Seo title={SEO.notFound.title} description={SEO.notFound.description} path="/404" noindex />

      <section className="grid min-h-[70vh] place-items-center py-32">
        <div className="site-shell text-center">
          <p className="section-eyebrow">{NOT_FOUND.eyebrow}</p>

          <h1 className="mx-auto mt-5 max-w-2xl text-[length:var(--text-display)] leading-[1.02]">
            {NOT_FOUND.headline}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
            {NOT_FOUND.body}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href="/" intent="404-home">
              {NOT_FOUND.homeCta}
            </CtaButton>
            <CtaButton href="/free-play-book" variant="secondary" intent="404-playbook">
              {NOT_FOUND.playbookCta}
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
