<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'
import MenuItem from '../components/MenuItem.vue'

export default defineComponent({
  setup() {},
  components: { AppHeader, ItemBasket, MenuItem },

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
    <div>
      <div>
        <div class="flex flex-row space-x-4 mt-20 text-lg">
          <p>Filter</p>
          <!-- <button class="" v-on:click="filterPizza('all')">All</button>
          <button class="" v-on:click="filterPizza('veg')">Vegetarian</button> -->
          <input type="radio" name="select" id="option-1"  v-on:click="filterPizza()"  checked>
          <input type="radio" name="select" id="option-2"  class="appearance-none t">
          <label for="option-1" class="">Lol</label>
          <label for="option-2" class="checked:bg-blue-600">Lol:</label>
        </div>
        <section class="mt-16">
          <div class="grid grid-cols-4">
            <div class="w-64 rounded-xl bg-white h-full">
              <img
                src="src\assets\images\pizza-placeholder.png"
                class="w-64 h-40 object-cover rounded-t-xl"
                alt=""
              />
              <div class="flex flex-row justify-between items-center p-6">
                <p class="text-lg">{{ 'Margherita' }}</p>
                <RouterLink :to="'/pizzadetail'" class="h-8">
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
