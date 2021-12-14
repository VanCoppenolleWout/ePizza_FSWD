<script lang="ts">
import { defineComponent, onBeforeUnmount, Ref, ref } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'
import AppHeader from '../components/AppHeader.vue'
import { Order } from '../interfaces/order'
import { useRoute, useRouter } from 'vue-router'
import Loader from '../components/Loader.vue'
import { fetchData } from '../composables/useNetwork'

export default defineComponent({
  setup(context) {
    const { get } = fetchData()
    const route = useRoute()
    const router = useRouter()
    const order: Ref<Order | null> = ref(null)
    const loading: Ref<boolean> = ref(false)

    const getOrder = async () => {
      loading.value = true

      order.value = await get(`/order/one/${route.params.order_id}`)

      loading.value = false
    }

    if (context.order) {
      order.value = JSON.parse(context.order)
      history.pushState(
        {},
        '',
        `https://localhost:8888/tracker/${order.value?.order_id}`,
      )
    } else getOrder()

    return {
      order,
      loading,
    }
  },
  components: {
    TrackerComponent,
    ReviewComponent,
    OrderComponent,
    AppHeader,
    Loader,
  },
  props: {
    order: { type: String },
  },
})
</script>

<template>
  <Loader v-if="loading" />
  <div v-else class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
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
    <ReviewComponent :order="order" class="w-full" />
  </div>
</template>

<style>
@media (min-width: 768px) {
  .order-tracker {
    max-height: 586px;
  }
}
</style>
