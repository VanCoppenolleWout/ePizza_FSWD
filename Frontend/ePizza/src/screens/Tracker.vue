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
    <div class="md:flex md:flex-row space-x-10 mt-14 mb-10" style="height: 508px">
      <OrderComponent class="md:w-3/5 h-full" />
      <TrackerComponent class="md:w-2/5" />
    </div>
    <ReviewComponent class="w-full" />
  </div>
</template>
