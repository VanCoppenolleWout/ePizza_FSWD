<script lang="ts">
import { defineComponent } from 'vue'
import { Order } from '../interfaces/order'
import moment from 'moment'
export default defineComponent({
  setup(context) {
    const { order } = context

    return {
      order,
      moment,
    }
  },

  props: {
    order: { required: true, type: Object as () => Order },
  },
})
</script>

<template>
  <div class="bg-white rounded-lg">
    <div class="p-8 h-full overflow-y-auto scrollbar">
      <div class="flex flex-wrap justify-between mb-6">
        <div class="w-32 lg:w-auto mb-6">
          <h3 class="text-gray-700 text-xl font-semibold mb-2">
            {{ order.address ? $t('order_deliveryto') : $t('order_takeout') }}
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
          <div class="mb-2">
            <h3 class="text-gray-700 text-xl font-semibold mb-2 sm:text-right">
              {{ $t('order_method') }}
            </h3>
            <p class="sm:text-right">{{ order.payment_method }}</p>
          </div>

          <div class="mb-2">
            <h3 class="text-gray-700 text-xl font-semibold mb-2 sm:text-right">
              Date
            </h3>
            <p class="sm:text-right">
              {{ moment(order.delivery_date).format('HH:mm') }}
            </p>
          </div>
        </div>
      </div>
      <div class="">
        <h3 class="text-gray-700 text-xl font-semibold mb-2">
          {{ $t('order_yours') }}
        </h3>
        <div
          v-for="(item, index) in order.pizzaSizeToppings"
          :key="index"
          class="mb-4"
        >
          <div class="flex justify-between">
            <div class="flex mr-2 items-center">
              <div class="hidden sm:block">
                <img
                  class="w-4 transform -rotate-12"
                  src="../assets/images/pizza.svg"
                  alt="pizza"
                />
              </div>
              <div class="sm:flex sm:gap-2">
                <p class="font-bold">{{ item.size.size_name }}</p>
                <p class="font-bold">{{ item.pizza.name }}</p>
              </div>
            </div>
            <p class="flex items-center">
              {{ item.pizza.price + item.size.price }}€
            </p>
          </div>
          <div v-for="(topping, index) in item.toppings" :key="index">
            <div class="sm:ml-6 ml-2 flex justify-between">
              <p>{{ topping.name }}</p>
              <p>{{ topping.price }}€</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between font-medium mt-4">
          <p>{{ $t('basket_total') }}</p>
          <p>{{ order.price }}€</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.scrollbar::-webkit-scrollbar {
  width: 0.25rem;
  background-color: #f5f5f5;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #cacaca;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
</style>
