<script lang="ts">
import { defineComponent } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'
import AppHeader from '../components/AppHeader.vue'
import { Order } from '../interfaces/order'

export default defineComponent({
  setup(context) {
    const order: Order = JSON.parse(context.order)

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
      <TrackerComponent :order="order" class="md:w-2/5" />
    </div>
    <ReviewComponent class="w-full" />
  </div>
</template>

<style>
@media (min-width: 768px) {
  .order-tracker {
    max-height: 586px;
  }
}
</style>
