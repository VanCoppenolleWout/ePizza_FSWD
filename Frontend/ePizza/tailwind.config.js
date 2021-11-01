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
        // 'input':'3'
      },
      width: {
        input: '500px',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            maxWidth: '700px',
          },
          '@screen lg': {
            maxWidth: '800px',
          },
          '@screen xl': {
            maxWidth: '900px',
          },
        },
      })
    },
  ],
}
