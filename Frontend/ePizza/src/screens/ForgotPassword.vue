<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import useFirebase from '../composables/useFirebase'
import InputComponent from '../components/InputComponent.vue'

export default defineComponent({
  setup() {
    const { resetPassword } = useFirebase()

    let email: Ref<string> = ref('')

    let animateCircle: Ref<boolean> = ref(false)
    let errorMsg: Ref<string> = ref('')

    const handleForm = async () => {
      animateCircle.value = true

      if (email.value === null || email.value === '') {
        errorMsg.value = 'Please fill in all fields'
        animateCircle.value = false
      } else {
        errorMsg.value = ''
        const res = await resetPassword(email.value)
        res === false ? (errorMsg.value = 'Oops something went wrong') : null
        animateCircle.value = false
      }
    }

    return {
      handleForm,
      animateCircle,
      errorMsg,
      email,
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
          <routerLink to="/login">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </routerLink>
          <h1 class="text-2xl font-semibold text-p-red">🧠 {{ $t('forgot_h1') }}</h1>
          <div class="w-8"></div>
        </div>
        <div class="flex justify-center space-x-2">
          <p class=" text-center">
            {{ $t('forgot_sub') }}
          </p>
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

              <p class="">{{ $t('btn_forgot') }}</p>
            </button>
          </div>
        </form>
      </section>
      <!-- <router-link
        to="/login"
        class="
          bg-gray-300
          text-white
          -mt-8
          h-14
          flex
          justify-center
          items-center
          rounded-b-md
          hover:bg-red-600
          cursor-pointer
          font-bold
        "
      >
        <svg
          class="mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <p class="">Return to login</p>
      </router-link> -->
    </div>
  </div>
</template>
