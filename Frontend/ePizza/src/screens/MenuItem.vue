<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40">
    <AppHeader/>
  </div>
</template>
