<script lang="ts">
import { defineComponent } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'

export default defineComponent({
  setup() {},
  components: {
    TrackerComponent,
    ReviewComponent,
  },
})
</script>

<template>
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
    <TrackerComponent />
    <ReviewComponent />
  </div>
</template>
