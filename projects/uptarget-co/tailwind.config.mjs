/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                orange: '#ff5700',
                black: '#1a1a1c',
                yellow: '#fd0',
                'black-80': '#1a1a1ccc',
                'yellow-50': '#ffdd0080',
                voiceitt: '#4a7bf7',
                strategiclear: '#c7d7ef',
                smartrike: '#203847',
            },
            maxWidth: {
                'container': '1200px',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                unbounded: ['Unbounded', 'sans-serif'],
                golos: ['Golos Text', 'sans-serif'],
            }
        },
    },
    plugins: [
        typography,
    ],
};