<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const pizzaArr: Array<string> = ['f', 'f', 'f', '', '', '']

    return {
      pizzaArr,
    }
  },
})
</script>

<template>
  <div class="bg-white rounded-lg mb-6">
    <div class="p-8 h-full overflow-y-auto">
      <div class="flex flex-wrap justify-between mb-6">
        <div class="w-32 lg:w-auto mb-6">
          <h3 class="text-gray-700 text-xl font-semibold mb-2">
            Take out address
          </h3>
          <p>Graaf Karel de Goedelaan 32</p>
          <p>8500, Kortrijk</p>
          <p>055 80 84 20</p>
        </div>
        <div class="w-28 lg:w-auto">
          <h3 class="text-gray-700 text-xl font-semibold mb-2 text-right">
            Payment method
          </h3>
          <p class="text-right">Bancontact App</p>
        </div>
      </div>
      <div class="">
        <h3 class="text-gray-700 text-xl font-semibold mb-2">Your order</h3>
        <div v-for="(pizza, index) in pizzaArr" :key="index">
          <div class="flex justify-between mb-2">
            <div class="flex mr-2">
              <p class="mr-2">{{ '1' }} x</p>
              <p>Pizza Pepperoni</p>
            </div>
            <p class="flex items-center">{{ '9' }}€</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
