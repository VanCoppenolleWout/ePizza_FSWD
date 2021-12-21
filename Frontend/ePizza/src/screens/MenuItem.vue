<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import { Pizza } from '../interfaces/pizza'
import { Topping } from '../interfaces/topping'
import { useStore } from '../store/store'

export default defineComponent({
  setup(context) {
    const router: Router = useRouter()
    const { store } = useStore()

    const pizza: Pizza = JSON.parse(context.pizza)
    const pizzaToppings = pizza.toppings.map((topping) => topping.topping_id)

    const size: Ref<number> = ref(1)
    const type: Ref<string> = ref('pan')

    const toppingsAr: any = computed(() => store.getters.getToppingsArr)
    const toppingsArr: any = toppingsAr.value
    const highlightedToppingArr: any = ref([])

    const checkToppings = () => {
      for (const topping of toppingsAr.value) {
        for (const toppingPizza of pizza.toppings) {
          if (topping.name === toppingPizza.name) {
            toppingsAr.value[toppingsAr.value.indexOf(topping)].stock -= 1
          }
        }
      }
    }

    const highlightTopping = (topping: any) => {
      if (pizzaToppings.includes(topping.topping_id)) {
        if (
          toppingsAr.value[toppingsAr.value.indexOf(topping)].stock - 1 !==
          0
        ) {
          if (
            !highlightedToppingArr.value.includes(topping) &&
            topping.stock !== 0
          )
            highlightedToppingArr.value.push(topping)
          else
            highlightedToppingArr.value.splice(
              highlightedToppingArr.value.indexOf(topping),
              1,
            )
        }
      } else {
        if (toppingsAr.value[toppingsAr.value.indexOf(topping)].stock !== 0) {
          if (
            !highlightedToppingArr.value.includes(topping) &&
            topping.stock !== 0
          )
            highlightedToppingArr.value.push(topping)
          else
            highlightedToppingArr.value.splice(
              highlightedToppingArr.value.indexOf(topping),
              1,
            )
        }
      }
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
      toppingsArr,
      pizzaToppings,
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
  <div class="container mx-auto p-8 md:px-0 pb-40 lg:pb-10">
    <div>
      <AppHeader />
      <router-link to="/menu" class="hover:underline flex">
        <svg
          class="text-gray-700 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <p>{{ $t('item_back') }}</p>
      </router-link>
    </div>

    <div
      class="
        lg:mt-8 lg:flex lg:items-start lg:justify-between
        md:flex-row
        flex flex-col-reverse
        mt-7
        gap-8
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
        <h1 class="p-2 text-xl font-bold text-p-gray-1000">
          {{ $t('item_size_title') }}
        </h1>
        <div class="flex justify-between p-2" @click="size = 1">
          <div class="flex gap-4">
            <p class="cursor-default">{{ $t('size_small') }}</p>
          </div>
          <div class="flex gap-3">
            <p class="cursor-default">€{{ pizza.price }}</p>

            <div
              class="w-6 h-6 rounded-md cursor-pointer hover:bg-red-300"
              :class="size === 1 ? 'bg-p-red' : 'bg-gray-100'"
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
        <div class="flex justify-between p-2" @click="size = 2">
          <div class="flex gap-4">
            <p class="cursor-default">{{ $t('size_medium') }}</p>
          </div>
          <div class="flex gap-3">
            <p class="cursor-default">€{{ pizza.price + 5 }}</p>

            <div
              class="w-6 h-6 rounded-md cursor-pointer hover:bg-red-300"
              :class="size === 2 ? 'bg-p-red' : 'bg-gray-100'"
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
        <div class="flex justify-between p-2" @click="size = 3">
          <div class="flex gap-4">
            <p class="cursor-default">{{ $t('size_large') }}</p>
          </div>
          <div class="flex gap-3">
            <p class="cursor-default">€{{ pizza.price + 10 }}</p>

            <div
              class="w-6 h-6 rounded-md cursor-pointer hover:bg-red-300"
              :class="size === 3 ? 'bg-p-red' : 'bg-gray-100'"
              @click="size = 3"
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
        <h1 class="p-2 text-xl font-bold text-p-gray-1000">
          {{ $t('item_addtoppings') }}
        </h1>
        <div
          class="flex justify-between p-2"
          v-for="(topping, index) in toppingsAr"
          @click="topping.stock === 0 ? null : highlightTopping(topping)"
          :key="index"
        >
          <div class="flex gap-4 cursor-default">
            <img class="w-6 h-6" :src="topping.img_url" alt="" />
            <p>{{ topping.name }}</p>
          </div>
          <div class="flex gap-3 cursor-default">
            <p>€{{ topping.price }}</p>

            <div
              class="w-6 h-6 bg-p-red rounded-md cursor-pointer"
              :class="{
                'opacity-50 cursor-default': topping.stock === 0,
                'text-white bg-red-500':
                  highlightedToppingArr.includes(topping),
                'bg-p-gray-100': !highlightedToppingArr.includes(topping),
                'hover:bg-red-300':
                  toppingsAr[toppingsAr.indexOf(topping)].stock !== 0,
                'cursor-default hover:bg-p-gray-100':
                  toppingsAr[toppingsAr.indexOf(topping)].stock - 1 === 0 &&
                  pizzaToppings.includes(topping.topping_id),
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
            <p class="max-w-lg">{{ pizza.description }}</p>
            <div class="flex justify-center mt-10 lg:mt-16">
              <img class="w-96" :src="pizza.img_url_nobg" />
            </div>
            <div></div>
          </section>
        </div>
      </div>

      <Basket :addOrder="true" @addPizza="addPizza" />
    </div>
  </div>
</template>
