<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: {
    source: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <figure class="loadImage">
    <img :src="source" alt="" />
  </figure>
</template>
