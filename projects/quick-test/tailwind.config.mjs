/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],

    theme: {
        extend: {
            colors: {
                // 🎯 Основная палитра (ed-tech)
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // основной цвет
                    600: '#2563eb',
                    700: '#1d4ed8',
                },

                // 🧠 Нейтральные (фон, карточки)
                surface: '#ffffff',
                'surface-soft': '#f8fafc',
                'surface-muted': '#f1f5f9',

                // 📊 Состояния теста
                success: '#16a34a',
                'success-soft': '#dcfce7',

                danger: '#dc2626',
                'danger-soft': '#fee2e2',

                warning: '#f59e0b',
                'warning-soft': '#fef3c7',

                // ✍️ Текст
                text: {
                    DEFAULT: '#0f172a',
                    muted: '#64748b',
                    light: '#94a3b8',
                },

                // 💡 твой стиль (оставил)
                'coffee-cream': '#fff4dc',
                'coffee-light': '#fbe8c2',
                'coffee-dark': '#1a1412',
            },

            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Poppins', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },

            boxShadow: {
                card: '0 4px 20px rgba(0,0,0,0.05)',
                soft: '0 2px 10px rgba(0,0,0,0.04)',
                focus: '0 0 0 3px rgba(59,130,246,0.3)',
            },

            borderRadius: {
                xl: '1rem',
                '2xl': '1.5rem',
            },

            backgroundImage: {
                'primary-gradient':
                    'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',

                'quiz-subtle':
                    'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(99,102,241,0.08))',
            },

            animation: {
                'fade-in': 'fadeIn 0.4s ease-out forwards',
                'scale-in': 'scaleIn 0.2s ease-out forwards',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(6px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.98)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },

    plugins: [typography],
}