<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    let delivery = false

    return {
      delivery,
    }
  },
})
</script>

<template>
    <div class="bg-white rounded-lg">
      <section class="p-8 pointer-events-none" style="width: 27rem">
        <div class=" mb-8">
          <h1 class="text-center text-p-red text-2xl font-semibold mb-5">
            Thanks for ordering!
          </h1>
          <p class="text-center">{{ 'Tracking order...' }}</p>
        </div>
        <div class=" space-y-4">
          <div class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold">
            <h2>Preparing pizza</h2>
          </div>
          <div class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold">
            <h2>Pizza is in the oven</h2>
          </div>
          <div class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold">
            <h2>Pizza is baked</h2>
          </div>
          <div
            class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold"
            v-if="delivery"
          >
            <h2>Order is underway</h2>
          </div>
          <div class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold" v-else>
            <h2>Ready at our shop</h2>
          </div>
          <div
            class="px-8 py-6 bg-p-gray-100 rounded-xl font-semibold"
            v-if="delivery"
          >
            <h2>At your door</h2>
          </div>
        </div>
      </section>
    </div>
</template>
