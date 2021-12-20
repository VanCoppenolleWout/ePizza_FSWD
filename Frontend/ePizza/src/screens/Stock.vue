<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import StockComponent from '../components/admin/StockComponent.vue'
import OrderViewComponent from '../components/admin/OrderViewComponent.vue'
import ReviewViewComponent from '../components/admin/ReviewViewComponent.vue'
import SideBar from '../components/SideBar.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    StockComponent,
    OrderViewComponent,
    ReviewViewComponent,
    SideBar,
  },
})
</script>

<template>
  <div class="sm:ml-24 mb-16 md:mb-0">
    <div class="sm:p-8 p-4 sm:max-w-[80%] sm:m-auto">
      <h3 class="text-gray-700 text-2xl font-semibold mb-4">{{ $t('stock_h1') }}</h3>
      <p class="max-w-6xl text-gray-500 mb-8">
        {{ $t('stock_sub') }}
      </p>
      <StockComponent />
    </div>
  </div>
</template>
