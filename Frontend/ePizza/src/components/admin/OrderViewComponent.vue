<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'
import moment from 'moment'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    const orders: any = ref([])

    const getAllOrders = async () => {
      orders.value = await get('/order/all')
    }
    getAllOrders()

    const filter = async () => {
      console.log('filter by date')
    }

    return {
      orders,
      filter,
      moment,
    }
  },
})
</script>

<template>
  <div class="bg-white rounded-lg p-8 overflow-scroll md:h-order">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-p-red text-2xl font-semibold mb-4">Orders</h1>
      <div v-if="orders.length > 0" class="flex flex-row items-center space-x-2">
        <p>Date</p>
        <button @click="filter()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transform active:rotate-180"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
    <section v-if="orders.length > 0" class="space-y-6">
      <div
        v-for="(item, index) in orders"
        :key="index"
        class="
          bg-p-gray-100
          p-4
          rounded-lg
          transform
          hover:scale-105
          transition
          ease-out
          duration-300
        "
      >
        <div class="flex flex-row justify-between items-center">
          <p class="font-medium">{{ '#1' }}</p>
          <p class="text-sm font-medium">
            {{ moment(item.order_date).format('DD/MM - hh:mm a') }}
          </p>
        </div>
        <p class="mt-4 mb-2 font-semibold text-lg">
          {{ item.user.name }} {{ item.user.lastname }}
        </p>
        <div v-for="(i, indx) in item.pizzaSizeToppings" :key="indx" class="">
          <div class="flex flex-row justify-between">
            <p class="mt-2">1 x Pizza {{ i.pizza.name }}</p>
            <p>€ {{ i.pizza.price }}</p>
          </div>
          <p class="text-sm">{{ i.size.size_name }}</p>
        </div>
      </div>
    </section>
    <section v-else class="flex items-center self-center justify-center flex-1 mt-12">
      <p class="font-medium text-sm">No orders yet.</p>
    </section>
  </div>
</template>
