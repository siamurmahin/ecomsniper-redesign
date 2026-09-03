import PlaybookPage from '../pages/PlaybookPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) => metaFor('playbook', location.pathname, '/free-play-book');

export default PlaybookPage;
