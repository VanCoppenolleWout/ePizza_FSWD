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
      colors: {
        'p-red': '#F54749',
        'p-blue': '#0071FF',
        'p-gray': '#707070',
        'p-gray-100': '#F1F0F2',
        'p-gray-200': '#919191',
        'p-yellow': '#E3BB52',
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
            maxWidth: '984px',
          },
          '@screen xl': {
            maxWidth: '1220px',
          },
        },
      })
    },
  ],
}
