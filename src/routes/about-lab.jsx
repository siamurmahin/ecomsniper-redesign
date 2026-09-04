import AboutHeroLab from '../pages/AboutHeroLab';
import { noindexMetaFor } from '../lib/meta';

/**
 * Scratch route for choosing the About hero. Deliberately absent from
 * `react-router.config.js`, so it is never prerendered and emits no document,
 * and absent from the sitemap and every link on the site. Deleted with the
 * losing variants once the choice is made.
 */
export const meta = ({ location }) => noindexMetaFor('notFound', location.pathname);

export default AboutHeroLab;
