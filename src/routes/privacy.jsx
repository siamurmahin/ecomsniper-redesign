import LegalPage from '../pages/LegalPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('privacy', location.pathname, '/privacy-policy');

export default function PrivacyRoute() {
  return <LegalPage which="privacy" />;
}
