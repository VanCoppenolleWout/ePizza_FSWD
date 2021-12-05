<script lang="ts">
import { defineComponent, toRef, toRefs } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import { useRoute } from 'vue-router'
import OrderComponent from '../components/OrderComponent.vue'
import AppHeader from '../components/AppHeader.vue'
import { Order } from '../interfaces/order'

export default defineComponent({
  setup(context) {
    const route = useRoute()

    const order: Order = JSON.parse(context.order)
    console.log(order)

    return {
      order,
    }
  },
  components: {
    TrackerComponent,
    ReviewComponent,
    OrderComponent,
    AppHeader,
  },
  props: {
    order: { type: String, required: true },
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader />
    <div class="md:flex md:flex-row space-x-10 mt-14 mb-10">
      <OrderComponent :order="order" class="md:w-3/5" />
      <TrackerComponent class="md:w-2/5" />
    </div>
    <ReviewComponent class="w-full" />
  </div>
</template>
