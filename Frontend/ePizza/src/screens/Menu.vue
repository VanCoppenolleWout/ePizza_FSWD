<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'
import PizzaComponent from '../components/PizzaComponent.vue'
import Pizza from '../components/Pizza.vue'
import PizzaSkeleton from '../components/PizzaSkeleton.vue'

export default defineComponent({
  setup() {
    const filter: Ref<string> = ref('vegetarian')
  },
  components: { AppHeader, ItemBasket, PizzaComponent, Pizza, PizzaSkeleton },

  methods: {
    filterPizza() {
      console.log('click')
    },
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <AppHeader />

    <div class="lg:mt-14 lg:flex lg:items-start lg:justify-between">
      <div>
        <div class="flex flex-row text-lg items-center mt-8 mb-4">
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
        <Suspense>
          <template #default>
            <Pizza />
          </template>
          <template #fallback>
            <div
              class="
                grid grid-cols-2
                gap-2
                justify-items-center
                md:grid-cols-3
                xl:gap-4 xl:gap-y-6
              "
            >
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
              <PizzaSkeleton />
            </div>
          </template>
        </Suspense>
      </div>
      <ItemBasket />
    </div>
  </div>
</template>
