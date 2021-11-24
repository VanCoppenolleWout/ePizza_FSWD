<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import { fetchData } from '../composables/useNetwork'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    let toppingsAr: any = ref([])
    let highlightedToppingAr: any = ref([])

    const getToppings = async () => {
      toppingsAr.value = await get('/topping')
    }
    getToppings()

    const highlightTopping = (topping: any) => {
      if (!highlightedToppingAr.value.includes(topping))
        highlightedToppingAr.value.push(topping)
      else
        highlightedToppingAr.value.splice(
          highlightedToppingAr.value.indexOf(topping),
          1,
        )
    }

    const size: Ref<number> = ref(1)
    const type: Ref<string> = ref('pan')

    return {
      toppingsAr,
      highlightTopping,
      highlightedToppingAr,
      size,
      type,
    }
  },
  components: {
    AppHeader,
    Basket,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <div>
      <AppHeader />
      <router-link to="/menu"> Go back </router-link>
    </div>

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
                      :value="1"
                      v-model="size"
                    />
                    <span class="ml-4">small</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="size"
                      :value="2"
                      v-model="size"
                    />
                    <span class="ml-4">medium</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="size"
                      :value="3"
                      v-model="size"
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
                      v-model="type"
                    />
                    <span class="ml-4">pan</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="type"
                      value="stuffed"
                      v-model="type"
                    />
                    <span class="ml-4">stuffed</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="type"
                      value="thin"
                      v-model="type"
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
                        ? 'bg-red-500 text-white'
                        : 'bg-p-gray-100 text-black'
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
      <Basket />
    </div>
  </div>
</template>
