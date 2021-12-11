<script lang="ts">
import { AnySoaRecord } from 'dns'
import { defineComponent, Ref, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'
import DoughnutChartComponent from '../DoughnutChartComponent.vue'
import { Topping } from '../../interfaces/topping'

export default defineComponent({
  setup() {
    // const testData = {
    //   labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
    //   datasets: [
    //     {
    //       data: [30, 40, 60, 70, 5],
    //       backgroundColor: [
    //         '#77CEFF',
    //         '#0079AF',
    //         '#123E6B',
    //         '#97B0C4',
    //         '#A5C8ED',
    //       ],
    //     },
    //   ],
    // }

    const { get, put } = fetchData()

    const stock: any = ref([])
    const stockData: any = ref([])
    const stockName: any = ref([])
    const selectedItem: any = ref([])

    const stockAmount = ref<number>(0)
    const price = ref<number>(0)

    let detailScreen = ref<boolean>(false)
    let graphScreen = ref<boolean>(false)

    const getStock = async () => {
      stock.value = await get('/topping')

      stock.value.forEach((element: any) => {
        stockData.value.push(element.stock)
        stockName.value.push(element.name)
      })
    }
    getStock()

    const showDetail = (item: any) => {
      selectedItem.value = item
      detailScreen.value = true
      graphScreen.value = false
      stockAmount.value = item.stock
      price.value = item.price
    }

    const showGraph = () => {
      graphScreen.value = true
      console.log(graphScreen.value, 'graphScreen.value')
      detailScreen.value = false
    }

    const removeStock = () => {
      if (stockAmount.value >= 1) {
        stockAmount.value = stockAmount.value - 1
      }
    }

    const addStock = () => {
      stockAmount.value = stockAmount.value + 1
    }

    const removePrice = () => {
      if (price.value >= 1) {
        price.value = price.value - 1
      }
    }

    const addPrice = () => {
      price.value = price.value + 0.5
    }

    const updateStock = async (
      topping_id: string,
      stock: number,
      price: number,
    ) => {
      const toppingInterface: any = {
        topping_id: topping_id,
        amount: stock,
      }

      console.log(topping_id, stock)

      await put('/topping/stock', toppingInterface)
    }

    return {
      stock,
      selectedItem,
      detailScreen,
      graphScreen,
      stockAmount,
      price,
      stockData,
      stockName,
      showDetail,
      showGraph,
      removeStock,
      addStock,
      removePrice,
      addPrice,
      updateStock,
    }
  },

  components: { DoughnutChartComponent },
})
</script>

<template>
  <div class="bg-white rounded-lg p-8 overflow-scroll md:h-order">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-p-red text-2xl font-semibold mb-4">Stock</h1>
      <button v-if="!detailScreen && !graphScreen" @click="showGraph()">
        Graph
      </button>
    </div>
    <section v-if="!detailScreen && !graphScreen" class="space-y-6">
      <div v-for="(item, index) in stock" :key="index" class="">
        <div
          class="
            flex flex-row
            justify-between
            items-center
            bg-p-gray-100
            rounded-xl
            px-4
            py-4
          "
        >
          <div class="flex flex-row md:space-x-8 items-center">
            <img :src="item.img_url" alt="item.img_url" class="w-10 h-10h hidden md:block " />
            <p class="font-medium text-lg">{{ item.name }}</p>
          </div>  
          <div
            class="
              bg-p-red
              cursor-pointer
              rounded-lg
              transform
              hover:scale-105
              transition
              ease-out
              duration-300
            "
            @click="showDetail(item)"
          >
            <p class="text-white px-4 py-1 w-24 text-center">
              {{ item.stock }} left
            </p>
          </div>
        </div>
      </div>
    </section>
    <section v-if="detailScreen">
      <div class="flex flex-row space-x-4 items-center">
        <button @click="detailScreen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>
        <p class="font-medium text-xl">{{ selectedItem.name }}</p>
      </div>
      <div class="flex flex-col space-y-10">
        <div class="flex flex-row justify-between items-center space-x-8 mt-8">
          <div class="flex flex-row items-center space-x-8">
            <img
              :src="selectedItem.img_url"
              alt=""
              class="w-32 h-32 py-4 rounded-2xl"
              style="background-color: #caf1de"
            />
            <div class="space-y-3">
              <p>
                Current stock:
                <span class="font-medium">{{ selectedItem.stock }}</span>
              </p>
              <p>
                Current price:
                <span class="font-medium">€{{ selectedItem.price }}</span>
              </p>
            </div>
          </div>
          <div>
            <div class="flex flex-row items-center pt-2 w-32 justify-between">
              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
                @click="removeStock"
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
              <p>{{ stockAmount }}</p>

              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
                @click="addStock"
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
            <div class="flex flex-row items-center pt-2 w-32 justify-between">
              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
                @click="removePrice"
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
              <p>€{{ price }}</p>

              <button
                class="rounded-full p-1 flex bg-p-gray-100 hover:bg-gray-300"
                @click="addPrice"
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
          </div>
        </div>
        <button
          class="
            bg-p-red
            text-white
            px-4
            py-2
            rounded-xl
            w-1/3
            m-auto
            font-medium
            text-lg
          "
          @click="updateStock(selectedItem.topping_id, stockAmount, price)"
        >
          Update
        </button>
      </div>
    </section>
    <section v-if="graphScreen === true" class="">
      <div class="flex flex-row space-x-4 items-center mb-8">
        <button @click="graphScreen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>
        <p class="font-medium text-xl">Graph</p>
      </div>
      <div class="flex flex-row justify-center">
        <DoughnutChartComponent :stockData="stockData" :stockName="stockName" />
      </div>
    </section>
  </div>
</template>
