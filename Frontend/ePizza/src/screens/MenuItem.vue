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
    console.log(toppingsAr)
    const highlightedToppingArr: any = ref([])

    const highlightTopping = (topping: any) => {
      console.log(topping.name)
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
      <router-link to="/menu" class="hover:underline"> Go back </router-link>
    </div>

    <div
      class="
        lg:mt-8 lg:flex lg:items-start lg:justify-between
        gap-4
        md:flex-row
        flex flex-col-reverse
      "
    >
      <div
        class="
          mt-6
          w-full
          md:mt-0
          bg-white
          shadow-lg
          p-4
          rounded-lg
          md:max-w-xs
        "
      >
        <h1 class="p-2 text-xl font-bold text-p-gray-1000">Select size</h1>
        <div class="flex justify-between p-2">
          <div class="flex gap-4">
            <p>Small</p>
          </div>
          <div class="flex gap-3">
            <p>€2</p>

            <div class="w-6 h-6 bg-p-red rounded-md">
              <svg
                class=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex justify-between p-2">
          <div class="flex gap-4">
            <p>Medium</p>
          </div>
          <div class="flex gap-3">
            <p>€2</p>

            <div class="w-6 h-6 bg-gray-100 rounded-md">
              <svg
                class=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex justify-between p-2">
          <div class="flex gap-4">
            <p>Large</p>
          </div>
          <div class="flex gap-3">
            <p>€2</p>

            <div class="w-6 h-6 bg-gray-100 rounded-md">
              <svg
                class=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
        <h1 class="p-2 text-xl font-bold text-p-gray-1000">Add toppings</h1>
        <div
          class="flex justify-between p-2"
          v-for="(topping, index) in toppingsAr"
          @click="topping.stock === 0 ? null : highlightTopping(topping)"
          :key="index"
        >
          <div class="flex gap-4">
            <img class="w-6 h-6" :src="topping.img_url" alt="" />
            <p>{{ topping.name }}</p>
          </div>
          <div class="flex gap-3">
            <p>€{{ topping.price }}</p>

            <div
              class="w-6 h-6 bg-p-red rounded-md"
              :class="{
                'text-white bg-red-500':
                  highlightedToppingArr.includes(topping),
                'bg-p-gray-100': !highlightedToppingArr.includes(topping),
                'opacity-50 cursor-default': topping.stock === 0,
                'hover:bg-red-300': topping.stock !== 0,
              }"
            >
              <svg
                class=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-row text-lg items-center mb-4">
          <section class="">
            <h1 class="text-3xl font-semibold text-p-gray">
              {{ pizza.name }}
            </h1>
            <p>{{ pizza.description }}</p>
            <div class="flex justify-center mt-16">
              <img class="w-96" src="../assets/images/forestiere-nobg.png" />
            </div>
            <div></div>
          </section>
        </div>
      </div>

      <Basket :addOrder="true" @addPizza="addPizza" />
    </div>
  </div>
</template>
