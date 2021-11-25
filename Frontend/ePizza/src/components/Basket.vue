<script lang="ts">
import { defineComponent, Ref, ref, toRefs, watch } from 'vue'
import BasketItem from './BasketItem.vue'
import { TimelineLite } from 'gsap'
import { Pizza } from '../interfaces/pizza'
import { useLocalStorage } from '../composables/useLocalStorage'

export default defineComponent({
  setup(props, { emit }) {
    const { addOrder } = toRefs(props)
    const active: Ref<boolean> = ref(false)
    const { getPizzasLocal, deletePizzaLocal, addPizzaLocal } =
      useLocalStorage()

    const pizzas: Ref<Array<Pizza>> = ref(getPizzasLocal())
    pizzas.value.sort((a, b) =>
      a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0,
    )
    let pizzaCounts: Ref<Record<string, number>> = ref({})
    const totalPrice = ref()

    watch(pizzas, (pizzas, prevPizzas) => {
      setPizzaCounts()
      setPizzaPrice()
    })

    const setPizzaCounts = () => {
      pizzaCounts.value = {}
      pizzas.value.forEach((pizza) => {
        pizzaCounts.value[JSON.stringify(pizza)] =
          (pizzaCounts.value[JSON.stringify(pizza)] || 0) + 1
      })
    }

    const setPizzaPrice = () => {
      totalPrice.value = pizzas.value.reduce(
        (total, pizza) => total + pizza.price,
        0,
      )
    }

    setPizzaCounts()
    setPizzaPrice()

    const addPizza = () => {
      emit('addPizza')
    }

    const deleteAPizza = (pizza: Pizza) => {
      pizzas.value = deletePizzaLocal(pizza)
      pizzas.value.sort((a, b) =>
        a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0,
      )
    }

    const addAPizza = (pizza: Pizza) => {
      pizzas.value = addPizzaLocal(pizza)
      pizzas.value.sort((a, b) =>
        a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0,
      )
    }

    return {
      pizzas,
      active,
      pizzaCounts,
      addOrder,
      addPizza,
      addAPizza,
      totalPrice,
      deleteAPizza,
    }
  },
  components: { BasketItem },
  props: {
    addOrder: Boolean,
  },
})
</script>

<template>
  <div
    class="
      bg-white
      rounded-lg
      basket
      fixed
      bottom-0
      left-1/2
      w-full
      transform
      -translate-x-1/2
      lg:relative lg:translate-x-0 lg:left-0 lg:w-80
    "
  >
    <div class="p-4 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2 lg:mb-5">
          <h1 class="text-3xl font-bold text-p-gray-1000">Basket</h1>
          <div
            class="lg:hidden cursor-pointer"
            :class="active ? 'transform rotate-0' : 'transform rotate-180'"
            @click="active = !active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#707070"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        <div v-if="pizzas.length == 0">
          <p>Add items to the order.</p>
        </div>
        <div
          class="
            lg:h-72
            h-40
            overflow-hidden overflow-y-auto
            scroll
            p-2
            lg:block
          "
          :class="active ? 'block' : 'hidden'"
          v-else
        >
          <div v-for="(pizza, index) of Object.keys(pizzaCounts)" :key="index">
            <BasketItem
              :name="JSON.parse(pizza).name"
              :price="JSON.parse(pizza).price"
              :sizeIndex="JSON.parse(pizza).size"
              :amount="pizzaCounts[pizza]"
              @deletePizza="deleteAPizza(JSON.parse(pizza))"
              @addPizza="addAPizza(JSON.parse(pizza))"
            />
          </div>
        </div>
      </div>
      <footer v-if="pizzas !== null" class="lg:mt-10">
        <div class="lg:flex flex-row justify-between items-center hidden">
          <h2 class="text-xl font-semibold">Total</h2>
          <p class="text-xl font-medium text-p-gray-300">
            €{{ totalPrice.toFixed(2) }}
          </p>
        </div>

        <button
          v-if="addOrder"
          class="
            bg-p-red
            w-full
            rounded-md
            text-white
            font-semibold
            py-3
            mt-2
            lg:mt-8
          "
          @click="addPizza"
        >
          Add to order
        </button>

        <router-link to="order" v-else>
          <button
            to="/order"
            class="
              bg-p-red
              w-full
              rounded-md
              text-white
              font-semibold
              py-3
              mt-2
              lg:mt-8
            "
          >
            Order (€ {{ totalPrice.toFixed(2) }})
          </button>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<style>
.scroll::-webkit-scrollbar {
  width: 12px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #cacaca;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.basket {
  margin-top: 3.625rem;
}
</style>
