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
  <div>
    <!-- <SideBar /> -->
    <StockComponent class="sm:ml-24" />

    <!-- charts, administrators, -->
  </div>
</template>
