/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#ff4d00',
                dark: '#0f0f0f',
                surface: '#1a1a1a',
                muted: '#9ca3af',
                success: '#22c55e'
            },
            maxWidth: {
                'container': '940px',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Oswald', 'sans-serif']
            }
        },
    },
    plugins: [
        typography,
    ],
};