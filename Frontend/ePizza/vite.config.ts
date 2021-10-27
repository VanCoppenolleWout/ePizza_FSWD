import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteFonts({
      google: {
        families: [
          'Montserrat',
          {
            name: 'Montserrat',
            styles: 'ital,wght@0,400;1,500;2,600;3,700;4,800',
          },
        ],
        display: 'swap',
        preconnect: true,
      },
    }),
  ],

  server: {
    port: 8888,
    https: true,
  },
})
