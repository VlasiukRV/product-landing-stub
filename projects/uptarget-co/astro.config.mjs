import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

const project_dir = 'uptarget-co'

export default defineConfig({
    site: 'https://uptarget.co/',

    base: '/',
    srcDir: './src',
    outDir: '../../public_html/'+project_dir,

    output: 'static', //'static' 'hybrid' оставит работающими API-эндпоинты
    integrations: [
        vue(),
        tailwind({
            applyBaseStyles: true,
            configFile: './tailwind.config.mjs',
        }),
    ],
    markdown: {
        shikiConfig: { theme: 'dracula' },
    },
    build: {
        inlineStylesheets: 'always',
        cacheDir: '../../node_modules/.cache/astro',
    },
    vite: {
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