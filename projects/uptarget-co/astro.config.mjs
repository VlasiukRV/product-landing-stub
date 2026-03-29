import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const project_dir = 'uptarget-co'

export default defineConfig({
    site: 'https://uptarget.co',

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
        cacheDir: '../../node_modules/.cache/vite',
        server: {
            proxy: {
                '/api': {
                    target: 'http://host.docker.internal:8000',
                    changeOrigin: true,
                    secure: false,

                    rewrite: (path) => path,
                    headers: {
                        'X-Client-ID': 'client_uptarget_co'
                    },
                    configure: (proxy, options) => {
                        proxy.on('error', (err, req, res) => {
                            console.log('--- PROXY ERROR ---', err);
                        });
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log('--> Sending Request to Synapse:', req.method, req.url);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log('<-- Received Response from Synapse:', proxyRes.statusCode);
                        });
                    }
                }
            }
        }
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