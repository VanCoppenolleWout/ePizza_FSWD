<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  setup(context, { emit }) {
    const { price, name, sizeIndex } = toRefs(context)
    const sizes = ['Small', 'Medium', 'Large']
    const size = sizes[sizeIndex.value - 1]

    const deletePizza = () => {
      emit('deletePizza')
    }

    const addPizza = () => {
      emit('addPizza')
    }

    return {
      price,
      name,
      size,
      deletePizza,
      addPizza,
    }
  },

  props: {
    price: Number,
    name: String,
    amount: Number,
    sizeIndex: { type: Number, required: true },
  },
  emits: ['deletePizza', 'addPizza'],
})
</script>

<template>
  <div>
    <div class="flex flex-row justify-between items-center">
      <h2 class="font-medium text-xl w-40">{{ name }}</h2>
      <p class="font-medium">€ {{ price }}</p>
    </div>
    <p class="pt-1">{{ size }}</p>
    <div class="flex flex-row justify-between items-center mb-2">
      <div class="flex flex-row items-center space-x-4 pt-2">
        <button
          class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
          @click="deletePizza"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="block m-auto"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
        <p>{{ amount }}</p>

        <button
          class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
          @click="addPizza"
        >
          <svg
            class="block m-auto"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
      <div class="flex lg:flex-col space-x-2 lg:space-x-0">
        <button class="hover:underline hover:text-p-red" @click="deletePizza">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
