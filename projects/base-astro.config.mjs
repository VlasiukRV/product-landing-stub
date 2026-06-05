// projects/base-astro.config.mjs
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export function getBaseConfig(projectDir, siteUrl) {
    return {
        site: siteUrl,
        base: '/',
        srcDir: './src',
        outDir: `../../storage${projectDir}`,
        output: 'static',
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
    };
}