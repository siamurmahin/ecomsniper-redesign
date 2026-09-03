import { ABOUT as EN_ABOUT } from '../content/en/about';
import { overlay as germanAbout } from '../content/de/about';
import { usePageContent } from '../hooks/usePageContent';
import AboutHero from '../components/about/AboutHero';

/**
 * Throwaway. Three About heroes on one page so one can be picked.
 *
 * Deliberately not prerendered and not linked from anywhere — it exists to be
 * looked at on localhost and then deleted, along with the two losing branches
 * in `AboutHero` and whichever content keys they used. This is how the
 * homepage sections were decided; see `docs/SESSION-NOTES-01-SEP.md`.
 *
 * Option A is the one currently live on `/about`.
 */
const OVERLAYS = { de: germanAbout.ABOUT };

const OPTIONS = [
  {
    key: 'cost',
    name: 'A — The cost, as hours',
    note: 'Live now. The figure becomes the thesis: $200 is a number of hours, and we do not know how many it was for you. Their words, in a receipt.',
  },
  {
    key: 'portrait',
    name: 'B — Photograph',
    note: 'Layout only. Needs a real photo from the client; the dashed box is a placeholder and is not a design element.',
  },
  {
    key: 'centred',
    name: 'C — Text only, centred',
    note: 'No right column, so the empty half reads as intent. Cheapest and most restrained, least distinctive.',
  },
];

export default function AboutLabPage() {
  const about = usePageContent(EN_ABOUT, OVERLAYS);

  return (
    <>
      <section className="section-band">
        <div className="site-shell">
          <p className="section-eyebrow">Lab — delete me</p>
          <h1 className="mt-4 text-[length:var(--text-section)]">About hero, three options</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Pick one. The other two branches, this route and the unused content keys get deleted
            with the decision.
          </p>
        </div>
      </section>

      {OPTIONS.map((option) => (
        <section key={option.key} className="border-t border-hairline py-14">
          <div className="site-shell">
            <p className="micro-label text-muted">{option.name}</p>
            <p className="mt-2 max-w-2xl text-sm text-muted">{option.note}</p>
          </div>

          <div className="site-shell mt-10">
            <AboutHero about={about} variant={option.key} />
          </div>
        </section>
      ))}
    </>
  );
}
