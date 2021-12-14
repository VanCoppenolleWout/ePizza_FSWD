import { createApp, App as AppInterface } from 'vue'

import App from './App.vue'
import router from './bootstrap/router' // Here, router is inside a folder bootstrap
import './assets/style/screen.css' // Import the css-file.
import { key, store } from './store/store'
import lazyPlugin from 'vue3-lazy'

import useFirebase from './composables/useFirebase'
;(async () => {
  const app: AppInterface = createApp(App)

  app.use(store, key)
  app.use(router)
  app.use(lazyPlugin, {
    loading: 'loading.png',
    error: 'error.png',
  })

  const { restoreAuth } = useFirebase()
  await restoreAuth()

  app.mount('#app')
})()
