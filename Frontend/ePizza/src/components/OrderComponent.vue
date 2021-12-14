<script lang="ts">
import { defineComponent } from 'vue'
import { Order } from '../interfaces/order'

export default defineComponent({
  setup(context) {
    const pizzaArr: Array<string> = ['f', 'f', 'f', '', '', '']

    const { order } = context

    return {
      pizzaArr,
      order,
    }
  },

  props: {
    order: { required: true, type: Object as () => Order },
  },
})
</script>

<template>
  <div class="bg-white rounded-lg">
    <div class="p-8 h-full overflow-y-auto">
      <div class="flex flex-wrap justify-between mb-6">
        <div class="w-32 lg:w-auto mb-6">
          <h3 class="text-gray-700 text-xl font-semibold mb-2">
            {{ order.address ? 'Delivery to' : 'Take out address' }}
          </h3>
          <div v-if="order.address">
            <p>{{ order.address.street }}, {{ order.address.number }}</p>
            <p>{{ order.address.postal_code }}, {{ order.address.city }}</p>
          </div>
          <div v-else>
            <p>Graaf Karel de Goedelaan 32</p>
            <p>8500, Kortrijk</p>
            <p>055 80 84 20</p>
          </div>
        </div>
        <div class="w-28 lg:w-auto">
          <h3 class="text-gray-700 text-xl font-semibold mb-2 sm:text-right">
            Payment method
          </h3>
          <p class="sm:text-right">Bancontact App</p>
        </div>
      </div>
      <div class="">
        <h3 class="text-gray-700 text-xl font-semibold mb-2">Your order</h3>
        <div v-for="(item, index) in order.pizzaSizeToppings" :key="index">
          <div class="flex justify-between mb-2">
            <div class="flex mr-2">
              <!-- <p class="mr-2">{{ '1' }} x</p> -->
              <p>{{ item.size.size_name }} {{ item.pizza.name }}</p>
            </div>
            <p class="flex items-center">{{ item.pizza.price }}€</p>
          </div>
        </div>
        <div class="flex justify-between font-medium">
          <p>Total</p>
          <p>{{ order.price }}€</p>
        </div>
      </div>
    </div>
  </div>
</template>
