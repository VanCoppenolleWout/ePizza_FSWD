<script lang="ts">
import { AnySoaRecord } from 'dns'
import { defineComponent, Ref, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'
import DoughnutChartComponent from '../DoughnutChartComponent.vue'
import { Topping } from '../../interfaces/topping'
import useGraphql from '../../composables/useGraphql'

export default defineComponent({
  setup() {
    const { get, put } = fetchData()
    const { query } = useGraphql()

    const stock: any = ref([])
    const stockData: any = ref([])
    const stockName: any = ref([])
    const selectedItem: any = ref([])
    const animateCircle: Ref<Boolean> = ref(false)

    const stockAmount = ref<number>(0)
    const price = ref<number>(0)

    let detailScreen = ref<boolean>(false)
    let graphScreen = ref<boolean>(false)

    const getStock = async () => {
      stock.value = await query(
        `getAll`,
        `query getAll {
            getAll{
            topping_id
            name
            price
            stock
            img_url
            }
          }`,
      )

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
    const hideDetail = () => {
      selectedItem.value = null
      detailScreen.value = false
      graphScreen.value = false
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
      if (price.value > 0.5) {
        price.value = Math.round((price.value - 0.1) * 1e2) / 1e2
      }
    }

    const addPrice = () => {
      price.value = Math.round((price.value + 0.1) * 1e2) / 1e2
    }

    const updateStock = async (
      topping_id: string,
      stock: number,
      price: number,
    ) => {
      animateCircle.value = true
      const toppingInterface: any = {
        topping_id: topping_id,
        amount: stock,
        price: price,
      }

      await put('/topping/stock', toppingInterface)
      getStock()
      animateCircle.value = false
      hideDetail()
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
      animateCircle,
      showDetail,
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
  <div>
    <div class="bg-white p-6 shadow-lg rounded-md">
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
              <img
                :src="item.img_url"
                alt="item.img_url"
                class="w-10 h-10h hidden md:block"
              />
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
                hover:bg-red-600
              "
              @click="showDetail(item)"
            >
              <p class="text-white px-4 py-1 w-28 text-center font-medium">
                {{ item.stock }} {{ $t('stock_left') }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section v-if="detailScreen">
        <div class="flex flex-row items-center">
          <button @click="detailScreen = false">
            <svg
              class="stroke-current text-gray-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <p class="text-xl text-gray-500 font-semibold">
            {{ selectedItem.name }}
          </p>
        </div>
        <div class="flex flex-col space-y-10">
          <div
            class="flex flex-row justify-between items-center space-x-8 mt-8"
          >
            <div class="flex flex-row items-center space-x-8">
              <img
                :src="selectedItem.img_url"
                alt=""
                class="w-32 h-32 py-4 rounded-2xl"
                style="background-color: #caf1de"
              />
              <div class="space-y-3">
                <p>
                  {{ $t('stock_current') }}:
                  <span class="font-medium">{{ selectedItem.stock }}</span>
                </p>
                <p>
                  {{ $t('stock_currentprice') }}:
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
              transform
              transition
              hover:-translate-y-0.5 hover:bg-red-600
              ease-out
              duration-300
              hover:scale-[101%]
            "
            @click="updateStock(selectedItem.topping_id, stockAmount, price)"
          >
            <svg
              class="h-5 w-5 text-white inline-block animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              v-if="animateCircle"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p v-else>Update</p>
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
          <DoughnutChartComponent
            :stockData="stockData"
            :stockName="stockName"
          />
        </div>
      </section>
    </div>
  </div>
</template>
