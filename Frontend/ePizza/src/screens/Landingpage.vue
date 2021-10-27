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
  <AppHeader />
  <div class="mt-32">
    <div class="max-w-4xl">
      <h1 class="font-semibold text-6xl">
        Newest, freshest and best pizza in
        <span class="text-red-500">Kortrijk</span>.
      </h1>
      <h2 class="font-medium text-2xl">
        Always wanted to try the freshest pizza in the whole wide world? 
        Wait no longer and taste for <span class="text-red-500">youself</span>.
      </h2>
      <div>
        <button>DELIVERY</button>
        <p>OR</p>
        <button>CARRYOUT</button>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
    <img src="../assets/images/pizza-bg.png" alt="" />
  </div>
</template>
