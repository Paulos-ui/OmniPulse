/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:    { 1:'#08090C', 2:'#0D0F14', 3:'#111318', 4:'#161A22', 5:'#1C2130' },
        wire:   { 1:'#1E2530', 2:'#28303E', 3:'#334055' },
        orange: { dim:'rgba(255,102,0,0.12)', mid:'#C45000', full:'#FF6600', bright:'#FF8533', glow:'rgba(255,102,0,0.20)' },
        blue:   { dim:'rgba(0,82,255,0.12)',  mid:'#0040CC', full:'#0052FF', bright:'#3377FF', glow:'rgba(0,82,255,0.20)' },
        green:  { full:'#00C853', dim:'rgba(0,200,83,0.13)' },
        red:    { full:'#FF1744', dim:'rgba(255,23,68,0.13)' },
        ash:    { 1:'#F0F2F5', 2:'#B8C0CC', 3:'#6B7585', 4:'#3A4255' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      keyframes: {
        scrollleft: { '0%':{ transform:'translateX(0)' }, '100%':{ transform:'translateX(-50%)' } },
        float:   { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-14px)' } },
        fadeUp:  { '0%':{ opacity:'0', transform:'translateY(20px)' }, '100%':{ opacity:'1', transform:'translateY(0)' } },
        flash:   { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.3' } },
      },
      animation: {
        scrollleft: 'scrollleft 35s linear infinite',
        float:   'float 7s ease-in-out infinite',
        fadeUp:  'fadeUp 0.45s ease-out forwards',
        flash:   'flash 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
