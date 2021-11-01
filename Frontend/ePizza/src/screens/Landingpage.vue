<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    AppFooter,
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40 relative overflow-hidden">
    <AppHeader />
    <div class="mt-32">
      <img
        class="
          absolute
          top-48
          pizza-image
          hidden
          md:block
          w-96
          pointer-events-none
        "
        src="../assets/images/pizza-bg.png"
        alt=""
      />
      <div class="max-w-c1">
        <h1 class="font-semibold text-6xl">
          Newest, freshest and best pizza in
          <span class="text-red-500">Kortrijk</span>.
        </h1>
        <h2 class="font-medium text-2xl pt-10">
          Always wanted to try the freshest pizza in the whole wide world? Wait
          no longer and taste for <span class="text-red-500">youself</span>.
        </h2>
        <div class="flex flex-row items-center space-x-5 mt-6">
          <button
            class="rounded-xl bg-yellow-300 py-4 w-40 text-white font-semibold"
          >
            DELIVERY
          </button>
          <p class="font-semibold">OR</p>
          <button
            class="rounded-xl bg-yellow-300 py-4 w-40 text-white font-semibold"
          >
            CARRYOUT
          </button>
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
    
  </div>
  <AppFooter />
</template>

<style>
.pizza-image {
  right: -200px;
}
</style>
