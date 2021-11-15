<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'

export default defineComponent({
  setup() {},
  components: { AppHeader, ItemBasket },

  methods: {
    filterPizza() {
      console.log('click')
    },
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40">
    <AppHeader />
    <div class="mt-20 flex flex-row justify-between">
      <div>
        <div class="flex flex-row text-lg">
          <input
            id="option-1"
            type="radio"
            name="id-type"
            value="option-1"
            v-on:click="filterPizza()"
            checked
          />
          <label for="option-1" class="px-4 py-2 mr-2 cursor-pointer">
            <span>All</span>
          </label>
          <input
            id="option-2"
            type="radio"
            name="id-type"
            value="option-2"
            v-on:click="filterPizza()"
          />
          <label for="option-2" class="px-4 py-2 cursor-pointer">
            <span>Vegetarian</span>
          </label>
        </div>
        <section class="mt-10">
          <div class="grid grid-cols-4">
            <div class="w-64 rounded-xl bg-white h-full">
              <img
                src="src\assets\images\pizza-placeholder.png"
                class="w-64 h-40 object-cover rounded-t-xl"
                alt=""
              />
              <div class="flex flex-row justify-between items-center p-6">
                <p class="text-lg">{{ 'Margherita' }}</p>
                <RouterLink :to="'/detail'" class="h-8">
                  <button>
                    <svg
                      class="bg-p-yellow rounded"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ItemBasket />
    </div>
  </div>
</template>
