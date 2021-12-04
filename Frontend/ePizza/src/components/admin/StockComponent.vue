<script lang="ts">
import { AnySoaRecord } from 'dns'
import { defineComponent, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'
import { Pizza } from '../../interfaces/pizza'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    const stock: any = ref([])
    const selectedItem: any = ref([])

    const getStock = async () => {
      stock.value = await get('/pizza')
    }
    getStock()

    const showDetail = (item: any) => {
      selectedItem.value = item
    }

    return {
      stock,
      selectedItem,
      showDetail,
    }
  },
})
</script>

<template>
  <div
    class="bg-white rounded-lg p-8 flex flex-row justify-between space-x-6"
    style="height: 508px"
  >
    <section class="h-full overflow-scroll w-2/5">
      <h1 class="text-p-red text-2xl font-semibold mb-4">
        List of pizzas
      </h1>
      <div
        v-for="(item, index) in stock"
        :key="index"
        @click="showDetail(item)"
        class="
          cursor-pointer
          rounded-xl
          hover:bg-p-gray-100
          active:bg-p-gray-100
          px-4
          py-2
          transform
          hover:scale-105
          transition
          ease-out
          duration-300
        "
      >
        <div class="flex flex-row justify-between h-full">
          <p>{{ item.name }}</p>
          <!-- <p class="font-medium">{{ item.stock }}</p> -->
        </div>
      </div>
    </section>
    <section v-if="selectedItem.length < 1" class="w-3/5">
      <p class="text-center mt-16">Select an item.</p>
    </section>
    <section v-else class="w-3/5 flex flex-row justify-center">
      <div>
        <img
          :src="selectedItem.img_url"
          alt=""
          class="rounded-lg w-2/3 mb-6 mx-auto"
        />
        <h1 class="text-center text-xl font-semibold">
          {{ selectedItem.name }}
        </h1>
        <p class="text-center">
          <span class="font-medium">{{ selectedItem.stock }}</span> left in
          stock
        </p>
        <div class="flex flex-row justify-between h-10 mt-8">
          <input
            type="number"
            name="title"
            id="title"
            min="1"
            max="100"
            class="
              rounded-md
              font-medium
              outline-none
              box-border
              w-1/2
              h-full
              p-2
              px-4
              bg-primary
            "
          />
          <button class="bg-p-red rounded-md text-white font-medium py-2 px-4">
            Raise stock
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
