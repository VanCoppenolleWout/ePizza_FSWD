<script lang="ts">
import { defineComponent, toRef, toRefs } from 'vue'
import { fetchData } from '../composables/useNetwork'
import PizzaComponent from './PizzaComponent.vue'
import PizzaSkeleton from './PizzaSkeleton.vue'

export default defineComponent({
  async setup(props) {
    const { get } = fetchData()

    const data = await get('/pizza')

    const { vegetarian } = toRefs(props)

    return {
      data,
      vegetarian,
    }
  },
  components: { PizzaComponent, PizzaSkeleton },
  props: {
    vegetarian: Boolean,
  },
})
</script>

<template>
  <div
    class="
      grid grid-cols-2
      gap-2
      justify-items-center
      md:grid-cols-3
      xl:gap-4 xl:gap-y-6
    "
  >
    <div v-for="(item, index) in data" :key="index">
      <PizzaComponent
        :id="item.pizza_id"
        :name="item.name"
        :imgUrl="item.img_url"
        :price="item.price"
        :stock="item.stock"
        v-if="!vegetarian"
      />
      <PizzaComponent
        :id="item.pizza_id"
        :name="item.name"
        :imgUrl="item.img_url"
        :price="item.price"
        :stock="item.stock"
        v-else-if="item.vegetarian"
      />
    </div>
  </div>
</template>
