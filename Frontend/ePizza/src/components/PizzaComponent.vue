<script lang="ts">
import { defineComponent } from 'vue'
import router from '../bootstrap/router'

export default defineComponent({
  setup() {
  },
  props: {
    id: String,
    name: String,
    img_url: String,
    price: { type: Number, required: true },
    stock: Number,
  },
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
      h-64
      md:h-64
      flex flex-col
    "
  >
    <img
      :src="img_url"
      class="w-80 h-40 object-cover rounded-t-xl"
      :alt="name"
    />
    <div class="p-2 flex flex-col justify-around h-full">
      <p class="text-base">{{ name }}</p>
      <div class="flex items-center justify-between">
        <p>
          <span class="text-gray-400 text-xs mr-1">Vanaf</span>
          {{ `€${price.toFixed(2)}` }}
        </p>
        <RouterLink :to="`/${id}/detail`" class="h-8">
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
