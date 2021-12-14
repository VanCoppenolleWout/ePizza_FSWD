<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store/store'

export default defineComponent({
  setup() {
    const { store } = useStore()
    const menuActive: Ref<boolean> = ref(false)
    const router = useRouter()

    const username = ref<string>('')

    const user = computed(() => {
      return store.getters.getUser
    })

    const admin = computed(() => {
      return store.getters.getAdmin
    })

    const decideName = () => {
      if (user.value !== null && !admin.value) {
        username.value = user.value.displayName
      } else username.value = 'Administrator'
    }

    const handleDelivery = () => {
      localStorage.setItem('delivery', 'true')
      router.push('/menu')
    }

    const handleCarryout = () => {
      localStorage.setItem('delivery', 'false')
      router.push('/menu')
    }
    decideName()

    return {
      user,
      admin,
      username,
      menuActive,
      handleDelivery,
      handleCarryout,
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
        to="/account"
        class="
          text-white
          px-6
          py-2
          cursor-pointer
          rounded-xl
          font-medium
          flex flex-row
          items-center
          space-x-3
        "
        style="background-color: #0071ff"
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <p>{{ username }}</p>
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
  <div class="" v-else>
    <div class="flex flex-row justify-between items-center">
      <router-link to="/" class="cursor-pointer font-bold text-3xl text-p-red"
        >ePizza</router-link
      >
      <div
        class="hidden md:flex flex-row justify-between space-x-8 font-medium"
      >
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
          to="/account"
          class="
            text-white
            px-6
            py-2
            cursor-pointer
            rounded-xl
            font-medium
            flex flex-row
            items-center
            space-x-3
          "
          style="background-color: #0071ff"
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <p>{{ username }}</p>
        </router-link>
      </div>

      <div class="md:hidden cursor-pointer" @click="menuActive = !menuActive">
        <svg
          class="w-11 rounded-md bg-p-red"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </div>
    <transition-group
      class="absolute left-0 right-0 w-full z-10 md:hidden"
      name="list"
      tag="ul"
    >
      <div
        to="/"
        class="p-4 bg-red-400 text-lg text-white left-0 shadow-lg h-16"
        :style="menuActive === true ? '' : 'transition-delay: 0.3s'"
        :key="1"
        v-show="menuActive"
      >
        <router-link
          to="/"
          class="flex items-center justify-center gap-2"
          @click="menuActive = !menuActive"
        >
          <div>
            <img
              class="w-8"
              src="../assets/images/pizza-bg.png"
              alt="pizza logo"
            />
          </div>
          <p class="text-lg font-bold">ePizza</p>
        </router-link>
      </div>

      <li
        class="
          items-center
          h-16
          p-4
          bg-red-400
          font-bold
          text-white
          left-0
          shadow-lg
          flex
          justify-center
        "
        :style="
          menuActive === true
            ? 'transition-delay: 0.1s'
            : 'transition-delay: 0.2s'
        "
        :key="3"
        v-show="menuActive"
        @click="
          () => {
            handleDelivery()
            menuActive = !menuActive
          }
        "
      >
        Delivery
      </li>
      <li
        class="
          items-center
          p-4
          h-16
          bg-red-400
          font-bold
          text-white
          left-0
          shadow-lg
          flex
          justify-center
        "
        :style="
          menuActive === true
            ? 'transition-delay: 0.2s'
            : 'transition-delay: 0.1s'
        "
        :key="4"
        v-show="menuActive"
        @click="
          () => {
            handleCarryout()
            menuActive = !menuActive
          }
        "
      >
        Carryout
      </li>
      <li
        class="
          p-4
          h-16
          bg-red-400
          font-bold
          text-white
          left-0
          shadow-lg
          flex
          justify-center
          items-center
        "
        :style="menuActive === true ? 'transition-delay: 0.3s' : ''"
        :key="5"
        v-show="menuActive"
        @click="menuActive = !menuActive"
      >
        <router-link to="/menu"> Menu </router-link>
      </li></transition-group
    >
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
