<script lang="ts">
import { defineComponent } from 'vue'
import InteractiveMap from '../components/InteractiveMap.vue'

export default defineComponent({
  setup() {},
  components: { InteractiveMap },
})
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <InteractiveMap class="md:w-2/3" />
    <aside class="h-4/5 md:w-1/3">
      <div class="m-8">
        <div class="flex flex-row justify-between">
          <router-link to="/">
            <svg
              class="stroke-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </router-link>
          <h1 class="text-center text-2xl font-semibold">Kies winkel</h1>
          <div class="w-8"></div>
        </div>

        <div class="bg-white rounded-xl p-6 mt-8 drop-shadow-sm max-w-[80%] m-auto md:max-w-full">
          <div class="flex flex-row space-x-4 items-center">
            <div class="bg-p-red px-4 py-2 rounded-lg pointer-events-none">
              <p class="text-white font-medium">1</p>
            </div>
            <p class="text-lg">Graaf Karel de Goedelaan 6, Kortrijk</p>
          </div>
          <button
            class="
              cursor-pointer
              m-auto
              w-1/2
              text-white
              bg-p-red
              hover:bg-red-600
              p-2
              font-bold
              rounded-md
              flex
              justify-center
              items-center
              mt-6
            "
          >
            <p class="">Bestel</p>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>
