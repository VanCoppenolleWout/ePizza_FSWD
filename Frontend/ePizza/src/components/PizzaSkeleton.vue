<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div
    class="
      max-w-pizzaComponent
      md:w-56
      xl:w-64
      rounded-xl
      bg-white
      h-full
      w-full
    "
  >
    <div
      class="
        h-40
        max-w-pizzaComponent
        md:w-56
        xl:w-64
        object-cover
        rounded-t-xl
        bg-gray-200
        animate-pulse
      "
    ></div>

    <div class="p-2 md:p-6 h-24">
      <div class="h-6 w-full md:w-32 bg-gray-200 animate-pulse mb-2"></div>
      <div class="flex items-center justify-between">
        <div class="md:w-32 h-6 bg-gray-200 animate-pulse"></div>

        <div class="w-8 h-8 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
