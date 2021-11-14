<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    // const items = ref<any>();
    const items: any = localStorage.getItem('items')
    console.log(items, 'items')

    return {
      items,
    }
  },
  mounted() {
    // const items = ref<any>();
    const items: any = localStorage.getItem('items')

    return {
      items,
    }
  },
})
</script>

<template>
  <div class="w-96 bg-white rounded-lg">
    <div class="p-8">
      <div class="flex flex-col justify-between">
        <h1 class="text-3xl font-bold text-p-gray-300 mb-10">Basket</h1>
        <div v-if="items !== null">
          <p>Place an order.</p>
        </div>
        <!-- v-for="i of items" :key="i.id" -->
        <div v-else>
          <div class="flex flex-row justify-between items-center">
            <h2 class="font-medium text-xl">{{ 'Margherita' }}</h2>
            <p class="font-medium">€ 13,50</p>
          </div>
          <p class="pt-1">{{ 'Large pan' }}</p>
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center space-x-4 pt-2">
              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="block m-auto"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
              <p>{{ '1' }}</p>
              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
              >
                <svg
                  class="block m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>
            <div class="space-x-6">
              <button class="hover:underline hover:text-p-red">Change</button>
              <button class="hover:underline hover:text-p-red">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <footer v-if="items === null" class="mt-10">
        <div class="flex flex-row justify-between items-center">
          <h2 class="text-xl font-semibold">Total</h2>
          <p class="text-xl font-medium text-p-gray-300">€{{ ' 13,50' }}</p>
        </div>

        <button
          class="bg-p-red w-full rounded-md text-white font-semibold py-3 mt-8"
        >
          Order (€ {{ ' 13,50' }})
        </button>
      </footer>
    </div>
  </div>
</template>
