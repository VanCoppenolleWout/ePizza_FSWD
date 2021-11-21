<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'
import { fetchData } from '../composables/useNetwork'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    let toppingsAr: any = ref([])

    const getToppings = async () => {
      toppingsAr.value = await get('/topping')
      console.log(toppingsAr.value)
    }
    getToppings()

    return {
      toppingsAr,
    }
  },
  components: {
    AppHeader,
    ItemBasket,
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40 relative overflow-hidden">
    <AppHeader />
    <div class="lg:mt-14 lg:flex lg:items-start lg:justify-between">
      <div>
        <div class="flex flex-row text-lg items-center mt-8 mb-4">
          <section class="flex flex-row space-x-10">
            <img src="src\assets\images\pizza-placeholder.png" alt="" />
            <div>
              <h1 class="text-3xl font-semibold text-p-gray">
                {{ 'Margherita' }}
              </h1>
              <div class="mt-8">
                <h2 class="font-semibold text-xl">size</h2>
                <div class="mt-2 flex flex-col">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="size"
                      value="small"
                    />
                    <span class="ml-4">small</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="size"
                      value="medium"
                    />
                    <span class="ml-4">medium</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="size"
                      value="large"
                    />
                    <span class="ml-4">large</span>
                  </label>
                </div>
              </div>
              <div class="mt-6">
                <h2 class="font-semibold text-xl">type</h2>
                <div class="mt-2 flex flex-col">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="type"
                      value="pan"
                    />
                    <span class="ml-4">pan</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="type"
                      value="stuffed"
                    />
                    <span class="ml-4">stuffed</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="type"
                      value="thin"
                    />
                    <span class="ml-4">thin</span>
                  </label>
                </div>
              </div>
              <div class="mt-6">
                <h2 class="font-semibold text-xl">toppings</h2>
                <ul id="example-1">
                  <li
                    v-for="topping in toppingsAr"
                    :key="topping.id"
                    class="inline-block"
                  >
                    {{ topping.name }}
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <h2 class="font-semibold text-xl">ingredients</h2>
                <ul id="example-2">
                  <!-- v-for="item in items" :key="item.message" -->
                  <li class="inline-block">
                    {{ 'topping' }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ItemBasket />
    </div>
  </div>
</template>
