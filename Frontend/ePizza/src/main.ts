import { createApp, App as AppInterface } from 'vue'

import App from './App.vue'
import router from './bootstrap/router' // Here, router is inside a folder bootstrap
import './assets/style/screen.css' // Import the css-file.

const app: AppInterface = createApp(App)

app.use(router);

app.mount('#app')