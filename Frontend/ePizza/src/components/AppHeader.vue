<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue'
import useFirebase from '../composables/useFirebase'
import { useStore } from '../store/store'

export default defineComponent({
  setup() {
    const { logout } = useFirebase()
    const { store } = useStore()
    const menuActive: Ref<boolean> = ref(false)

    const user = computed(() => {
      return store.getters.getUser
    })
    console.log()
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
      menuActive,
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
  <div class="relative" v-else>
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
    <!-- <ul class="bg-p-red text-white absolute w-full z-10" > -->
    <transition-group
      class="absolute w-full z-10 md:hidden text-white left-0"
      name="list"
      tag="ul"
      ><li
        class="bg-p-red p-2 rounded-t-md"
        :style="menuActive === true ? '' : 'transition-delay: 0.3s'"
        :key="1"
        v-show="menuActive"
      >
        Menu
      </li>
      <li
        class="bg-p-red p-2"
        :style="
          menuActive === true
            ? 'transition-delay: 0.1s'
            : 'transition-delay: 0.2s'
        "
        :key="2"
        v-show="menuActive"
      >
        Delivery
      </li>
      <li
        class="bg-p-red p-2"
        :style="
          menuActive === true
            ? 'transition-delay: 0.2s'
            : 'transition-delay: 0.1s'
        "
        :key="3"
        v-show="menuActive"
      >
        Carryout
      </li>
      <li
        class="bg-p-red p-2 rounded-b-md"
        :style="menuActive === true ? 'transition-delay: 0.3s' : ''"
        :key="4"
        v-show="menuActive"
      >
        Menu
      </li></transition-group
    >
    <!-- </ul> -->
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
