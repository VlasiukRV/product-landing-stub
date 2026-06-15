// projects/olena-vlasiuk-me/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/olena-vlasiuk-me';
const baseConfig = getBaseConfig(project_dir, 'https://olena.vlasiuk.me');

export default defineConfig({
    ...baseConfig
});