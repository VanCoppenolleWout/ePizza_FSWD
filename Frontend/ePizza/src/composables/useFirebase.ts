import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { Ref, ref, readonly } from 'vue'

const auth: Auth = getAuth()

setPersistence(auth, browserLocalPersistence)
const user: Ref<User | null> = ref(auth.currentUser)

export default () => {
  const login = (email: string, password: string): Promise<boolean> => {
    console.log('function login started')
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // console.log(await userCredential.user.getIdToken())

          user.value = userCredential.user
          resolve(true)
        })
        .catch((error) => {
          // const errorCode = error.code
          // const errorMessage = error.message
          reject(false)
        })
    })
  }

  const logout = () => {
    return signOut(auth)
  }

  return {
    login,
    logout,

    user: readonly(user),
  }
}
