/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F2E4',
        surface: '#FFFFFF',
        warm: '#E6D8C3',
        'primary-accent': '#C9D9E8',
        'text-primary': '#1E1B18',
        'text-secondary': '#5C554E',
        'gold-accent': '#B87D3B',
        success: '#3B6E52',
        alert: '#9E3E3E',
        'charcoal-hover': '#3A342E',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px -4px rgba(30, 27, 24, 0.05), 0 2px 6px -1px rgba(30, 27, 24, 0.03)',
        drawer: '0 20px 48px -8px rgba(30, 27, 24, 0.08), 0 4px 12px -2px rgba(30, 27, 24, 0.04)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        btn: '3px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      spacing: {
        'gutter': '1.5rem',
        'gutter-mobile': '1rem',
        'margin-desktop': '4rem',
        'margin-mobile': '1.25rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '2rem',
        'space-xl': '3.5rem',
      },
      borderColor: {
        'stone-hairline': 'rgba(92, 85, 78, 0.12)',
        'sand-hairline': 'rgba(230, 216, 195, 0.6)',
      },
      maxWidth: {
        layout: '1440px',
      },
    },
  },
  plugins: [],
}
