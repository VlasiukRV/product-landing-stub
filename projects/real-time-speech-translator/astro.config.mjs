// projects/real-time-speech-translator/astro.config.mjs

import { defineConfig } from 'astro/config';
import { getBaseConfig } from '../base-astro.config.mjs';

const project_dir = '/real-time-speech-translator';
const baseConfig = getBaseConfig(project_dir, 'https://speech-translator.tsb-enterprise.com');

export default defineConfig({
    ...baseConfig
});