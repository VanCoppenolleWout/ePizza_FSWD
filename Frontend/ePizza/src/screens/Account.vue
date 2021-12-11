<script lang="ts">
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import {
  getDownloadURL,
  getStorage,
  ref as stRef,
  uploadBytes,
} from 'firebase/storage'
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import useFirebase from '../composables/useFirebase'
import { store } from '../store/store'
import { app } from '../composables/useFirebase'

export default defineComponent({
  setup() {
    const auth = getAuth()
    const firebaseUser: any = auth.currentUser

    const user = computed(() => {
      return store.getters.getUser
    })

    let nameInput = ref<boolean>(false)
    let emailInput = ref<boolean>(false)
    let passwordInput = ref<boolean>(false)
    let addressInput = ref<boolean>(false)

    let profileImg = ref<string>(user.value.photoURL)
    let displayName = ref<string>(user.value.displayName)
    let email = ref<string>(user.value.email)
    let password = ref<string>('●●●●●●●●')

    const { logout } = useFirebase()
    const { push } = useRouter()
    const handleLogout = () => {
      logout()
      push('/')
    }

    const editName = (input: string) => {
      displayName.value = input
      const auth: any = getAuth()
      updateProfile(auth.currentUser, {
        displayName: input,
      })
        .then(() => {
          console.log('updated')
          console.log(user.value)
        })
        .catch((error) => {
          console.log(error)
        })
      nameInput.value = false
    }

    const editEmail = (input: string) => {
      updateEmail(firebaseUser, input)
        .then(() => {
          // Update successful.
          console.log('email changed succesfully')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const editPassword = (input: string) => {
      updatePassword(firebaseUser, input)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        })
    }

    const file: any = ref(null)
    const storage = getStorage(app)

    const handleFileUpload = async () => {
      const auth: any = getAuth()
      // debugger;
      console.log('selected file', file.value.files[0])
      //Upload to server
      const uploadImage = stRef(
        storage,
        `profilePicture/${user.value.uid}/${file.value.files[0].name}`,
      )
      await uploadBytes(uploadImage, file.value.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })
      await getDownloadURL(
        stRef(
          storage,
          `profilePicture/${user.value.uid}/${file.value.files[0].name}`,
        ),
      ).then((url) => {
        console.log(url)
        updateProfile(auth.currentUser, {
          photoURL: url,
        })
      })
    }

    const editAddress = () => {}

    return {
      user,
      nameInput,
      emailInput,
      passwordInput,
      addressInput,
      displayName,
      email,
      password,
      profileImg,
      editName,
      editEmail,
      editPassword,
      editAddress,
      handleLogout,
      handleFileUpload,
      file,
    }
  },
  components: { AppHeader },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0">
    <AppHeader />
    <div
      class="
        flex flex-col
        justify-center
        mx-auto
        md:mt-32
        mt-16
        md:max-w-4xl md:w-screen
      "
    >
      <div class="flex flex-row items-center space-x-6">
        <label v-if="user.photoURL === null">
          <div
            class="
              rounded-full
              p-6
              flex
              bg-gray-300
              hover:bg-gray-400
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              ref="file"
              v-on:change="handleFileUpload()"
              style="display: none"
              type="file"
            />
          </div>
        </label>
        <label v-else>
          <div
            class="
              rounded-full
              flex
              bg-gray-300
              hover:bg-gray-400
              cursor-pointer
              w-16
              md:w-24
            "
          >
            <img
              :src="profileImg"
              alt=""
              class="rounded-full w-16 h-16 md:w-24 md:h-24"
            />
          </div>
          <input
            ref="file"
            v-on:change="handleFileUpload()"
            style="display: none"
            type="file"
          />
        </label>

        <p class="text-2xl md:text-3xl font-medium">{{ user.displayName }}</p>
      </div>
      <section class="mt-6 md:mt-10 bg-white rounded-2xl p-8">
        <h1 class="font-semibold text-2xl">Account details</h1>
        <div class="mt-6">
          <p class="text-sm text-gray-600">Display name</p>
          <div class="flex flex-row justify-between items-center">
            <p v-if="!nameInput" class="text-lg font-medium">
              {{ displayName }}
            </p>
            <input
              v-if="nameInput"
              type="text"
              name=""
              id=""
              placeholder="Wout Vancoppenolle"
              v-model="displayName"
            />
            <div class="flex flex-row space-x-4">
              <button
                v-if="nameInput"
                @click="nameInput = false"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #d2222d"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button
                v-if="nameInput"
                @click="editName(displayName)"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #238823"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
            <button
              v-if="!nameInput"
              @click="nameInput = true"
              class="px-5 py-2 bg-gray-400 rounded-lg text-white font-medium"
            >
              Edit
            </button>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-sm text-gray-600">Email</p>
          <div class="flex flex-row justify-between items-center">
            <p v-if="!emailInput" class="text-lg font-medium">
              {{ email }}
            </p>
            <input
              v-if="emailInput"
              type="text"
              name=""
              id=""
              placeholder="Wout Vancoppenolle"
              v-model="email"
            />
            <div class="flex flex-row space-x-4">
              <button
                v-if="emailInput"
                @click="emailInput = false"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #d2222d"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button
                v-if="emailInput"
                @click="editEmail(email)"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #238823"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
            <button
              v-if="!emailInput"
              @click="emailInput = true"
              class="px-5 py-2 bg-gray-400 rounded-lg text-white font-medium"
            >
              Edit
            </button>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-sm text-gray-600">Password</p>
          <div class="flex flex-row justify-between items-center">
            <p v-if="!passwordInput" class="text-lg font-medium">●●●●●●●●</p>
            <input
              v-if="passwordInput"
              type="password"
              name=""
              id=""
              placeholder="●●●●●●●●"
              v-model="password"
            />
            <div class="flex flex-row space-x-4">
              <button
                v-if="passwordInput"
                @click="passwordInput = false"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #d2222d"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button
                v-if="passwordInput"
                @click="editPassword(password)"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #238823"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
            <button
              v-if="!passwordInput"
              @click="passwordInput = true"
              class="px-5 py-2 bg-gray-400 rounded-lg text-white font-medium"
            >
              Edit
            </button>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-sm text-gray-600">Address</p>
          <div class="flex flex-row justify-between items-center">
            <p v-if="!addressInput" class="text-lg font-medium">
              {{ 'Oudenaarde, Neerstraat 10, 9700, België' }}
            </p>
            <input
              v-if="addressInput"
              type="text"
              name=""
              id=""
              placeholder="Oudenaarde, Neerstraat 10, 9700, België"
            />
            <div class="flex flex-row space-x-4">
              <button
                v-if="addressInput"
                @click="addressInput = false"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #d2222d"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button
                v-if="addressInput"
                @click="editAddress"
                class="px-5 py-2 rounded-lg text-white font-medium"
                style="background-color: #238823"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
            <button
              v-if="!addressInput"
              @click="addressInput = true"
              class="px-5 py-2 bg-gray-400 rounded-lg text-white font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </section>
      <section class="flex flex-row justify-center mt-10">
        <button
          @click="handleLogout"
          class="px-6 py-3 bg-p-red text-white font-medium rounded-xl w-1/5"
        >
          Sign out
        </button>
      </section>
    </div>
  </div>
</template>
