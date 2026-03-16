/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                orange: {
                    700: '#c2410c',
                    800: '#9a3412', // добавил для ховера кнопок
                },
                'coffee-cream': '#fff4dc',
                'coffee-light': '#fbe8c2',
                // Кастомные темные тона для карточек (в стиле stone, но теплее)
                'coffee-dark': '#1a1412',
            },
            fontFamily: {
                serif: ['Lora', 'serif'],
                display: ['Playfair Display', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'coffee-gradient': "linear-gradient(135deg, #2c1810 0%, #4a2c20 50%, #1c0e08 100%)",
                'coffee-subtle': "linear-gradient(to bottom right, rgba(44, 24, 16, 0.05), rgba(28, 14, 8, 0.15))",
            },
            // Добавим стандартные анимации в тему
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [typography],
};