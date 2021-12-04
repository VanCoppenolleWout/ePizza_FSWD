<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    TrackerComponent,
    OrderComponent,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader mode="full" />

    <div class="">
      <div>this is the orders page</div>

      <div class="flex flex-row space-x-10">
        <OrderComponent class="w-3/5 h-full" />
        <TrackerComponent class="md:w-2/5" />
      </div>
    </div>
  </div>
</template>
