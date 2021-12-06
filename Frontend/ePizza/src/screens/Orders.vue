<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import OrderComponent from '../components/OrderComponent.vue'
import Map from '../components/Map.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    TrackerComponent,
    OrderComponent,
    Map,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader mode="full" />

    <Map/>
  </div>
</template>
