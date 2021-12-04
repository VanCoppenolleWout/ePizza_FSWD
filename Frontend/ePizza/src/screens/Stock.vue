<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { fetchData } from '../composables/useNetwork'
import StockComponent from '../components/admin/StockComponent.vue'
import OrderViewComponent from '../components/admin/OrderViewComponent.vue'
import ReviewViewComponent from '../components/admin/ReviewViewComponent.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    StockComponent,
    OrderViewComponent,
    ReviewViewComponent,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader mode="full"/>
    <div class="md:flex md:flex-row space-x-10 mt-14 mb-10" style="height: 508px">
      <OrderViewComponent class="md:w-2/5 h-full" />
      <StockComponent class="md:w-3/5" />
    </div>
    <ReviewViewComponent class="w-full" />
  </div>
</template>