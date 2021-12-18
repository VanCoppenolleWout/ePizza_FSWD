<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { Order } from '../interfaces/order'
import OrderComponent from '../components/OrderComponent.vue'

export default defineComponent({
  setup(context) {
    let order: Ref<Order | null> = ref(null)
    const getOrder = () => {}
    if (context.order) {
      order.value = JSON.parse(context.order)
      history.pushState(
        {},
        '',
        `https://localhost:8888/order/${order.value?.order_id}`,
      )
    } else getOrder()
    return { order }
  },
  props: { order: { type: String } },
  components: { OrderComponent },
})
</script>

<template>
  <div class="sm:ml-24">
    <div class="sm:p-8 p-4">
      <h3 class="text-gray-700 text-2xl font-semibold mb-4">
        Order details {{ order.order_id }}
      </h3>
      <p class="max-w-6xl text-gray-500 mb-8">
        In the order details section, you can review and manage all orders with
        their details.
      </p>

      <!-- <h3>Pizza details</h3> -->
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
        <OrderComponent :order="order" class="md:w-3/5" />
      </div>
      <OrderComponent :order="order" />
    </div>
  </div>
</template>
