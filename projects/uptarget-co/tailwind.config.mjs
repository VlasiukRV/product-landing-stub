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
                green: {
                    DEFAULT: '#71c15c',
                    light: '#71c15c33',
                }
            },
            maxWidth: {
                'container': '1200px',
            },
            fontFamily: {
                sans: ['Golos Text', ...defaultTheme.fontFamily.sans],
                unbounded: ['Unbounded', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', 'sans-serif'],
                golos: ['Golos Text', ...defaultTheme.fontFamily.sans],
            },
            typography: {
                DEFAULT: {
                    css: {
                        'h1, h2, h3, h4, h5, h6': {
                            fontFamily: 'Unbounded, sans-serif',
                        },
                        'p, li, blockquote': {
                            fontFamily: 'Golos Text, sans-serif',
                        }
                    },
                },
            },
        },
    },
    plugins: [
        typography,
    ],
};