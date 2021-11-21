<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import BasketItem from './BasketItem.vue'

export default defineComponent({
  setup() {
    // const items = ref<any>();
    const active: Ref<boolean> = ref(false)
    const items: any = localStorage.getItem('items')
    console.log(items, 'items')

    return {
      items,
      active,
    }
  },
  mounted() {
    // const items = ref<any>();
    const items: any = localStorage.getItem('items')
    return {
      items,
    }
  },
  components: { BasketItem },
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
        <div v-if="items !== null">
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
          <BasketItem />
          <BasketItem />
          <BasketItem />
          <BasketItem />
          <BasketItem />
          <BasketItem />
          <BasketItem />
          <BasketItem />
        </div>
      </div>
      <footer v-if="items === null" class="lg:mt-10">
        <div class="lg:flex flex-row justify-between items-center hidden">
          <h2 class="text-xl font-semibold">Total</h2>
          <p class="text-xl font-medium text-p-gray-300">€{{ ' 13,50' }}</p>
        </div>

        <button
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
          Order (€ {{ ' 13,50' }})
        </button>
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
