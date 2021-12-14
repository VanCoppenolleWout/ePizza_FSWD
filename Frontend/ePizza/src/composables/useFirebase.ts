import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithCustomToken,
} from 'firebase/auth'
import { Ref, ref, readonly } from 'vue'
import { ActionTypes, MutationTypes, store } from '../store/store'
import { fetchData } from './useNetwork'

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBuf6CzQHfyORsCLgcYKYFvcSM3YLbxfZU',
  authDomain: 'pizza-backend-67c13.firebaseapp.com',
  projectId: 'pizza-backend-67c13',
  storageBucket: 'pizza-backend-67c13.appspot.com',
  messagingSenderId: '426479720985',
  appId: '1:426479720985:web:919482c8e472d2344c6888',
  measurementId: 'G-RSNQ9RXHCK',
}

const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth()

setPersistence(auth, browserLocalPersistence)
const user: Ref<User | null> = ref(auth.currentUser)

export default () => {
  const login = (
    email: string,
    password: string,
  ): Promise<boolean | string> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          user.value = userCredential.user
          resolve(true)
        })
        .catch((error) => {
          reject('falsee')
        })
    })
  }

  const restoreAuth = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        auth.onAuthStateChanged(async (res) => {
          const { get } = fetchData()
          if (res !== null) {
            const admin = await get('/user/admin', await res?.getIdToken())
            store.dispatch(MutationTypes.setAdmin, admin.admin)
            store.dispatch(ActionTypes.setUser, user)

            user.value = res
          } else {
            store.dispatch(ActionTypes.setUser, user)
            store.dispatch(MutationTypes.setAdmin, undefined)
          }
          resolve(true)
        })
      } catch (error) {
        reject(false)
      }
    })
  }

  const loginId = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      signInWithCustomToken(auth, id)
        .then((userCredential) => {
          user.value = userCredential.user

          resolve(true)
        })
        .catch((error) => reject(false))
    })
  }

  const logout = () => {
    user.value = null
    store.dispatch(ActionTypes.setUser, user)
    return signOut(auth)
  }

  return {
    login,
    logout,
    loginId,
    restoreAuth,

    user: readonly(user),
  }
}

export { app }
