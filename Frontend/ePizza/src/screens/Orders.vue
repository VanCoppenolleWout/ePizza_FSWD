<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'
import { fetchData } from '../composables/useNetwork'
import OrdersComponent from '../components/admin/OrdersComponent.vue'
import { Order } from '../interfaces/order'
import OrderViewComponent from '../components/admin/OrderViewComponent.vue'

export default defineComponent({
  setup() {
    const { get } = fetchData()
    const filter = ref('all')
    const orders: Ref<Array<Order>> = ref([])

    const getAllOrders = async () => {
      orders.value = await get('/order/all')
    }

    const updateOrders = async (newOrders: Array<Order>) => {
      orders.value = newOrders
    }

    getAllOrders()

    return {
      filter,
      orders,
      updateOrders,
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
  <div class="sm:ml-24 mb-12 md:mb-0 ">
    <div class="sm:p-8 p-4 sm:max-w-[80%] sm:m-auto">
      <h3 class="text-gray-700 text-2xl font-semibold mb-4">{{ $t('order_h1') }}</h3>
      <p class="max-w-6xl text-gray-500 mb-8">
        {{ $t('order_sub') }}
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
            filter === 'all'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="filter = 'all'"
        >
          {{ $t('order_all') }}
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            filter === 'processing'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="filter = 'processing'"
        >
          {{ $t('order_processing') }}
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            filter === 'completed'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="filter = 'completed'"
        >
          {{ $t('order_completed') }}
        </li>
        <li
          class="
            pb-4
            cursor-pointer
            font-semibold
            hover:text-p-red hover:border-p-red hover:border-b-2
          "
          :class="
            filter === 'cancelled'
              ? 'text-p-red border-p-red border-b-2'
              : 'text-gray-500'
          "
          @click="filter = 'cancelled'"
        >
          {{ $t('order_canceled') }}
        </li>
      </ul>

      <OrdersComponent
        v-if="orders.length > 0"
        :orders="orders"
        :filter="filter"
        @updateOrders="updateOrders"
      />

      <div v-else>{{ $t('order_loading') }}</div>
    </div>
  </div>
</template>
