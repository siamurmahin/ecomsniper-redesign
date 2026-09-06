import JobPage from '../pages/JobPage';
import { CAREERS } from '../content/en/careers';
import { metaForContent, noindexMetaFor } from '../lib/meta';

/**
 * One job advert.
 *
 * The title and description come from the role itself rather than from a key
 * in the SEO deck, because a deck entry per role is a second list to keep in
 * step with the first — and the one that goes stale is always the one nobody
 * looks at.
 *
 * A slug that is not in the deck is a URL that never existed, or a role that
 * has been filled. Either way the page renders as not-found, and the meta says
 * `noindex` so a filled role does not sit in an index advertising itself.
 */
export const meta = ({ location, params }) => {
  const role = CAREERS.openRoles.roles.find((entry) => entry.slug === params.slug);
  if (!role) return noindexMetaFor('notFound', location.pathname);

  const facts = [role.type, role.location].filter(Boolean).join(', ');

  return metaForContent(
    {
      title: `${role.title} — Careers at EcomSniper`,
      description:
        role.summary ??
        `${role.title} at EcomSniper${facts ? ` — ${facts}` : ''}. A person reads every application.`,
    },
    location.pathname,
    `/careers/${role.slug}`,
  );
};

export default JobPage;
