import AboutLabPage from '../pages/AboutLabPage';

/* Throwaway route. Not prerendered, not linked, not indexed — see the page. */
export const meta = () => [
  { title: 'About hero lab' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default AboutLabPage;
