import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // `import Icon from './x.svg?react'` inlines the SVG as a component, so the
    // brand and UI icons inherit currentColor instead of costing a request each.
    svgr({ include: '**/*.svg?react' }),
  ],
  build: {
    // Split the heavy, below-the-fold vendors so the hero paints fast.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', 'lenis'],
          // Only the proof bar's CountUp pulls this in; keep it out of the
          // main bundle so a copy change does not re-download it.
          'vendor-motion': ['motion'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
  },
});
