<script lang="ts">
import { defineComponent } from 'vue'
import { fetchData } from '../composables/useNetwork'
import PizzaComponent from './PizzaComponent.vue'
import PizzaSkeleton from './PizzaSkeleton.vue'

export default defineComponent({
  async setup() {
    const { get } = fetchData()

    const data = await get('/pizza')
    console.log(data)

    return {
      data,
    }
  },
  components: { PizzaComponent, PizzaSkeleton },
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
        :img_url="item.img_url"
        :price="item.price"
        :stock="item.stock"
      />
    </div>
  </div>
</template>
