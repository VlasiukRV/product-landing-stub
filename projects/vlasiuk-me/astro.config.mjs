// projects/vlasiuk-me/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/vlasiuk-me';
const baseConfig = getBaseConfig(project_dir, 'https://vlasiuk.me');

export default defineConfig({
    ...baseConfig
});