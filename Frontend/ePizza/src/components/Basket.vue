<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue'
import BasketItem from './BasketItem.vue'
import { TimelineLite } from 'gsap'
import { Pizza } from '../interfaces/pizza'
import { useLocalStorage } from '../composables/useLocalStorage'
import { MutationTypes, useStore } from '../store/store'
import { Topping } from '../interfaces/topping'
import { fetchData } from '../composables/useNetwork'

export default defineComponent({
  setup(props, { emit }) {
    const active: Ref<boolean> = ref(false)
    const { getPizzasLocal, deletePizzaLocal, addPizzaLocal } =
      useLocalStorage()
    const { store } = useStore()
    const { get } = fetchData()
    const filteredToppings: Ref<Array<Topping>> = ref([])
    const pizzas: Ref<Array<Pizza>> = ref(getPizzasLocal())
    const toppingsArrStore = computed(() => {
      return store.getters.getToppingsArr
    })
    let pizzaCounts: Ref<Record<string, number>> = ref({})
    const totalPrice = ref()
    let toppingsArr: Ref<Array<Topping>> = ref([])
    let backUpArr: any
    const pizzaArrLocal: Ref<Array<Pizza>> = ref(getPizzasLocal())

    const getToppings = async () => {
      toppingsArr.value = await get('/topping')
      backUpArr = JSON.stringify(toppingsArr.value)
      adjustStockToppings()
      setPizzaCounts()
    }

    const filterToppings = (pizza: Pizza) => {
      //get the toppings for the current pizza from the store
      filteredToppings.value = []
      for (const toppingPizza of pizza.toppings) {
        for (const topping of toppingsArrStore.value) {
          if (toppingPizza.name === topping.name)
            filteredToppings.value.push(topping)
        }
      }
    }

    watch(pizzas, () => {
      //update the pizza amounts and price
      setPizzaCounts()
      setPizzaPrice()
    })

    const setPizzaCounts = () => {
      //if pizza with same toppings? -> add the count + 1
      pizzaCounts.value = {}
      pizzas.value.forEach((pizza) => {
        pizzaCounts.value[JSON.stringify(pizza)] =
          (pizzaCounts.value[JSON.stringify(pizza)] || 0) + 1
      })

      store.commit(MutationTypes.setPizzaCounts, pizzaCounts.value)
    }

    const setPizzaPrice = () => {
      totalPrice.value = pizzas.value.reduce(
        (total, pizza) => total + pizza.price,
        0,
      )
    }

    const sortPizzas = () =>
      pizzas.value.sort((a, b) =>
        a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0,
      )

    const deletePizza = async (
      pizza: Pizza,
      element: string,
      count: number,
    ) => {
      const timeline = new TimelineLite()

      if (count === 1)
        await timeline.to(`#${element}`, 0.5, {
          x: '33%',
          opacity: 0,
        })

      pizzas.value = deletePizzaLocal(pizza)
      sortPizzas()

      timeline.to(`.${element}`, 0, {
        x: '0%',
        opacity: 1,
      })
    }

    const AddPizza = (pizza: Pizza) => {
      filterToppings(pizza)

      filteredToppings.value.find((topping: Topping) => topping.stock < 1) !==
      undefined
        ? null
        : (pizzas.value = addPizzaLocal(pizza))

      sortPizzas()
    }

    const addPizza = () => {
      emit('addPizza')
    }

    const placeOrder = () => {
      emit('placeOrder', pizzas.value)
    }

    const adjustStockToppings = () => {
      toppingsArr.value = []
      toppingsArr.value = JSON.parse(backUpArr)
      //loop through toppings from backend
      for (const topping of toppingsArr.value) {
        //loop through localstorage to see if we need to reduce stock of toppings
        for (const pizza of pizzaArrLocal.value) {
          //by default a pizza has a fixed toppings
          for (const toppingLocal of pizza.toppings) {
            if (toppingLocal.name === topping.name) topping.stock -= 1
          }

          //user can add more toppings to a pizza
          for (const toppingId of pizza.topping_ids) {
            if (toppingId === topping.topping_id) topping.stock -= 1
          }
        }
      }

      store.commit(MutationTypes.setToppingsArr, toppingsArr.value)
    }

    watch(pizzaCounts, () => {
      pizzaArrLocal.value = getPizzasLocal()
      adjustStockToppings()
    })

    getToppings()
    sortPizzas()
    setPizzaPrice()

    return {
      pizzas,
      active,
      pizzaCounts,
      totalPrice,
      addPizza,
      AddPizza,
      deletePizza,
      placeOrder,
      toppingsArrStore,
    }
  },
  components: { BasketItem },
  props: {
    addOrder: Boolean,
    orderPage: Boolean,
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
      lg:relative lg:translate-x-0 lg:left-0 lg:w-72
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
        <div class="lg:h-72" v-if="pizzas.length == 0">
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
            transition-all
            duration-300
          "
          :class="active ? 'h-40' : 'h-0'"
          v-else
        >
          <div v-for="(pizza, index) of Object.keys(pizzaCounts)" :key="index">
            <BasketItem
              :name="JSON.parse(pizza).name"
              :price="JSON.parse(pizza).price"
              :sizeIndex="parseInt(JSON.parse(pizza).size)"
              :amount="pizzaCounts[pizza]"
              @deletePizza="
                deletePizza(
                  JSON.parse(pizza),
                  `${JSON.parse(pizza)
                    .name.replaceAll(' ', '')
                    .replace('&', '')}${index}`,
                  pizzaCounts[pizza],
                )
              "
              @addPizza="AddPizza(JSON.parse(pizza))"
              :key="JSON.parse(pizza).name"
              :class="active ? ` block` : 'hidden'"
              :id="`${JSON.parse(pizza)
                .name.replaceAll(' ', '')
                .replace('&', '')}${index}`"
              class="lg:block"
            />
          </div>
        </div>
      </div>
      <div v-if="pizzas !== null" class="lg:mt-10">
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
        <button
          v-else-if="orderPage"
          to="/order"
          :class="{ 'opacity-40 cursor-default': pizzas.length == 0 }"
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
          :disabled="pizzas.length == 0"
          @click="placeOrder"
        >
          Order (€ {{ totalPrice.toFixed(2) }})
        </button>

        <router-link to="order" v-else>
          <button
            to="/order"
            :class="{ 'opacity-40 cursor-default': pizzas.length == 0 }"
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
            :disabled="pizzas.length == 0"
          >
            Order (€ {{ totalPrice.toFixed(2) }})
          </button>
        </router-link>
      </div>
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
</style>
