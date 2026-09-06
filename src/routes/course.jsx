import CoursePage from '../pages/CoursePage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) =>
  metaFor('course', location.pathname, '/course/dropship-mastery');

export default CoursePage;
