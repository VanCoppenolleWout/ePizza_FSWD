<script lang="ts">
import { computed, defineComponent, Ref, ref, toRef, toRefs } from 'vue'
import { Order } from '../../interfaces/order'

import { useRouter } from 'vue-router'
import { fetchData } from '../../composables/useNetwork'
import { getAuth } from 'firebase/auth'
import OrdersTable from './OrdersTable.vue'

export default defineComponent({
  setup(context, { emit }) {
    const router = useRouter()
    const { put } = fetchData()
    const { orders } = toRefs(context)

    const completedOrders = computed(() =>
      orders.value.filter((order) => order.status === 'completed'),
    )
    const processingOrders = computed(() =>
      orders.value.filter((order) => order.status === 'processing'),
    )
    const cancelledOrders = computed(() =>
      orders.value.filter((order) => order.status === 'cancelled'),
    )

    const selectedOrder: Ref<Order | null> = ref(null)
    const activeStatus: Ref<string> = ref('')
    const animateCircle: Ref<Boolean> = ref(false)

    const handleDetail = (order: Order) => {
      router.push({
        name: 'orders/detail',
        params: {
          order: JSON.stringify(order),
        },
      })
    }

    const handleStatus = (order: Order) => {
      selectedOrder.value = order
      activeStatus.value = order.status!
    }

    const handleOk = async () => {
      try {
        animateCircle.value = true
        const body = {
          order_id: selectedOrder.value?.order_id,
          status: activeStatus.value,
        }
        const auth = getAuth()
        const newOrders = await put(
          '/order/status',
          body,
          await auth.currentUser?.getIdToken(),
        )
        emit('updateOrders', newOrders)
        animateCircle.value = false
        selectedOrder.value = null
      } catch (error) {
        animateCircle.value = false
        selectedOrder.value = null
      }
    }

    return {
      selectedOrder,
      activeStatus,
      animateCircle,
      orders,
      completedOrders,
      processingOrders,
      cancelledOrders,
      handleStatus,
      handleDetail,
      handleOk,
    }
  },
  props: {
    orders: { type: Array as () => Array<Order>, required: true },
    filter: { type: String, required: true },
  },
  components: { OrdersTable },
})
</script>

<template>
  <div>
    <div
      class="
        bg-black bg-opacity-30
        fixed
        w-screen
        h-full
        top-0
        left-0
        z-10
        flex
        justify-center
        items-center
      "
      v-if="selectedOrder"
    >
      <div class="w-96 h-60 bg-white p-4 relative rounded-md">
        <div class="flex justify-between items-center">
          <h3 class="text-xl text-gray-600 font-semibold">
            Change order status
          </h3>

          <div
            class="transform rotate-45 border-2 rounded-full p-1"
            @click="selectedOrder = null"
          >
            <svg
              class="
                stroke-current
                text-gray-400
                cursor-pointer
                hover:text-gray-700
              "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
        <p class="mb-4">Order {{ selectedOrder.order_id }}</p>
        <div
          class="flex gap-2 cursor-default mb-2"
          @click="activeStatus = 'processing'"
        >
          <div
            class="w-6 h-6 rounded-md cursor-pointer hover:bg-yellow-200"
            :class="
              activeStatus === 'processing' ? 'bg-yellow-300' : 'bg-gray-100'
            "
          >
            <svg
              class=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="bg-yellow-100 text-yellow-600 w-full">Processing</p>
        </div>
        <div
          class="flex gap-2 cursor-default mb-2"
          @click="activeStatus = 'cancelled'"
        >
          <div
            class="w-6 h-6 rounded-md cursor-pointer hover:bg-red-300"
            :class="activeStatus === 'cancelled' ? 'bg-red-400' : 'bg-gray-100'"
          >
            <svg
              class=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="w-full bg-red-100 text-red-600">Cancel</p>
        </div>
        <div
          class="flex gap-2 cursor-default"
          @click="activeStatus = 'completed'"
        >
          <div
            class="w-6 h-6 rounded-md cursor-pointer hover:bg-green-300"
            :class="
              activeStatus === 'completed' ? 'bg-green-400' : 'bg-gray-100'
            "
          >
            <svg
              class=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="bg-green-100 text-green-900 w-full">Completed</p>
        </div>
        <div
          class="
            absolute
            bottom-0
            mr-4
            mb-4
            right-0
            w-20
            py-1
            cursor-pointer
            hover:underline
            bg-p-red
            text-white text-center
            rounded-md
          "
        >
          <svg
            class="h-5 w-5 text-white inline-block animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            v-if="animateCircle"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p v-else @click="handleOk">Ok</p>
        </div>
      </div>
    </div>

    <OrdersTable
      v-if="filter === 'all'"
      :orders="orders"
      @handleDetail="handleDetail"
      @handleStatus="handleStatus"
    />
    <OrdersTable
      v-if="filter === 'completed'"
      :orders="completedOrders"
      @handleDetail="handleDetail"
      @handleStatus="handleStatus"
    />
    <OrdersTable
      v-if="filter === 'processing'"
      :orders="processingOrders"
      @handleDetail="handleDetail"
      @handleStatus="handleStatus"
    />
    <OrdersTable
      v-if="filter === 'cancelled'"
      :orders="cancelledOrders"
      @handleDetail="handleDetail"
      @handleStatus="handleStatus"
    />
  </div>
</template>
