<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div
    class="
      bg-red-500
      mt-6
      max-w-lg
      w-4/5
      flex
      justify-center
      absolute
      left-1/2
      transform
      -translate-x-1/2
      rounded-md
      text-white
      font-bold
      text-center
      p-2
      items-center
    "
  >
    <div class="w-6"></div>
    <p>Succesfully registered, confirm your email to finish registration</p>
    <div>
      <svg
        class="transform rotate-45 cursor-pointer"
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
  </div>
</template>
