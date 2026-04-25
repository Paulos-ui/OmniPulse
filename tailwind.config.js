/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:     { 1: '#080B0F', 2: '#0D1117', 3: '#111820', card: '#0F1923' },
        cyan:   '#00F5D4',
        yellow: '#F5C518',
        red:    '#FF3358',
        green:  '#00D68F',
        purple: '#9B5DE5',
        border: { dim: '#1A2535', mid: '#243044' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      keyframes: {
        ticker:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        fadeUp:  { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        flash:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        ticker:  'ticker 28s linear infinite',
        float:   'float 6s ease-in-out infinite',
        fadeUp:  'fadeUp 0.55s ease-out forwards',
        flash:   'flash 1s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
