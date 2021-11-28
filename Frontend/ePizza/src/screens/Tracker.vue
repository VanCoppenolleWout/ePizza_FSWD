<script lang="ts">
import { defineComponent } from 'vue'
import TrackerComponent from '../components/TrackerComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup(context) {
    const route = useRoute()

    console.log(JSON.parse(context.order || '{}'))
  },
  components: {
    TrackerComponent,
    ReviewComponent,
  },
  props: {
    order: String,
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
