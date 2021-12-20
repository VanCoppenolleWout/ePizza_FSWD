<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div
    class="
      bg-white
      max-w-2xl
      rounded-sm
      shadow-md
      hover:shadow-lg
      p-4
      h-full
      max-h-96
      flex
      mb-4
    "
  >
    <div class="flex h-full items-start">
      <div class="bg-gray-400 w-12 h-12 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
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
      </div>
    </div>
    <div class="ml-8 flex-1">
      <div class="bg-gray-200 animate-pulse h-6 w-36 mb-2"></div>
      <div class="flex gap-2 -ml-1 mb-4">
        <svg
          class="animate-pulse"
          v-for="index in 5"
          :key="index"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#E5E7EB"
          stroke="#E5E7EB"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
      </div>

      <div>
        <div class="bg-gray-200 animate-pulse h-6 w-36 mb-1"></div>

        <div class="bg-gray-200 animate-pulse h-6 max-w-sm w-full mb-2"></div>
        <p></p>
      </div>
    </div>
  </div>
</template>
