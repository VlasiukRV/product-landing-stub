// projects/college-website/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/college-website';
const baseConfig = getBaseConfig(project_dir, 'https://college-website.tsb-enterprise.com');

export default defineConfig({
    ...baseConfig
});