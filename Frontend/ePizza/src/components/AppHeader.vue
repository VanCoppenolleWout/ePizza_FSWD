<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import useFirebase from '../composables/useFirebase'

export default defineComponent({
  setup() {
    const auth = getAuth()
    const { logout } = useFirebase()

    let userbtn = ref<boolean>(false)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user logged in in header')
        userbtn.value = true
      } else {
        console.log('user logged out in header')
        userbtn.value = false
      }
    })

    const handleLogout = () => {
      logout()
    }

    return {
      userbtn,
      handleLogout,
    }
  },

  props: {
    mode: String,
  },
})
</script>

<template>
  <div class="flex flex-row justify-between">
    <router-link to="/" class="cursor-pointer font-bold text-3xl text-p-red"
      >ePizza</router-link
    >
    <div class="hidden md:flex flex-row justify-between space-x-8 font-medium">
      <div v-if="mode === 'full'">
        <div
          class="
            flex flex-row
            justify-between
            space-x-2
            items-center
            text-p-red
          "
        >
          <router-link
            to="/services"
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
          >
            Services
          </router-link>
          <router-link
            to="/menu"
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
          >
            Menu
          </router-link>
          <router-link
            to="/contact"
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
          >
            Contact
          </router-link>
        </div>
      </div>
      <router-link
        v-if="userbtn === false"
        to="/login"
        class="
          bg-p-red
          text-white
          px-6
          py-2
          cursor-pointer
          rounded-xl
          font-medium
        "
      >
        Log in
      </router-link>
      <router-link
        v-else
        to="/"
        @click="handleLogout"
        class="
          bg-p-red
          text-white
          px-6
          py-2
          cursor-pointer
          rounded-xl
          font-medium
        "
      >
        Log out
      </router-link>
    </div>

    <div class="md:hidden">
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
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
  </div>
</template>
