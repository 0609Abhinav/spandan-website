module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#a855f7', light: '#d8b4fe', dark: '#7e22ce' },
        accent:    { DEFAULT: '#ec4899', light: '#fbcfe8' },
        surface:   { DEFAULT: '#0f0a1e', card: '#1a1030', border: 'rgba(168,85,247,0.2)' },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        glass:  '0 8px 32px rgba(168,85,247,0.15)',
        card:   '0 4px 24px rgba(0,0,0,0.4)',
        glow:   '0 0 40px rgba(168,85,247,0.3)',
      },
    },
  },
  plugins: [],
};
