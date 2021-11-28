<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { LoginUser } from '../interfaces/login'
import useFirebase from '../composables/useFirebase'
import InputComponent from './InputComponent.vue'

export default defineComponent({
  setup() {
    const { login } = useFirebase()

    let email: Ref<string> = ref('')
    let password: Ref<string> = ref('')

    const router: Router = useRouter()

    let animateCircle: Ref<boolean> = ref(false)
    let errorMsg: Ref<string> = ref('')

    const handleForm = async () => {
      console.log(email.value, password.value)
      animateCircle.value = true

       login('glenntroncquo1@gmail.com', 'Glenn20062001').then((succes: boolean) => {
            if (succes) {
              animateCircle.value = false
              router.push('/')
            } else {
              animateCircle.value = false
              errorMsg.value = 'failed'
            }
          })

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
          login(user.email, user.password).then((succes: boolean) => {
            if (succes) {
              animateCircle.value = false
              router.push('/')
            } else {
              animateCircle.value = false
              errorMsg.value = 'failed'
            }
          })
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
  <!-- flex items-center self-center justify-center flex-1 -->
  <div class="h-screen flex items-center self-center justify-center flex-1">
    <div class="bg-white rounded-lg">
      <section class="p-8" style="width: 27rem">
        <h1 class="text-2xl font-semibold text-p-red text-center pb-6">
          Log in
        </h1>
        <div class="flex justify-center space-x-2">
          <p class="text-p-red">No account yet?</p>
          <RouterLink to="/register" class="underline"
            >Register here</RouterLink
          >
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
              placeholder="●●●●●●●●"
              type="password"
              label="password"
              :full="true"
              v-model="password"
            />
          </div>

          <div class="flex flex-row justify-between">
            <div></div>
            <button class="underline">Forgot password?</button>
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
