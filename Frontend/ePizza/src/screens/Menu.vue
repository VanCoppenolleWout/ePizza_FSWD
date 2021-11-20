<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'
import PizzaComponent from '../components/PizzaComponent.vue'

export default defineComponent({
  setup() {
    const filter: Ref<string> = ref('vegetarian')
  },
  components: { AppHeader, ItemBasket, PizzaComponent },

  methods: {
    filterPizza() {
      console.log('click')
    },
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:p-0 md:pt-8 pb-0">
    <AppHeader />
    <div class="mt-14 lg:flex lg:items-start">
      <div>
        <div class="flex flex-row text-lg items-center p-2 mb-4 mx-4 lg:mx-8">
          <div class="mr-4">Filter</div>
          <div
            class="
              flex
              px-6
              py-0
              mr-2
              cursor-pointer
              rounded-md
              bg-p-red
              text-white
            "
          >
            All
          </div>
          <div class="px-6 py-0 cursor-pointer rounded-md hover:bg-red-100">
            Vegetarian
          </div>
        </div>
        <section class="md:mr-2 mx-2">
          <div
            class="
              grid grid-cols-2
              justify-items-center
              md:flex md:flex-wrap md:justify-around
            "
          >
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
            <PizzaComponent />
          </div>
        </section>
      </div>
      <ItemBasket />
    </div>
  </div>
</template>
