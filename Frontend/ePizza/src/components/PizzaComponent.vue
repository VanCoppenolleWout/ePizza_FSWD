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
      lg:w-64
      rounded-xl
      bg-white
      h-full
      mx-1
      mb-8
    "
  >
    <img
      src="src\assets\images\pizza-placeholder.png"
      class="w-80 h-40 object-cover rounded-t-xl"
      alt=""
    />
    <div class="p-2 md:p-6 h-24 flex flex-col justify-between">
      <p class="text-lg">{{ 'Margherita' }}</p>
      <div class="flex items-center justify-between">
        <p>
          <span class="text-gray-400 text-xs mr-1">Vanaf</span> {{ '€6.95' }}
        </p>
        <RouterLink :to="'/detail'" class="h-8">
          <svg
            class="bg-p-yellow rounded h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
