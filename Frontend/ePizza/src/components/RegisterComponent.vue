<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import useFirebase from '../composables/useFirebase'
import { User } from '../interfaces/user'
import { signUp } from '../utils/network'
import InputComponent from './InputComponent.vue'

export default defineComponent({
  setup(context) {
    let name: Ref<string> = ref('')
    let lastname: Ref<string> = ref('')
    let email: Ref<string> = ref('')
    let phone_nr: Ref<string> = ref('')
    let password: Ref<string> = ref('')
    let confirmPassword: Ref<string> = ref('')

    let animateCircle: Ref<boolean> = ref(false)
    const router: Router = useRouter()

    let errorMsg: Ref<string> = ref('')

    const handleForm = async () => {
      animateCircle.value = true

      if (
        name.value === null ||
        lastname.value === null ||
        email.value === null ||
        phone_nr.value === null ||
        password.value === null ||
        confirmPassword.value === null ||
        name.value === '' ||
        lastname.value === '' ||
        email.value === '' ||
        phone_nr.value === '' ||
        password.value === '' ||
        confirmPassword.value === ''
      ) {
        errorMsg.value = 'Please fill in all fields'
        animateCircle.value = false
      } else if (password.value !== confirmPassword.value) {
        animateCircle.value = false
        errorMsg.value = 'Password values do not match'
      } else {
        //request to backend if fields are filled in
        errorMsg.value = ''
        let user: User = {
          name: name.value,
          lastname: lastname.value,
          email: email.value,
          phone_nr: phone_nr.value,
          password: password.value,
        }
        let register = await signUp('user/signup', user)
        //Registered succesfully ? -> back to home
        if (register.token) {
          animateCircle.value = false

          const { loginId } = useFirebase()

          await loginId(register.token)

          router.push({ name: 'home', params: { userCreated: 1 } })
        } else {
          errorMsg.value = register.message
          animateCircle.value = false
        }
      }
    }

    return {
      handleForm,
      errorMsg,
      animateCircle,
      name,
      lastname,
      email,
      phone_nr,
      password,
      confirmPassword,
    }
  },
  components: { InputComponent },
  props: {
    callMe: {
      type: Function,
    },
  },
})
</script>

<template>
  <div class="mb-9 relative">
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
        left-0
        xl:left-16
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
        <InputComponent
          id="name"
          placeholder="John"
          type="text"
          label="Name"
          v-model="name"
        />
        <InputComponent
          id="lastname"
          placeholder="Doe"
          type="text"
          label="lastname"
          v-model="lastname"
        />
      </div>

      <div class="md:flex justify-between">
        <InputComponent
          id="email"
          placeholder="johndoe@gmail.com"
          type="email"
          label="Email"
          v-model="email"
        />
        <InputComponent
          id="phone_nr"
          placeholder="0496 05 43 89"
          type="text"
          label="Phone number"
          v-model="phone_nr"
        />
      </div>

      <div class="md:flex justify-between">
        <InputComponent
          id="password"
          placeholder="●●●●●●●●"
          type="password"
          label="Password"
          v-model="password"
        />
        <InputComponent
          id="confirm"
          placeholder="●●●●●●●●"
          type="password"
          label="Confirm password"
          v-model="confirmPassword"
        />
      </div>

      <div class="mt-32">
        <div
          class="mb-2 text-red-500 flex justify-center -mt-8 text-center error"
          v-if="errorMsg"
        >
          {{ errorMsg }}
        </div>

        <div class="flex justify-center">
          <button
            class="
              button
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
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
input[type='password']:not(:placeholder-shown) {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  line-height: 24px;
}
</style>
