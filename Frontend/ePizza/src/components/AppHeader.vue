<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div class="flex flex-row justify-between">
    <h1 class="cursor-pointer font-bold text-3xl text-red-500">ePizza</h1>
    <div class="hidden md:flex flex-row justify-between space-x-8 font-medium">
      <div
        class="
          flex flex-row
          justify-between
          space-x-2
          items-center
          text-red-600
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

      <div
        class="
          bg-red-500
          text-white
          px-6
          py-2
          cursor-pointer
          rounded-xl
          font-medium
        "
      >
        Log in
      </div>
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
