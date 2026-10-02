/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        brand: {
          nude: '#F7EBE1',
          champagne: '#E8D3B9',
          blush: '#F3C5BA',
          roseGold: '#C06C64',
          terracotta: '#A6534B',
          velvet: '#5C1D24',
          silkGold: '#D4AF37',
          charcoal: '#1E2022',
          subtle: '#6B7280',
          cream: '#FCF9F6',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(192, 108, 100, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px -4px rgba(30, 32, 34, 0.1)',
      }
    },
  },
  plugins: [],
}
