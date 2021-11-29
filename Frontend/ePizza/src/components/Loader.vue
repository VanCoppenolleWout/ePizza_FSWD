<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { TimelineLite } from 'gsap'

export default defineComponent({
  setup() {
    onMounted(() => {
      let timeline = new TimelineLite()
      timeline.from('.animation1', { repeat: -1, yoyo: true, y: 10 })
    })
  },
})
</script>

<template>
  <div class="h-screen w-full z-10 flex justify-center">
    <div class="mt-40">
      <img
        class="w-52 ml-12 img animation1 pointer-events-none"
        src="../assets/images/12-04 [Converted].svg"
        alt=""
      />
      <p class="mt-8 animate-pulse mx-auto">
        Please wait, fetching pizza stuff...
      </p>
    </div>
  </div>
</template>
