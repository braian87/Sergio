/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        black: '#121212',
        white: '#ffffff',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0a0a',
        },
        gold: {
          300: '#f9d776',
          400: '#efc850',
          500: '#BF9B30',
          600: '#a27c13',
          700: '#826109',
        },
      },
      boxShadow: {
        soft: '0 2px 15px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
        strong: '0 8px 30px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-black',
    'text-white',
    'bg-gold-500',
    'text-gold-500',
    'border-gold-500',
    'border-gray-800',
    'bg-gray-900',
    'bg-gray-700',
    'bg-opacity-90',
    'bg-opacity-95',
    'bg-opacity-50',
  ]
};
