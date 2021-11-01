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
    <img
      class="absolute top-48 pizza-image hidden md:block w-96 pointer-events-none"
      src="../assets/images/pizza-bg.png"
      alt=""
    />
    <div class="lg:max-w-4xl max-w-xl">
      <h1 class="font-semibold text-6xl mb-9">
        Newest, freshest and best pizza in
        <span class="text-red-500">Kortrijk</span>.
      </h1>
      <h2 class="font-medium text-2xl max-w-test">
        Always wanted to try the freshest pizza in the whole wide world? Wait no
        longer and taste for <span class="text-red-500">youself</span>.
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
  </div>
</template>

<style>
.pizza-image {
  /* right: -400px; */
  right: -200px;
}
</style>
