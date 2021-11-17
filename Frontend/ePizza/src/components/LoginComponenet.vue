<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  setup() {
    let email: Ref<string | null> = ref(null)
    let password: Ref<string | null> = ref(null)

    let emailError: Ref<string> = ref('')
    let passwordError: Ref<string> = ref('')

    const handleForm = async () => {

    }

    const handleEmpty = async (value: string) => {

    }

    return {
      handleForm,
      handleEmpty,
      email,
      password,
      emailError,
      passwordError,
    }
  },
})
</script>

<template>
  <!-- flex items-center self-center justify-center flex-1 -->
  <div class="h-screen flex items-center self-center justify-center flex-1">
    <div class="bg-white rounded-lg">
      <section class="p-8">
        <h1 class="text-2xl font-semibold text-p-red text-center pb-6">
          Log in
        </h1>
        <div class="flex justify-center space-x-2">
          <p class="text-p-red">No account yet?</p>
          <RouterLink to="/register" class="underline"
            >Register here</RouterLink
          >
        </div>

        <div>
          <label for=""></label>
          <input type="email" name="" id="" />

          <label for=""></label>
          <input type="password" name="" id="" />
        </div>

        <div class="mb-7 flex-1 relative">
          <label class="block mb-1 font-semibold" for="email">Email</label>
          <input
            required
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              border-2
              p-2
              px-4
            "
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            v-model="email"
            @keyup="handleEmpty('email')"
          />
          <div class="text-red-500 absolute mt-1" v-if="emailError">
            This field is required
          </div>
        </div>

        <div class="mb-5">
          <label class="block mb-1 font-semibold" for="password"
            >Password</label
          >
          <input
            required
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              border-2
              p-2
              px-4
            "
            type="password"
            id="password"
            placeholder="●●●●●●●●"
            v-model="password"
            @keyup="handleEmpty('password')"
          />
          <div class="text-red-500 absolute mt-1" v-if="passwordError">
            This field is required
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <div></div>
          <button class="underline">Forgot password?</button>
        </div>

        <button
          class="
            mt-20
            mb-7
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
            class="-ml-7 mr-2 h-5 w-5 text-white inline-block animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          <!-- <div class="w-5 h-5"></div> -->
        </button>
      </section>
    </div>
  </div>
</template>
