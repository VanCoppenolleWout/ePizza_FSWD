<script lang="ts">
import { defineComponent, Ref, ref, toRefs } from 'vue'
import InputComponent from '../components/InputComponent.vue'
import { fetchData } from '../composables/useNetwork'
import { Order } from '../interfaces/order'
import { Review } from '../interfaces/review'
import { postReview } from '../utils/network'

export default defineComponent({
  setup(context) {
    const title: Ref<string | null> = ref(null)
    const text: Ref<any> = ref(null)
    const errorMsg: Ref<string> = ref('')
    const formstate: Ref<boolean> = ref(true)
    const stars: Ref<number> = ref(0)
    const { admin } = toRefs(context)

    const { order }: { order: Order } = context
    if (order.review) {
      formstate.value = false
      stars.value = order.review.stars
      title.value = order.review.title
      text.value = order.review.description
    }
    if (admin.value === true) formstate.value = false

    const handleReview = async () => {
      if (title.value === null || text.value === null || stars.value === 0) {
        errorMsg.value = 'Please fill in all fields'
      } else {
        errorMsg.value = ''
        const review: Review = {
          order_id: order.order_id,
          user_id: undefined,
          guest_id: order.guest?.guest_id,
          title: title.value,
          description: text.value,
          stars: stars.value,
        }
        const submitReview = await postReview('review', review)
        formstate.value = false
      }
    }

    return {
      stars,
      title,
      text,
      formstate,
      handleReview,
    }
  },
  components: {
    InputComponent,
  },
  props: {
    order: {
      type: Object as () => Order,
      required: true,
    },
    admin: {
      type: Boolean,
    },
  },
})
</script>

<template>
  <div class="bg-white rounded-lg" style="height: 508px">
    <form
      @submit.prevent="handleReview"
      class="p-8 flex flex-col justify-between h-full"
    >
      <div
        :class="formstate === false ? 'pointer-events-none opacity-100' : ''"
      >
        <div>
          <div>
            <ul id="review" class="mt-4 flex sm:gap-4 gap-2 flex-wrap">
              <li
                v-for="index in 5"
                :key="index"
                @click="stars = index"
                @mouseover="stars = index"
                class="
                  block
                  cursor-pointer
                  rounded-md
                  py-1
                  px-4
                  hover:bg-red-300w hover:bg-yellow-200
                  transform
                  hover:scale-125
                  transition
                  ease-out
                  duration-300
                "
                :class="index <= stars ? 'bg-yellow-100' : 'bg-primary'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#FFC800"
                  stroke="#FFD700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  ></polygon>
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <label class="block text-left mt-4" for="text">
            <span class="text-gray-700 text-2xl font-semibold" v-if="admin"
              >Review</span
            >
            <span v-else class="text-gray-700 text-2xl font-semibold">{{
              $t('review_title')
            }}</span>
            <textarea
              class="
                form-textarea
                rounded-md
                outline-none
                mt-4
                block
                w-full
                resize-none
                p-2
                px-4
                font-medium
                bg-primary
              "
              rows="3"
              placeholder="Type..."
              id="text"
              v-model="text"
            ></textarea>
          </label>
        </div>
        <div class="mt-8">
          <label class="flex flex-col" for="title">
            <span class="text-gray-700 text-lg font-medium">{{
              $t('review_subtitle')
            }}</span>
            <input
              type="text"
              name="title"
              id="title"
              class="
                rounded-md
                font-medium
                outline-none
                box-border
                w-full
                p-2
                px-4
                mt-4
                bg-primary
              "
              v-model="title"
            />
          </label>
        </div>
        <div v-if="admin" class="mt-6">
          <h3 class="text-gray-700 text-lg font-medium">Review by</h3>
          <p v-if="order.user">
            {{ order.user?.name }} {{ order.user?.lastname }}
          </p>
          <p v-if="order.guest">
            {{ order.guest?.name }} {{ order.guest?.lastname }}
          </p>
        </div>
      </div>

      <button
        v-if="admin !== true"
        class="
          bg-p-red
          w-full
          rounded-md
          text-white
          font-semibold
          py-3
          mt-2
          lg:mt-8
          self-center
        "
        :class="formstate === false ? 'pointer-events-none opacity-50' : ''"
        type="submit"
      >
        <p v-if="formstate === true" class="text-white">
          {{ $t('btn_review') }}
        </p>
        <p v-else class="text-white">{{ $t('btn_review2') }}</p>
      </button>
    </form>
  </div>
</template>
