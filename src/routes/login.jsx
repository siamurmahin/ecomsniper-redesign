import LoginPage from '../pages/LoginPage';
import { noindexMetaFor } from '../lib/meta';

/**
 * Noindex, like the registration page beside it. A sign-in form has nothing
 * for a search engine to rank, their own sitemap omits both, and this one is
 * explicitly a design with no server behind it — the last thing it should do
 * is appear in results as a way to log in.
 */
export const meta = ({ location }) => noindexMetaFor('login', location.pathname);

export default LoginPage;
