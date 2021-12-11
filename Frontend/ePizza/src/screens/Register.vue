<script lang="ts">
import { defineComponent } from 'vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  setup() {},
  components: { RegisterComponent, AppHeader, AppFooter },
})
</script>

<template>
  <div class="container mx-auto p-8 md:p-0 md:pt-8 overflow-x-hidden">
    <AppHeader />
    <RegisterComponent class="mt-8 flex justify-center" />
  </div>
</template>

<style></style>
