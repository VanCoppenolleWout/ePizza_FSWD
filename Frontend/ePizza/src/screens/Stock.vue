<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
  }
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader mode="full"/>

    <div class="lg:mt-14 lg:flex lg:items-start lg:justify-between">
      <div>this is the stock page</div>
    </div>
  </div>
</template>