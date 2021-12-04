<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import useFirebase from '../composables/useFirebase'
import { useStore } from '../store/store'

export default defineComponent({
  setup() {
    const { logout } = useFirebase()

    const { store } = useStore()
    const user = computed(() => {
      return store.getters.getUser
    })

    const admin = computed(() => {
      return store.getters.getAdmin
    })

    watch(admin, () => {
      console.log(admin.value)
    })

    const handleLogout = () => {
      logout()
    }

    return {
      handleLogout,
      user,
      admin,
    }
  },

  props: {
    mode: String,
  },
})
</script>

<template>
  <div class="flex flex-row justify-between" v-if="admin">
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
            to="/stock"
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
          >
            Dashboard
          </router-link>
        </div>
      </div>
      <router-link
        v-if="!user"
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
  <div class="flex flex-row justify-between" v-else>
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
          <a
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
            href="#services"
          >
            Services
          </a>
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
          <a
            class="
              cursor-pointer
              px-6
              py-2
              overflow-hidden
              rounded-xl
              hover:bg-red-100
            "
            href="#contact"
          >
            Contact
          </a>
        </div>
      </div>
      <router-link
        v-if="!user"
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
