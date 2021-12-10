// tailwind.config.js
module.exports = {
  mode: 'jit',

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'Helvetica Neue'],
      },
      maxWidth: {
        pizzaComponent: '320px',
      },
      width: {
        input: '550px',
      },
      colors: {
        'p-red': '#F54749',
        'p-blue': '#0071FF',
        'p-gray': '#707070',
        'p-gray-100': '#F1F0F2',
        'p-gray-200': '#919191',
        'p-gray-300': '#707070',
        'p-yellow': '#E3BB52',
        primary: '#faf7fa',
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },

  plugins: [
    require('@tailwindcss/custom-forms'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            //768px
            maxWidth: '748px',
          },
          '@screen lg': {
            //1024px
            maxWidth: '1000px',
          },
          '@screen xl': {
            //1280px
            maxWidth: '1220px',
          },
        },
      })
    },
  ],
}
