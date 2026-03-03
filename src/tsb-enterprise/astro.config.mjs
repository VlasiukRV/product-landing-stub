import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    base: '/',
    site: 'https://tsb-enterprise.com',
    integrations: [tailwind()],
    output: 'static',
    markdown: {
        shikiConfig: { theme: 'dracula' },
    }
});