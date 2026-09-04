import ContactPage from '../pages/ContactPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('contact', location.pathname, '/contact');

export default ContactPage;
