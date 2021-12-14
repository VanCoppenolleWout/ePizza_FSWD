import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: [
    'favicon.png',
    'favicon.ico',
    'robots.txt',
    'apple-touch-icon.png',
  ],

  manifest: {
    name: 'ePizza',
    short_name: 'ePizza',
    theme_color: '#DE5974',
    display: 'standalone',
    background_color: '#DE5974',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 5000000,
    swDest: 'assets',
  },
  srcDir: 'src',
  outDir: 'dist',
  filename: 'sw.ts',
  strategies: 'injectManifest',
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port: 8888,
    https: true,
  },
})
