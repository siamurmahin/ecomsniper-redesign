import SitemapPage from '../pages/SitemapPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('sitemap', location.pathname, '/sitemap');

export default SitemapPage;
