import { createApp, App as AppInterface } from 'vue'

import App from './App.vue'
import router from './bootstrap/router' // Here, router is inside a folder bootstrap
import './assets/style/screen.css' // Import the css-file.
import { key, store } from './store/store'
import lazyPlugin from 'vue3-lazy'
import { createI18n } from 'vue-i18n'
import en from './assets/i18n/en.json'
import nl from './assets/i18n/nl.json'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import useFirebase from './composables/useFirebase'
;(async () => {
  const app: AppInterface = createApp(App)
  const lang: any = localStorage.getItem('lang')

  app.use(store, key)
  app.use(lazyPlugin, {
    // loading: 'loading.png',
    // error: 'error.png',
  })
  // Sentry.init({
  //   app,
  //   dsn: 'https://fd56de59dd5646c587f358cf1f617f32@o1088091.ingest.sentry.io/6110686',
  //   integrations: [
  //     new Integrations.BrowserTracing({
  //       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
  //       tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
  //     }),
  //   ],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // })

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
  app.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBOYHJY2dqs-bNqacxobU5CvYRJRoJAR6E',
    },
  })

  const { restoreAuth } = useFirebase()
  await restoreAuth()
  app.use(router)

  app.mount('#app')
})()
