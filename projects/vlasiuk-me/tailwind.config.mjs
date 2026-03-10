/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {

            },
            maxWidth: {

            },
            fontFamily: {

            }
        },
    },
    plugins: [
        typography,
    ],
};