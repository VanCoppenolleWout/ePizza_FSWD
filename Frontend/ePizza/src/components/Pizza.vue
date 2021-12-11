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
    // const { getPizzasLocal } = useLocalStorage()

    // const pizzaCounts = computed(() => store.getters.getPizzaCounts)
    // const pizzaArrLocal: Ref<Array<Pizza>> = ref(getPizzasLocal())

    let toppingsArr: Ref<Array<Topping>> = computed(() => {
      return store.getters.getToppingsArr
    })
    // const backUpArr = JSON.stringify(toppingsArr.value)

    const pizzaArr: Array<Pizza> = await get('/pizza')

    const vegetarianArr: Array<Pizza> = pizzaArr.filter(
      (pizza) => pizza.vegetarian === true,
    )

    // const adjustStockToppings = () => {
    //   console.log('toppings adjusted')
    //   toppingsArr.value = []
    //   toppingsArr.value = JSON.parse(backUpArr)
    //   //loop through toppings from backend
    //   for (const topping of toppingsArr.value) {
    //     //loop through localstorage to see if we need to reduce stock of toppings
    //     for (const pizza of pizzaArrLocal.value) {
    //       //by default a pizza has a fixed toppings
    //       for (const toppingLocal of pizza.toppings) {
    //         if (toppingLocal.name === topping.name) topping.stock -= 1
    //       }

    //       //user can add more toppings to a pizza
    //       for (const toppingId of pizza.topping_ids) {
    //         if (toppingId === topping.topping_id) topping.stock -= 1
    //       }
    //     }
    //   }

    //   store.commit(MutationTypes.setToppingsArr, toppingsArr.value)
    // }

    // adjustStockToppings()

    // watch(pizzaCounts, () => {
    //   pizzaArrLocal.value = getPizzasLocal()
    //   adjustStockToppings()
    // })

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
