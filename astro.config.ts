import { defineConfig } from 'astro/config';

// GitHub Pages serves project sites under /<repo>/. The deploy workflow sets both
// variables from the repository name, so forks and a future custom domain work unchanged.
const site = process.env.SITE_URL ?? 'https://embodied-datasets.github.io';
const base = process.env.SITE_BASE ?? '/embodied-datasets';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
