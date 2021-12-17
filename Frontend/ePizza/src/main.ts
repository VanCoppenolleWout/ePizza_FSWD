import { createApp, App as AppInterface } from 'vue'

import App from './App.vue'
import router from './bootstrap/router' // Here, router is inside a folder bootstrap
import './assets/style/screen.css' // Import the css-file.
import { key, store } from './store/store'
import lazyPlugin from 'vue3-lazy'
import { createI18n } from 'vue-i18n'
import en from './assets/i18n/en.json'
import nl from './assets/i18n/nl.json'

import useFirebase from './composables/useFirebase'
;(async () => {
  const app: AppInterface = createApp(App)
  const lang: any = localStorage.getItem('lang')

  app.use(store, key)
  app.use(lazyPlugin, {
    loading: 'loading.png',
    error: 'error.png',
  })

  const messages = {
    en: en,
    nl: nl,
  }

  const i18n = createI18n({
    locale: lang,
    fallbackLocale: 'en',
    messages,
  })

  app.use(i18n)

  const { restoreAuth } = useFirebase()
  await restoreAuth()
  app.use(router)

  app.mount('#app')
})()
