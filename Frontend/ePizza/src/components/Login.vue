<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div
    class="
      fixed
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      w-96
      bg-white
    "
  >
    <p>This is a test to see if this is absolutely positioned in the middle</p>
  </div>
</template>
