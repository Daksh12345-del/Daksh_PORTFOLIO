/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0806',
          soft: '#120E0A',
          light: '#FBF6EE',
          lightsoft: '#F3ECDD',
        },
        accent1: '#FFB238',
        accent2: '#FF7A3D',
        warn: '#FFD866',
        'accent1-light': '#C97A1B',
        'accent2-light': '#D4571C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        'glass-light': '0 8px 32px rgba(20,20,50,0.10)',
      },
      keyframes: {
        blobmove: {
          '0%, 100%': { borderRadius: '40% 60% 55% 45% / 45% 40% 60% 55%' },
          '50%': { borderRadius: '55% 45% 40% 60% / 55% 60% 40% 45%' },
        },
        pulse2: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
        scrolldown: {
          '0%': { opacity: 0, transform: 'scaleY(0.2)', transformOrigin: 'top' },
          '50%': { opacity: 1, transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { opacity: 0, transform: 'scaleY(0.2)', transformOrigin: 'bottom' },
        },
        ticker: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        blobmove: 'blobmove 8s ease-in-out infinite',
        pulse2: 'pulse2 2s infinite',
        scrolldown: 'scrolldown 1.8s infinite',
        ticker: 'ticker 10s linear infinite',
      },
    },
  },
  plugins: [],
}
