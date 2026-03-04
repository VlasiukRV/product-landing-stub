import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
    base: '/',
    site: 'https://auto-body-shop.tsb-enterprise.com/',
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