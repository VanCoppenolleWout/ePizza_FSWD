<script lang="ts">
import { defineComponent, toRef, toRefs } from 'vue'
import { fetchData } from '../composables/useNetwork'
import { Pizza } from '../interfaces/pizza'
import PizzaComponent from './PizzaComponent.vue'
import PizzaSkeleton from './PizzaSkeleton.vue'

export default defineComponent({
  async setup(props) {
    const { get } = fetchData()

    const pizzaArr: Array<Pizza> = await get('/pizza')
    console.log(pizzaArr)
    const vegetarianArr: Array<Pizza> = pizzaArr.filter(
      (pizza) => pizza.vegetarian === true,
    )
    console.log(vegetarianArr)

    const { vegetarian } = toRefs(props)

    return {
      pizzaArr,
      vegetarian,
      vegetarianArr,
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
      <div v-for="(item, index) in pizzaArr" :key="index">
        <PizzaComponent
          :id="item.pizza_id"
          :name="item.name"
          :imgUrl="item.img_url"
          :price="item.price"
          :stock="item.stock"
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
      <div v-for="(item, index) in vegetarianArr" :key="index">
        <PizzaComponent
          :id="item.pizza_id"
          :name="item.name"
          :imgUrl="item.img_url"
          :price="item.price"
          :stock="item.stock"
        />
      </div>
    </div>
  </div>
</template>
