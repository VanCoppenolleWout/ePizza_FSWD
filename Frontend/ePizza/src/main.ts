import { createApp, App as AppInterface } from 'vue'

import App from './App.vue'
import router from './bootstrap/router' // Here, router is inside a folder bootstrap
import './assets/style/screen.css' // Import the css-file.
import { key, store } from './store/store'
import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBuf6CzQHfyORsCLgcYKYFvcSM3YLbxfZU',
  authDomain: 'pizza-backend-67c13.firebaseapp.com',
  projectId: 'pizza-backend-67c13',
  storageBucket: 'pizza-backend-67c13.appspot.com',
  messagingSenderId: '426479720985',
  appId: '1:426479720985:web:919482c8e472d2344c6888',
  measurementId: 'G-RSNQ9RXHCK',
}

initializeApp(firebaseConfig)

const app: AppInterface = createApp(App)

app.use(router)
app.use(store, key)

app.mount('#app')

console.log('app mounted')
