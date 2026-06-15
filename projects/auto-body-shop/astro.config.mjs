// projects/auto-body-shop/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/auto-body-shop';
const baseConfig = getBaseConfig(project_dir, 'https://auto-body-shop.tsb-enterprise.com');

export default defineConfig({
    ...baseConfig
});