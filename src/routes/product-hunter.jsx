import ProductHunterPage from '../pages/ProductHunterPage';
import { metaFor } from '../lib/meta';

export const meta = ({ location }) =>
  metaFor('productHunter', location.pathname, '/product-hunter');

export default ProductHunterPage;
