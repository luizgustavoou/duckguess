/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        code: ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        navy: {
          900: '#0a0a1a',
          800: '#0f0f2e',
          700: '#1a1a3e',
          600: '#252558',
        },
        brand: {
          primary: '#2a3972',
          button: '#3a4982',
          accent: '#da3939',
        },
      },
      backgroundImage: {
        'game-gradient': 'radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 100%)',
      },
      keyframes: {
        'hint-odd': {
          from: { transform: 'translateX(-110%)' },
          to:   { transform: 'translateX(0)' },
        },
        'hint-even': {
          from: { transform: 'translateX(110%)' },
          to:   { transform: 'translateX(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(99,102,241,0.4)' },
          '50%':      { boxShadow: '0 0 30px rgba(99,102,241,0.8)' },
        },
      },
      animation: {
        'hint-odd':    'hint-odd 0.6s ease both',
        'hint-even':   'hint-even 0.6s ease both',
        'fade-in-up':  'fade-in-up 0.5s ease both',
        'float':       'float 3s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
