<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: { msg: String },
})
</script>

<template>
  <p>
    {{ msg }}
  </p>
</template>
