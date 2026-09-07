import RegisterPage from '../pages/RegisterPage';
import { noindexMetaFor } from '../lib/meta';

/** Noindex — see `login.jsx`. */
export const meta = ({ location }) => noindexMetaFor('register', location.pathname);

export default RegisterPage;
