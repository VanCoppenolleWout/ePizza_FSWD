<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ItemBasket from '../components/ItemBasket.vue'
import { fetchData } from '../composables/useNetwork'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    let toppingsAr: any = ref([])
    let highlightedToppingAr: any = ref([])

    const getToppings = async () => {
      toppingsAr.value = await get('/topping')
      console.log(toppingsAr.value)
    }
    getToppings()

    const highlightTopping = (topping: any) => {
      if (!highlightedToppingAr.value.includes(topping)) {
        highlightedToppingAr.value.push(topping)
      } else if (highlightedToppingAr.value.includes(topping)) {
        highlightedToppingAr.value.splice(
          highlightedToppingAr.value.indexOf(topping),
          1,
        )
      }
    }

    return {
      toppingsAr,
      highlightTopping,
      highlightedToppingAr,
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
            <img
              src="https://cdn-catalog.pizzahut.be/images/be/20191009172846486.jpg"
              class="rounded-3xl"
              style="width: 528px; height: 528px"
              alt=""
            />

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
                <ul id="example-1" class="mt-4">
                  <li
                    v-for="(topping, index) in toppingsAr"
                    @click="highlightTopping(topping)"
                    :key="index"
                    class="
                      inline-block
                      cursor-pointer
                      rounded-2xl
                      mr-4
                      py-1
                      px-4
                      bg-gray-200
                      hover:bg-red-300
                    "
                    :class="
                      highlightedToppingAr.includes(topping)
                        ? 'bg-red-500'
                        : 'bg-p-gray-100'
                    "
                  >
                    {{ topping.name }}
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <h2 class="font-semibold text-xl">ingredients</h2>
                <ul id="example-2" class="mt-4">
                  <!-- v-for="item in items" :key="item.message" -->
                  <li
                    class="
                      inline-block
                      cursor-pointer
                      rounded-2xl
                      bg-p-gray-100
                      mr-4
                      py-1
                      px-4
                      hover:bg-red-300
                    "
                    v-for="topping in highlightedToppingAr"
                    :key="topping.id"
                  >
                    {{ topping.name }}
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
