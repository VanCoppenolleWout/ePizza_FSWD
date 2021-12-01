<script lang="ts">
import { defineComponent } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import { useRoute } from 'vue-router'
import OrderComponent from '../components/OrderComponent.vue'
import AppHeader from '../components/AppHeader.vue'

export default defineComponent({
  setup(context) {
    const route = useRoute()

    console.log(JSON.parse(context.order || '{}'))
  },
  components: {
    TrackerComponent,
    ReviewComponent,
    OrderComponent,
    AppHeader,
  },
  props: {
    order: String,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader />
    <div
      class="
        md:flex
        justify-center
        flex-wrap
        lg:justify-between
        flex-1
        mt-14
        mb-14
      "
    >
      <OrderComponent class="md:w-1/2 md:mx-2" />
      <TrackerComponent class="md:w-2/5 md:mx-2" />
    </div>
    <ReviewComponent class="w-full" />
  </div>
</template>
