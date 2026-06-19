import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  adapter: netlify(),
  site: 'https://kctechenthusiasts.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
