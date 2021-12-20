<script lang="ts">
import { defineComponent, ref, Ref, toRefs } from 'vue'
import { Order } from '../interfaces/order'
import OrderComponent from '../components/OrderComponent.vue'
import { fetchData } from '../composables/useNetwork'
import { useRoute } from 'vue-router'
import ReviewComponent from '../components/ReviewComponent.vue'

export default defineComponent({
  setup(context) {
    let order: Ref<Order | null> = ref(null)
    const { get } = fetchData()
    const route = useRoute()
    const getOrder = async () => {
      order.value = await get(`/order/one/${route.params.order_id}`)
    }
    if (context.order) {
      order.value = JSON.parse(context.order)
      history.pushState(
        {},
        '',
        `https://localhost:8888/orders/detail/${order.value?.order_id}`,
      )
    } else getOrder()
    return { order }
  },
  props: { order: { type: String } },
  components: { OrderComponent, ReviewComponent },
})
</script>

<template>
  <div class="sm:ml-24">
    <div class="sm:p-8 p-4 sm:max-w-[80%] sm:m-auto">
      <div class="flex gap-2">
        <router-link to="/orders">
          <svg
            class="stroke-current text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </router-link>

        <h3 class="text-gray-700 text-2xl font-semibold mb-4" v-if="order">
          Order details #{{ order.order_id }}
        </h3>
      </div>
      <p class="max-w-6xl text-gray-500 mb-8">
        In the order details section, you can review and manage all orders with
        their details.
      </p>

      <div
        class="
          flex flex-col
          space-y-10
          md:space-y-0 md:flex-row md:space-x-10
          mt-14
          mb-10
          order-tracker
        "
      >
        <OrderComponent :order="order" class="md:w-3/5" />
        <ReviewComponent :order="order" :admin="true" />
      </div>
    </div>
  </div>
</template>
