import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
c

const project_dir = '/quick-test'

export default defineConfig({
    site: 'https://quick-test.tsb-enterprise.com/',

    base: '/',
    srcDir: './src',
    outDir: '../../storage'+project_dir,

    output: 'static', //'static' 'hybrid' оставит работающими API-эндпоинты
    integrations: [
        vue(),
        sitemap(),
    ],
    markdown: {
        shikiConfig: { theme: 'dracula' },
    },
    build: {
        inlineStylesheets: 'always',
        cacheDir: '../../node_modules/.cache/astro',
    },
    vite: {
        plugins: [tailwindcss()],
        cacheDir: '../../node_modules/.cache/vite',
    },
    image: {
        domains: [],
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    },
    devToolbar: {
        enabled: false
    }
});