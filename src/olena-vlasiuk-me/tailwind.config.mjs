/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'base-dark': '#3e5153',
                'light-blue': '#7d9c9fb3',
                'link-green': '#c1eb70',
                's-blue': '#a4f1f6',
            },
            maxWidth: {
                'container': '940px',
            },
            fontFamily: {
                'sans': ['Golos Text', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [
        typography,
    ],
};