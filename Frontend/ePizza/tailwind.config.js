// tailwind.config.js
module.exports = {
  // mode: 'jit',

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'Helvetica Neue'],
      },
      maxWidth: {
        'test': '800px',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
