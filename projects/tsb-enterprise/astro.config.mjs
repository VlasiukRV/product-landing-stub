// projects/tsb-enterprise/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const baseConfig = getBaseConfig('/tsb-enterprise', 'https://tsb-enterprise.com/');

export default defineConfig({
    ...baseConfig,

    vite: {
        ...baseConfig.vite,
        server: {
            proxy: {
                '/api': {
                    target: 'http://host.docker.internal:8000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path,
                    headers: { 'X-Client-ID': 'client_tsb' }
                }
            }
        }
    }

});