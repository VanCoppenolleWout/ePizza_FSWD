<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import { Pizza } from '../interfaces/pizza'
import { Topping } from '../interfaces/topping'

export default defineComponent({
  setup(context) {
    const router: Router = useRouter()
    const { pizza } = context
    const currPizza: Ref<Pizza> = ref(pizza)
    const disableAdd: Ref<boolean> = ref(false)

    const { toppingsArr } = toRefs(context)
    const filteredToppings: Ref<Array<Topping>> = ref([])

    const filterToppings = () => {
      filteredToppings.value = []
      for (const toppingPizza of pizza.toppings) {
        for (const topping of toppingsArr.value) {
          if (toppingPizza.name === topping.name)
            filteredToppings.value.push(topping)
        }
      }

      filteredToppings.value.find((topping: Topping) => topping.stock < 1) !==
      undefined
        ? (disableAdd.value = true)
        : (disableAdd.value = false)
    }

    const selectPizza = () => {
      disableAdd.value === false
        ? router.push({
            name: 'detail',
            params: { pizza: JSON.stringify(pizza) },
          })
        : null
    }

    watch(toppingsArr, () => {
      filterToppings()
    })

    filterToppings()

    return {
      selectPizza,
      currPizza,
      disableAdd,
    }
  },
  props: {
    pizza: { type: Object as () => Pizza, required: true },
    toppingsArr: { type: Array as () => Array<Topping>, required: true },
  },
})
</script>

<template>
  <div
    class="
      max-w-pizzaComponent
      md:w-56
      xl:w-64
      rounded-xl
      bg-white
      h-64
      md:h-64
      flex flex-col
    "
  >
    <img
      :src="currPizza.img_url"
      class="w-80 h-40 object-cover rounded-t-xl"
      :alt="currPizza.name"
    />
    <div class="p-2 flex flex-col justify-around h-full">
      <p class="text-base">{{ currPizza.name }}</p>
      <div class="flex items-center justify-between">
        <p>
          <span class="text-gray-400 text-xs mr-1">Vanaf</span>
          {{ `€${currPizza.price.toFixed(2)}` }}
        </p>

        <svg
          class="bg-p-yellow rounded h-8 cursor-pointer"
          :class="{ 'opacity-50': disableAdd }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="selectPizza"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </div>
  </div>
</template>
