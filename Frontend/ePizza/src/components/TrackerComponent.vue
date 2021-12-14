<script lang="ts">
import { defineComponent, onBeforeUnmount, Ref, ref, toRefs } from 'vue'
import { Order } from '../interfaces/order'

export default defineComponent({
  setup(context) {
    let delivery = false
    const width1: Ref<number> = ref(0)
    const width2: Ref<number> = ref(0)
    const width3: Ref<number> = ref(0)
    const width4: Ref<number> = ref(0)
    const { order } = toRefs(context)

    const deliveryDate = new Date(
      Date.parse(order.value.delivery_date.toString()),
    )
    const orderDate = new Date(Date.parse(order.value.order_date.toString()))

    const totalTime = deliveryDate.getTime() - orderDate.getTime()
    const currTime = ref(deliveryDate.getTime() - new Date().getTime())

    const progressBar = () => {
      currTime.value = deliveryDate.getTime() - new Date().getTime()

      if (currTime.value <= 0) {
        width1.value = 100
        width2.value = 100
        width3.value = 100
        width4.value = 100
        clearInterval(intervalId)
      } else {
        if (totalTime - currTime.value < totalTime / 4) {
          width1.value = ((totalTime - currTime.value) / (totalTime / 4)) * 100
        } else if (totalTime - currTime.value < (totalTime / 4) * 2) {
          width1.value = 100
          width2.value =
            ((totalTime - currTime.value - totalTime / 4) / (totalTime / 4)) *
            100
        } else if (totalTime - currTime.value < totalTime - totalTime / 4) {
          width1.value = 100
          width2.value = 100
          width3.value =
            ((totalTime - currTime.value - (totalTime / 4) * 2) /
              (totalTime / 4)) *
            100
        } else {
          width1.value = 100
          width2.value = 100
          width3.value = 100
          width4.value =
            ((totalTime / 4 - currTime.value) / (totalTime / 4)) * 100
        }
      }
    }
    const intervalId = setInterval(progressBar, currTime.value / 100)

    onBeforeUnmount(() => {
      clearInterval(intervalId)
    })
    return {
      delivery,
      width1,
      width2,
      width3,
      width4,
    }
  },
  props: {
    order: { type: Object as () => Order, required: true },
  },
})
</script>

<template>
  <div class="bg-white rounded-lg">
    <section class="p-8 cursor-default">
      <div class="mb-8">
        <h1 class="text-center text-p-red text-2xl font-semibold mb-5">
          Thanks for ordering!
        </h1>
        <p class="text-center">{{ 'Tracking order...' }}</p>
      </div>
      <div class="space-y-4">
        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
        >
          <h2 class="font-semibold relative text-white z-50">
            Preparing pizza
          </h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width1 + '%' }"
          ></div>
        </div>
        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
        >
          <h2 class="font-semibold relative text-white z-50">
            Pizza is in the oven
          </h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width2 + '%' }"
          ></div>
        </div>
        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
        >
          <h2 class="font-semibold relative text-white z-50">Pizza is baked</h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width3 + '%' }"
          ></div>
        </div>

        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
          v-if="delivery"
        >
          <h2 class="font-semibold relative text-white z-50">
            Order is underway
          </h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width4 + '%' }"
          ></div>
        </div>
        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
          v-else
        >
          <h2 class="font-semibold relative text-white z-50">
            Ready at our shop
          </h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width4 + '%' }"
          ></div>
        </div>
        <div
          class="
            bg-p-gray-100
            rounded-xl
            transform
            hover:scale-105
            transition
            ease-out
            duration-300
            px-8
            py-6
            relative
            z-50
          "
          v-if="delivery"
        >
          <h2 class="font-semibold relative text-white z-50">At your door</h2>
          <div
            class="
              bg-red-500
              absolute
              top-0
              left-0
              rounded-xl
              h-full
              animate-pulse
              transition-all
              duration-300
              ease-in
              w-5
            "
            :style="{ width: width4 + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
