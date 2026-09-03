import FaqSection from '../sections/FaqSection';
import AssuranceSection from '../sections/AssuranceSection';
import { useContent } from '../hooks/useContent';

/**
 * /faq — the same thirteen questions the homepage answers, never a second set
 * of answers. Reusing the section is what stops the two from drifting: a
 * refund term corrected here has to be the one correcting the homepage too.
 *
 * It exists because "FAQ" in the nav was a link into the middle of a 17,000px
 * page. That is a fine way to reach the questions while reading the page and a
 * poor one for someone who arrived looking for them — and it is the one nav
 * item people arrive already looking for.
 *
 * The guarantee follows the questions here as it does on the homepage: the
 * last thing somebody reads after "can I get a refund" should be the answer,
 * with the door beside it.
 */
export default function FaqPage() {
  const { FAQ, SEO } = useContent();
  return (
    <>
      {/* The page needs its own h1; the section carries an h2. */}
      <div className="site-shell pb-4 pt-36 sm:pt-44">
        <p className="section-eyebrow">{FAQ.eyebrow}</p>

        <h1 className="mt-5 max-w-3xl text-[length:var(--text-hero)] leading-[0.95]">
          {FAQ.headline}
        </h1>

        <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
          {FAQ.lead}
        </p>
      </div>

      {/* The section states the same headline, which would be the second time
          on this page, so it renders without it. */}
      <FaqSection showHeading={false} />

      <AssuranceSection />
    </>
  );
}
