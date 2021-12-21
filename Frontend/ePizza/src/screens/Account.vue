<script lang="ts">
import { getAuth, updateProfile } from 'firebase/auth'
import {
  getDownloadURL,
  getStorage,
  ref as stRef,
  uploadBytes,
} from 'firebase/storage'
import { computed, defineComponent, reactive, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import useFirebase from '../composables/useFirebase'
import { MutationTypes, store } from '../store/store'
import { app } from '../composables/useFirebase'
import InputComponent from '../components/InputComponent.vue'
import { fetchData } from '../composables/useNetwork'
import LanguageChanger from '../components/LanguageChanger.vue'
import { Address } from '../interfaces/address'

export default defineComponent({
  setup() {
    const { get, put } = fetchData()
    const auth = getAuth()
    const animateCircle: Ref<boolean> = ref(false)
    const animateCircle2: Ref<boolean> = ref(false)

    const user = computed(() => {
      return store.getters.getUser
    })

    let nameInput = ref<boolean>(false)
    const name = computed(() => {
      return store.getters.getName
    })
    let addressInput = ref<boolean>(false)
    const addressInputDisabled: Ref<boolean> = ref(false)

    let profileImg = ref<string>(user.value.photoURL)
    let displayName = ref<string>(user.value.displayName)
    let email = ref<string>(user.value.email)

    const { logout } = useFirebase()
    const { push } = useRouter()
    const handleLogout = () => {
      logout()
      push('/')
    }

    const editName = (input: string) => {
      animateCircle.value = true
      displayName.value = input
      const auth: any = getAuth()
      updateProfile(auth.currentUser, {
        displayName: input,
      })
        .then(() => {
          store.commit(MutationTypes.setName, input)
          //store.dispatch(ActionTypes.setUser, user)
          animateCircle.value = false
        })
        .catch((error) => {
          animateCircle.value = false
        })
      nameInput.value = false
      animateCircle.value = false
    }

    const file: any = ref(null)
    const storage = getStorage(app)

    const handleFileUpload = async () => {
      const auth: any = getAuth()
      // debugger;
      //Upload to server
      const uploadImage = stRef(
        storage,
        `profilePicture/${user.value.uid}/${file.value.files[0].name}`,
      )
      await uploadBytes(uploadImage, file.value.files[0]).then((snapshot) => {})
      await getDownloadURL(
        stRef(
          storage,
          `profilePicture/${user.value.uid}/${file.value.files[0].name}`,
        ),
      ).then((url) => {
        updateProfile(auth.currentUser, {
          photoURL: url,
        })
      })
    }

    const address = reactive({
      address_id: '',
      city: '',
      street: '',
      number: '',
      zip_code: '',
    })

    const getUserAddress = async () => {
      try {
        if (user.value) {
          const data = await get(`/user/${user.value.uid}`)

          if (data.addresses.length > 0) {
            address.address_id = data.addresses[0].address_id
            address.city = data.addresses[0].city
            address.street = data.addresses[0].street
            address.zip_code = data.addresses[0].postal_code
            address.number = data.addresses[0].number.toString()
            addressInputDisabled.value = true
          }
        }
      } catch (error) {
        addressInputDisabled.value = true
      }
    }

    getUserAddress()

    const editAddress = async () => {
      animateCircle2.value = true
      addressInput.value = false
      addressInputDisabled.value = true

      const { user }: any = useFirebase()
      const addressInterface: Address = {
        address_id: address.address_id,
        city: address.city,
        number: address.number,
        zip_code: address.zip_code,
        street: address.street,
      }

      const newAddress = await put(
        '/user/change/address',
        addressInterface,
        await user.value?.getIdToken(),
      )

      address.address_id = newAddress.address_id
      address.city = newAddress.city
      address.street = newAddress.street
      address.number = newAddress.number
      address.zip_code = newAddress.postal_code!

      animateCircle2.value = false
    }

    return {
      user,
      nameInput,
      address,
      addressInputDisabled,
      displayName,
      email,
      profileImg,
      editName,
      editAddress,
      handleLogout,
      handleFileUpload,
      file,
      animateCircle,
      animateCircle2,
      name,
    }
  },
  components: { AppHeader, InputComponent, LanguageChanger },
})
</script>

<template>
  <div class="container mx-auto p-4 py-8 sm:p-8 md:px-0">
    <AppHeader />
    <div
      class="
        flex flex-col
        justify-center
        mx-auto
        mt-12
        md:max-w-4xl md:w-screen
      "
    >
      <div class="flex flex-row items-center space-x-6">
        <label v-if="user.photoURL === null">
          <div
            class="
              rounded-full
              p-4
              sm:p-6
              flex
              bg-gray-300
              hover:bg-gray-400
              cursor-pointer
            "
          >
            <svg
              class="w-8 h-8 sm:w-12 sm:h-12"
              xmlns="http://www.w3.org/2000/svg"
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
              accept="image/x-png,image/gif,image/jpeg"
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
              hover:opacity-70
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
            accept="image/x-png,image/gif,image/jpeg"
            v-on:change="handleFileUpload()"
            style="display: none"
            type="file"
          />
        </label>

        <div>
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold">
            {{ user.displayName }}
          </p>
          <p class="text-sm sm:text-lg md:text-xl">
            {{ email }}
          </p>
        </div>
      </div>
      <section class="mt-6 md:mt-10 bg-white rounded-2xl py-8 px-4 sm:p-8">
        <div class="flex flex-row justify-between items-center">
          <h1 class="font-semibold text-lg sm:text-2xl">
            {{ $t('account_title') }}
          </h1>
          <LanguageChanger
            background="white"
            class="max-w-[7rem] sm:max-w-full"
          />
        </div>
        <div class="mt-6">
          <p class="text-sm text-gray-600">{{ $t('account_name') }}</p>
          <div class="flex flex-row justify-between items-center">
            <p v-if="!nameInput" class="text-lg font-medium">
              {{ name }}
            </p>
            <input
              v-if="nameInput"
              type="text"
              name=""
              valua=""
              id=""
              :placeholder="user.displayName"
              v-model="displayName"
              class="
                outline-none
                border border-gray-300
                py-1
                px-4
                rounded-lg
                w-[60%]
                md:w-96
              "
            />
            <div class="flex flex-row space-x-2 sm:space-x-4">
              <button
                v-if="nameInput"
                @click=";(nameInput = false), (displayName = user.displayName)"
                class="
                  px-3
                  py-2
                  sm:px-5 sm:py-2
                  rounded-lg
                  text-white
                  font-medium
                  hover:bg-red-900
                  bg-btn-red
                  transform
                  transition
                  ease-out
                  duration-300
                  hover:scale-[101%]
                "
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
                class="
                  px-3
                  py-2
                  sm:px-5 sm:py-2
                  rounded-lg
                  text-white
                  font-medium
                  hover:bg-green-600
                  bg-btn-green
                  transform
                  transition
                  ease-out
                  duration-300
                  hover:scale-[101%]
                "
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
              class="
                px-5
                py-2
                bg-gray-400
                rounded-lg
                text-white
                font-medium
                hover:bg-gray-500
                transform
                transition
                ease-out
                duration-300
                hover:scale-[101%]
              "
            >
              <div>
                <svg
                  class="h-5 w-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  :class="animateCircle ? 'block' : 'hidden'"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              <p v-if="!animateCircle">
                {{ $t('btn_edit') }}
              </p>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <div class="flex flex-row justify-between items-center">
            <div
              class="h-80"
              :class="
                addressInputDisabled === true
                  ? 'opacity-60 pointer-events-none'
                  : 'opacity-100'
              "
            >
              <InputComponent
                class="md:ml-0"
                id="city"
                placeholder="Kortrijk"
                type="text"
                :label="$t('order_city')"
                :accountFull="true"
                :disabled="addressInputDisabled"
                v-model="address.city"
              />
              <InputComponent
                class="md:ml-0 w-full"
                id="street address"
                placeholder="Graaf Karel De Goedelaan"
                type="text"
                :label="$t('order_street')"
                :accountFull="true"
                :disabled="addressInputDisabled"
                v-model="address.street"
              />
              <div class="flex">
                <InputComponent
                  class="md:ml-0 w-1/2 mr-2"
                  id="number"
                  placeholder="32"
                  type="text"
                  :label="$t('order_streetnr')"
                  :accountFull="true"
                  :disabled="addressInputDisabled"
                  v-model="address.number"
                />
                <InputComponent
                  class="md:ml-2 ml-2"
                  id="zip code"
                  placeholder="8500"
                  type="text"
                  :label="$t('order_zip')"
                  :accountFull="true"
                  :disabled="addressInputDisabled"
                  v-model="address.zip_code"
                />
              </div>
            </div>
            <div class="flex flex-row space-x-2 sm:space-x-4">
              <button
                v-if="!addressInputDisabled"
                @click="addressInputDisabled = true"
                class="
                  px-3
                  py-2
                  sm:px-5 sm:py-2
                  rounded-lg
                  text-white
                  font-medium
                  hover:bg-red-900
                  bg-btn-red
                  transform
                  transition
                  ease-out
                  duration-300
                  hover:scale-[101%]
                "
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
                v-if="!addressInputDisabled"
                @click="editAddress"
                class="
                  px-3
                  py-2
                  sm:px-5 sm:py-2
                  rounded-lg
                  text-white
                  font-medium
                  hover:bg-green-600
                  bg-btn-green
                  transform
                  transition
                  ease-out
                  duration-300
                  hover:scale-[101%]
                "
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
              v-if="addressInputDisabled"
              @click="addressInputDisabled = false"
              class="
                px-5
                py-2
                bg-gray-400
                rounded-lg
                text-white
                font-medium
                hover:bg-gray-500
                transform
                transition
                ease-out
                duration-300
                hover:scale-[101%]
              "
            >
              <div>
                <svg
                  class="h-5 w-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  :class="animateCircle2 ? 'block' : 'hidden'"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              <p v-if="!animateCircle2">
                {{ $t('btn_edit') }}
              </p>
            </button>
          </div>
        </div>
        <section class="flex flex-row justify-center">
          <button
            @click="handleLogout"
            class="
              px-6
              py-3
              bg-p-red
              text-white
              font-medium
              rounded-xl
              md:w-1/5
              hover:bg-red-700
              transform
              transition
              ease-out
              duration-300
            "
          >
            {{ $t('btn_signout') }}
          </button>
        </section>
      </section>
    </div>
  </div>
</template>
