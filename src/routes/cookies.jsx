import LegalPage from '../pages/LegalPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('cookies', location.pathname, '/cookie-policy');

export default function CookiesRoute() {
  return <LegalPage which="cookies" />;
}
