<script lang="ts">
import { computed, defineComponent, Ref, toRefs } from 'vue'
import { fetchData } from '../composables/useNetwork'
import { Pizza } from '../interfaces/pizza'
import { Topping } from '../interfaces/topping'
import { useStore } from '../store/store'
import PizzaComponent from './PizzaComponent.vue'
import PizzaSkeleton from './PizzaSkeleton.vue'

export default defineComponent({
  async setup(props) {
    const { vegetarian } = toRefs(props)
    const { get } = fetchData()
    const { store } = useStore()

    let toppingsArr: Ref<Array<Topping>> = computed(() => {
      return store.getters.getToppingsArr
    })

    const pizzaArr: Array<Pizza> = await get('/pizza')

    const vegetarianArr: Array<Pizza> = pizzaArr.filter(
      (pizza) => pizza.vegetarian === true,
    )

    return {
      pizzaArr,
      vegetarian,
      vegetarianArr,
      toppingsArr,
    }
  },
  components: { PizzaComponent, PizzaSkeleton },
  props: {
    vegetarian: Boolean,
  },
})
</script>

<template>
  <div>
    <div
      v-if="!vegetarian"
      class="
        grid grid-cols-2
        gap-2
        justify-items-center
        md:grid-cols-3
        xl:gap-4 xl:gap-y-6
      "
    >
      <div v-for="(pizza, index) in pizzaArr" :key="index">
        <PizzaComponent
          :id="pizza.pizza_id"
          :name="pizza.name"
          :imgUrl="pizza.img_url"
          :price="pizza.price"
          :stock="pizza.stock"
          :toppingsArr="toppingsArr"
          :pizza="pizza"
        />
      </div>
    </div>
    <div
      v-if="vegetarian"
      class="
        grid grid-cols-2
        gap-2
        justify-items-center
        md:grid-cols-3
        xl:gap-4 xl:gap-y-6
      "
    >
      <div v-for="(pizza, index) in vegetarianArr" :key="index">
        <PizzaComponent
          :id="pizza.pizza_id"
          :name="pizza.name"
          :imgUrl="pizza.img_url"
          :price="pizza.price"
          :stock="pizza.stock"
          :toppingsArr="toppingsArr"
          :pizza="pizza"
        />
      </div>
    </div>
  </div>
</template>
