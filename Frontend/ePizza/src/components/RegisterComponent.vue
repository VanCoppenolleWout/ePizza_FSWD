<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  setup() {
    let name: Ref<string | null> = ref(null)
    let surname: Ref<string | null> = ref(null)
    let email: Ref<string | null> = ref(null)
    let telephone: Ref<string | null> = ref(null)
    let password: Ref<string | null> = ref(null)
    let confirmPassword: Ref<string | null> = ref(null)
    let animateCircle: Ref<boolean> = ref(false)

    //
    let nameError: Ref<string> = ref('')
    let surnameError: Ref<string> = ref('')
    let emailError: Ref<string> = ref('')
    let telephoneError: Ref<string> = ref('')
    let passwordError: Ref<string> = ref('')
    let confirmPasswordError: Ref<string> = ref('')
    let errorMsg: Ref<string> = ref('')

    const handleForm = () => {
      animateCircle.value = true
      if (
        name === null ||
        surname.value === null ||
        email.value === null ||
        telephone.value === null ||
        password.value === null ||
        confirmPassword === null
      ) {
        // animate.value = false
        errorMsg.value = 'Please fill in all fields'
        // animateCircle.value = false
      }
    }

    const handleEmpty = (value: string) => {
      if (value === 'name') {
        name.value === ''
          ? (nameError.value = 'This field is required')
          : (nameError.value = '')
      }
      if (value === 'surname') {
        surname.value === ''
          ? (surnameError.value = 'This field is required')
          : (surnameError.value = '')
      }
      if (value === 'email') {
        email.value === ''
          ? (emailError.value = 'This field is required')
          : (emailError.value = '')
      }
      if (value === 'telephone') {
        telephone.value === ''
          ? (telephoneError.value = 'This field is required')
          : (telephoneError.value = '')
      }
      if (value === 'password') {
        password.value === ''
          ? (passwordError.value = 'This field is required')
          : (passwordError.value = '')
      }
      if (value === 'confirmPassword') {
        confirmPassword.value === ''
          ? (confirmPasswordError.value = 'This field is required')
          : (confirmPasswordError.value = '')
      }
    }

    return {
      handleForm,
      handleEmpty,
      name,
      surname,
      email,
      telephone,
      password,
      nameError,
      confirmPassword,
      surnameError,
      emailError,
      telephoneError,
      passwordError,
      confirmPasswordError,
      errorMsg,
      animateCircle,
    }
  },
})
</script>

<template>
  <div class="mb-9 relative">
    <!-- <img
      class="
        absolute
        hidden
        md:block
        w-96
        lg:w-input
        pointer-events-none
        transition-all
        ease-in
        duration-300
        right-0
        top-1/2
        transform
        -translate-y-1/2
      "
      src="../assets/images/pizza-bg.png"
      alt=""
    /> -->
    <img
      class="
        absolute
        hidden
        md:block
        w-96
        lg:w-input
        pointer-events-none
        transition-all
        ease-in
        duration-300
        left-16
        top-1/2
        transform
        -translate-y-1/2
      "
      src="../assets/images/pizza-bg.png"
      alt=""
    />
    <form
      @submit.prevent="handleForm"
      class="
        w-full
        max-w-3xl
        bg-white
        relative
        p-4
        md:p-10
        shadow-md
        rounded-md
      "
    >
      <div class="flex items-center mb-10">
        <routerLink to="/">
          <svg
            class="inline-block cursor-pointer"
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
            <path d="M19 12H6M12 5l-7 7 7 7" /></svg
        ></routerLink>

        <h3
          class="
            mx-auto
            text-2xl
            sm:text-3xl
            text-red-500
            font-semibold
            text-center
          "
        >
          Create an Account
        </h3>
        <div class="w-8"></div>
      </div>

      <div class="md:flex justify-between">
        <div class="mb-7 relative">
          <label class="block mb-1 font-semibold" for="name">Name</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              md:w-72 md:max-w-xs
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="text"
            id="name"
            placeholder="John"
            v-model="name"
            @keyup="handleEmpty('name')"
          />
          <div class="text-red-500 absolute mt-1" v-if="nameError">
            This field is required
          </div>
        </div>
        <div class="mb-7 relative">
          <label class="block mb-1 font-semibold" for="surname">Surname</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              md:w-72 md:max-w-xs
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="text"
            id="surname"
            placeholder="Doe"
            v-model="surname"
            @keyup="handleEmpty('surname')"
          />
          <div class="text-red-500 absolute mt-1" v-if="surnameError">
            This field is required
          </div>
        </div>
      </div>

      <div class="md:flex justify-between">
        <div class="mb-7 flex-1 relative">
          <label class="block mb-1 font-semibold" for="email">Email</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              border-2
              p-2
              px-4
              max-w-md
              md:max-w-sm
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

        <div class="mb-5 md:ml-8">
          <label class="block mb-1 font-semibold" for="telephone"
            >Telephone</label
          >
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              lg:w-72
              border-2
              p-2
              px-4
            "
            type="tel"
            id="telephone"
            placeholder="+32 496 05 43 89"
            v-model="telephone"
            @keyup="handleEmpty('telephone')"
          />
          <div class="text-red-500 absolute mt-1" v-if="telephoneError">
            This field is required
          </div>
        </div>
      </div>

      <div class="md:flex justify-between md:mb-44 mb-20">
        <div class="mb-5 relative">
          <label class="block mb-1 font-semibold" for="password"
            >Password</label
          >
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              md:w-72 md:max-w-xs
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="password"
            id="password"
            placeholder="●●●●●●●●"
            autocomplete="on"
            v-model="password"
            @keyup="handleEmpty('password')"
          />
          <div class="text-red-500 absolute mt-2" v-if="passwordError">
            This field is required
          </div>
        </div>
        <div class="relative">
          <label class="block mb-1 font-semibold" for="confirm"
            >Confirm password</label
          >
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-md
              md:w-72 md:max-w-xs
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="password"
            id="confirm"
            placeholder="●●●●●●●●"
            autocomplete="on"
            v-model="confirmPassword"
            @keyup="handleEmpty('confirmPassword')"
          />
          <div
            class="mb-2 text-red-500 absolute mt-2"
            v-if="confirmPasswordError"
          >
            This field is required
          </div>
        </div>
      </div>
      <div class="mb-2 text-red-500 flex justify-center -mt-8" v-if="errorMsg">
        {{ errorMsg }}
      </div>

      <div class="flex justify-center">
        <button
          class="
            cursor-pointer
            max-w-sm
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
            v-if="animateCircle"
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
          <p class="">Register</p>
          <!-- <div class="w-5 h-5"></div> -->
        </button>
      </div>
    </form>
  </div>
</template>

<style>
input[type='password']:not(:placeholder-shown) {
  /* letter-spacing: 0.125rem; */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  line-height: 24px;
}
</style>
