<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import { fetchData } from '../composables/useNetwork'
import { Pizza } from '../interfaces/pizza'
import { Topping } from '../interfaces/topping'
import { useStore } from '../store/store'

export default defineComponent({
  setup(context) {
    const router: Router = useRouter()
    const { store } = useStore()

    const pizza: Pizza = JSON.parse(context.pizza)

    const size: Ref<number> = ref(1)
    const type: Ref<string> = ref('pan')

    const toppingsAr: any = computed(() => store.getters.getToppingsArr)
    const highlightedToppingArr: any = ref([])

    const highlightTopping = (topping: any) => {
      if (!highlightedToppingArr.value.includes(topping) && topping.stock !== 0)
        highlightedToppingArr.value.push(topping)
      else
        highlightedToppingArr.value.splice(
          highlightedToppingArr.value.indexOf(topping),
          1,
        )
    }

    const addPizza = () => {
      const pizzas: Array<Pizza> = JSON.parse(
        localStorage.getItem('pizzas') || '[]',
      )

      const toppings: Array<string> = highlightedToppingArr.value.map(
        (topping: any) => topping.topping_id,
      )

      const sizePrice: number = size.value == 1 ? 0 : size.value == 2 ? 5 : 10

      const totalPrice = highlightedToppingArr.value.reduce(
        (total: number, topping: any) => {
          return total + topping.price
        },
        pizza.price + sizePrice,
      )

      const pizzaOrder: Pizza = {
        pizza_id: pizza.pizza_id,
        size_id: size.value,
        topping_ids: toppings,
        price: totalPrice,
        name: pizza.name,
        toppings: pizza.toppings,
      }
      pizzas.push(pizzaOrder)
      localStorage.setItem('pizzas', JSON.stringify(pizzas))
      router.push('menu')
    }

    return {
      toppingsAr,
      highlightTopping,
      highlightedToppingArr,
      size,
      type,
      addPizza,
      pizza,
    }
  },
  components: {
    AppHeader,
    Basket,
  },

  props: {
    pizza: { type: String, required: true },
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
    <div>
      <AppHeader />
      <router-link to="/menu"> Go back </router-link>
    </div>

    <div class="lg:mt-8 lg:flex lg:items-start lg:justify-between">
      <div class="w-3/4">
        <div class="flex flex-row text-lg items-center mb-4">
          <section class="flex flex-row space-x-10">
            <img
              :src="pizza.img_url"
              class="rounded-3xl"
              style="width: 400px; height: 400px"
              alt=""
            />

            <div>
              <h1 class="text-3xl font-semibold text-p-gray">
                {{ pizza.name }}
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
                  <button
                    v-for="(topping, index) in toppingsAr"
                    @click="highlightTopping(topping)"
                    :key="index"
                    :disabled="topping.stock === 0"
                    class="text-black inline-block rounded-2xl mr-4 py-1 px-4"
                    :class="{
                      'text-white bg-red-500':
                        highlightedToppingArr.includes(topping),
                      'bg-p-gray-100': !highlightedToppingArr.includes(topping),
                      'opacity-50 cursor-default': topping.stock === 0,
                      'hover:bg-red-300': topping.stock !== 0,
                    }"
                  >
                    {{ topping.name }}
                  </button>
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
                    v-for="topping in highlightedToppingArr"
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
      <Basket :addOrder="true" @addPizza="addPizza" />
    </div>
  </div>
</template>
