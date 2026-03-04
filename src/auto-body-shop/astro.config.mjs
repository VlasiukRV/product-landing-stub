import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
    base: '/',
    site: 'https://olena.vlasiuk.me',
    integrations: [
        vue(),
        tailwind({

        }),
    ],
    output: 'static',
    markdown: {
        shikiConfig: { theme: 'dracula' },
    }
});