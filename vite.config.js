import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    /* Replaces @vitejs/plugin-react: the router's plugin owns the React
       transform as well as the routing, and running both would apply it
       twice. It is also what writes the prerendered HTML — see
       `react-router.config.js`. */
    reactRouter(),
    tailwindcss(),
    // `import Icon from './x.svg?react'` inlines the SVG as a component, so the
    // brand and UI icons inherit currentColor instead of costing a request each.
    svgr({ include: '**/*.svg?react' }),
  ],

  /*
   * Chunking is set on the client environment alone.
   *
   * The build runs twice now: once for the browser, once in Node to render the
   * HTML. React and GSAP are externals in that second pass, and naming an
   * external in `manualChunks` fails the build outright. `isSsrBuild` does not
   * catch it — the router builds through Vite's environment API, so the
   * environment is where the option belongs.
   */
  environments: {
    client: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-dom/client'],
              'vendor-gsap': ['gsap'],
              'vendor-scroll': ['gsap/ScrollTrigger', 'lenis'],
            },
          },
        },
      },
    },
  },

  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
  },
});
