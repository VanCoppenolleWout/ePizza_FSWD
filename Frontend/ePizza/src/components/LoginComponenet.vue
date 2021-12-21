<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { LoginUser } from '../interfaces/login'
import useFirebase from '../composables/useFirebase'
import InputComponent from './InputComponent.vue'
import { store } from '../store/store'

export default defineComponent({
  setup() {
    const { login } = useFirebase()

    const admin = computed(() => {
      return store.getters.getAdmin
    })

    let email: Ref<string> = ref('')
    let password: Ref<string> = ref('')

    const router: Router = useRouter()

    let animateCircle: Ref<boolean> = ref(false)
    let errorMsg: Ref<string> = ref('')

    const handleForm = async () => {
      animateCircle.value = true

      if (
        email.value === null ||
        password.value === null ||
        email.value === '' ||
        password.value === ''
      ) {
        errorMsg.value = 'Please fill in all fields'
        animateCircle.value = false
      } else {
        //request to backend if fields are filled in
        errorMsg.value = ''
        let user: LoginUser = {
          email: email.value,
          password: password.value,
        }

        if (user.email && user.password) {
          try {
            login(user.email, user.password).then((response: any) => {
              if (response === true) {
                animateCircle.value = false
                if (admin) {
                  router.push('/orders')
                } else {
                  router.push('/')
                }
              } else {
                animateCircle.value = false
                errorMsg.value = 'Failed to login'
              }
            })
          } catch (error) {
            errorMsg.value = 'Failed to login'
            animateCircle.value = false
          }
        }
      }
    }

    return {
      handleForm,
      animateCircle,
      errorMsg,
      email,
      password,
    }
  },
  components: {
    InputComponent,
  },
})
</script>

<template>
  <div class="h-screen flex items-center self-center justify-center flex-1">
    <div class="bg-white rounded-lg max-w-md w-full">
      <section class="p-8">
        <div class="flex justify-between items-center mb-6">
          <div class="w-6"></div>
          <h1 class="text-2xl font-semibold text-p-red">Log in</h1>
          <router-link
            to="/"
            class="transform rotate-45 border-2 rounded-full p-1"
          >
            <svg
              class="
                stroke-current
                text-gray-400
                cursor-pointer
                hover:text-gray-700
              "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </router-link>
        </div>
        <div class="flex justify-center space-x-2">
          <p class="text-p-red">{{ $t('login_sub') }}</p>
          <RouterLink to="/register" class="underline">{{
            $t('login_sub2')
          }}</RouterLink>
        </div>
        <form @submit.prevent="handleForm" class="mt-10">
          <div class="mb-7 flex-1 relative">
            <InputComponent
              id="email"
              placeholder="john.doe@mail.com"
              type="email"
              label="Email"
              class="w-full"
              v-model="email"
            />
            <InputComponent
              id="password"
              placeholder="●●●●●●●"
              type="password"
              :label="$t('account_password')"
              :full="true"
              v-model="password"
            />
          </div>

          <div class="flex flex-row justify-between">
            <div></div>
            <router-link to="/forgotpassword" class="underline">{{
              $t('login_sub3')
            }}</router-link>
          </div>

          <div class="mt-20 mb-7">
            <div
              class="text-red-500 flex justify-center text-center -mt-8 mb-2"
              v-if="errorMsg"
            >
              {{ errorMsg }}
            </div>

            <button
              class="
                cursor-pointer
                w-full
                text-white
                bg-p-red
                hover:bg-red-600
                p-2
                font-bold
                rounded-md
                flex
                justify-center
                items-center
              "
              type="submit"
            >
              <svg
                class="-ml-7 mr-2 h-5 w-5 text-white animate-spin"
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

              <p class="">Log in</p>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
