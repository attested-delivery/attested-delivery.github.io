// @ts-check
import { defineConfig } from 'astro/config';

// This repo is the org's GitHub Pages root: https://attested-delivery.github.io/
// The marketing site serves at "/"; the Starlight reference docs live in a
// separate repo and are served at /docs/. Keep `base` at the root.
export default defineConfig({
  site: 'https://attested-delivery.github.io',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
