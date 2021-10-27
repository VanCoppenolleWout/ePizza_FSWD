<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div class="flex flex-row justify-between">
    <h1 class="cursor-pointer font-bold text-3xl text-gray-600">ePizza</h1>
    <div class="flex flex-row justify-between space-x-8 font-medium">
      <div
        class="
          flex flex-row
          justify-between
          space-x-2
          items-center
          text-red-600
          
        "
      >
        <p
          class="
            cursor-pointer
            px-6
            py-2
            overflow-hidden
            rounded-xl
            hover:bg-red-100
            hover:text-red-900
          "
        >
          Why ePizza?
        </p>
        <p
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
        </p>
        <p
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
        </p>
        <p
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
        </p>
      </div>

      <button class="bg-red-500 text-white px-6 py-2 cursor-pointer rounded-xl font-medium">
        Log in
      </button>
    </div>
  </div>
</template>
