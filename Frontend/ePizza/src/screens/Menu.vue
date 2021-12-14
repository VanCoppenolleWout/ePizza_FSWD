<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import Pizza from '../components/Pizza.vue'
import PizzaSkeleton from '../components/PizzaSkeleton.vue'

export default defineComponent({
  setup() {
    const vegetarian: Ref<boolean> = ref(false)

    return {
      vegetarian,
    }
  },
  components: { AppHeader, Basket, Pizza, PizzaSkeleton },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-40 lg:pb-10">
    <AppHeader />

    <div class="lg:mt-6 lg:flex lg:items-start lg:justify-between">
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
              hover:bg-red-100
            "
            :class="{ ' bg-p-red text-white hover:bg-p-red': !vegetarian }"
            @click="vegetarian = false"
          >
            All
          </div>
          <div
            class="px-6 py-0 cursor-pointer rounded-md hover:bg-red-100"
            :class="{ ' bg-p-red text-white hover:bg-p-red': vegetarian }"
            @click="vegetarian = true"
          >
            Vegetarian
          </div>
        </div>
        <Suspense>
          <template #default>
            <Pizza :vegetarian="vegetarian" />
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
      <Basket class="basket" />
    </div>
  </div>
</template>

<style scoped>
.basket {
  margin-top: 4.75rem;
}
</style>
