<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'
import Map from '../components/Map.vue'
import { fetchData } from '../composables/useNetwork'
import OrdersComponent from '../components/admin/OrdersComponent.vue'
import { Order } from '../interfaces/order'
import OrderViewComponent from '../components/admin/OrderViewComponent.vue'

export default defineComponent({
  setup() {
    const { get } = fetchData()
    const status = ref('all')
    const orders: Ref<Array<Order>> = ref([])

    const getAllOrders = async () => {
      orders.value = await get('/order/all')
      console.log(orders.value)
    }
    getAllOrders()

    return {
      status,
      orders,
    }
  },
  components: {
    AppHeader,
    TrackerComponent,
    OrderComponent,
    Map,
    OrdersComponent,
    OrderViewComponent,
  },
})
</script>

<template>
  <div class="sm:ml-24">
    <div class="sm:p-8 p-4">
      <h3 class="text-gray-700 text-2xl font-semibold mb-4">Order details</h3>
      <p class="max-w-6xl text-gray-500 mb-16">
        In the order details section, you can review and manage all orders with
        their details.
      </p>

      <ul class="flex flex-wrap sm:flex-row gap-8 mb-8">
        <li
          class="
            pb-4
            font-semibold
            cursor-pointer
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            status === 'all'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="status = 'all'"
        >
          All orders
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            status === 'processing'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="status = 'processing'"
        >
          Processing
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            status === 'completed'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="status = 'completed'"
        >
          Completed
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            status === 'cancelled'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="status = 'cancelled'"
        >
          Canceled
        </li>
      </ul>

      <OrdersComponent v-if="orders" :orders="orders" />
      <div v-else>Loading orders...</div>

      <OrderViewComponent />

      <!-- <Map /> -->
    </div>
  </div>
</template>
