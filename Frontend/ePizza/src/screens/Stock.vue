<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { fetchData } from '../composables/useNetwork'
import StockComponent from '../components/StockComponent.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    StockComponent,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader mode="full" />

    <div
      class="
        h-screen
        flex
        items-center
        self-center
        justify-center
        flex-1
        space-x-10
      "
    >
      <StockComponent class=" w-1/2"/>
    </div>
  </div>
</template>
