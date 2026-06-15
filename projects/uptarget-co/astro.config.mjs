// projects/uptarget-co/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/uptarget-co';
const baseConfig = getBaseConfig(project_dir, 'https://uptarget.co');

export default defineConfig({
    ...baseConfig,
    vite: {
        ...baseConfig.vite,
        css: {
            preprocessorOptions: {
                css: { additionalData: `@reference "tailwindcss";` }
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://host.docker.internal:8000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path,
                    headers: { 'X-Client-ID': 'client_uptarget_co' }
                }
            }
        }
    }
});