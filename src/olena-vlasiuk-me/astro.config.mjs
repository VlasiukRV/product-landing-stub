import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    base: '/',
    site: 'https://olena.vlasiuk.me/',
    integrations: [tailwind()],
    output: 'static',
    markdown: {
        shikiConfig: { theme: 'dracula' },
    }
});