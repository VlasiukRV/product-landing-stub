/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],

    theme: {
        extend: {

            // 🎨 COLOR SYSTEM (как в SaaS продуктах)
            colors: {
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1', // основной
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                },

                secondary: {
                    500: '#0ea5e9',
                    600: '#0284c7',
                },

                accent: {
                    500: '#22c55e',
                    600: '#16a34a',
                },

                surface: {
                    DEFAULT: '#ffffff',
                    muted: '#f8fafc',
                    border: '#e5e7eb',
                },

                text: {
                    DEFAULT: '#111827',
                    muted: '#6b7280',
                },

                health: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                },

                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    600: '#059669',
                    700: '#047857',
                }
            },

            // 📏 CONTAINERS
            maxWidth: {
                container: '1200px',
                content: '800px',
            },

            // 🔤 FONTS
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Inter', ...defaultTheme.fontFamily.sans],
                mono: [...defaultTheme.fontFamily.mono],
            },

            // 🔲 BORDER RADIUS
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px', // збільшив з 20px
                '4xl': '32px', // для великих карток
                '5xl': '48px', // саме цей радіус дає ефект "м'якої" сторінки (rounded-[3rem])
            },

            // 🌫 SHADOWS
            boxShadow: {
                soft: '0 4px 20px rgba(0,0,0,0.05)',
                card: '0 8px 30px rgba(0,0,0,0.08)',
            },

            // 🎯 SPACING (удобно для layout)
            spacing: {
                18: '4.5rem',
                22: '5.5rem',
            },

            transitionDuration: {
                'DEFAULT': '300ms',
            },

            letterSpacing: {
                tightest: '-.075em',
                tighter: '-.05em',
                tight: '-.025em',
                wide: '.025em',
                wider: '.05em',
                widest: '.1em', // замість ручного 0.15em
            },

            // ✍️ TYPOGRAPHY (очень важно для контента)
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.text.DEFAULT'),

                        h1: {
                            fontWeight: '700',
                        },
                        h2: {
                            fontWeight: '600',
                        },
                        a: {
                            color: theme('colors.primary.600'),
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                    },
                },
            }),

        },
    },

    plugins: [
        typography,
    ],
};