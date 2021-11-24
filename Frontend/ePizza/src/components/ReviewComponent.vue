<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import InputComponent from '../components/InputComponent.vue'
import { Review } from '../interfaces/review'
import { postReview } from '../utils/network'

export default defineComponent({
  setup() {
    let title: Ref<string | null> = ref(null)
    let text: Ref<any> = ref(null)
    let finalRating: Ref<string | null> = ref(null)
    let errorMsg: Ref<string> = ref('')

    let ratingAr: any = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ])

    let highlightedRatingAr: any = []
    let tempAr: any = ref([])

    const selectRating = (rating: any) => {
      finalRating.value = rating.id
      var output = ratingAr.value.filter(
        (ratingAr: { id: string }) => ratingAr.id <= rating.id,
      )

      highlightedRatingAr = []
      highlightedRatingAr.push(output)

      tempAr.value = highlightedRatingAr[0]
    }

    const handleReview = async () => {
      console.log(finalRating.value, text.value, title.value)
      if (
        title.value === null ||
        text.value === null ||
        finalRating.value === null
      ) {
        errorMsg.value = 'Please fill in all fields'
        console.log('iets is leeg')
      } else {
        errorMsg.value = ''
        console.log('submit review')
        let review: Review = {
          order_id: '',
          user_id: '',
          title: title.value,
          description: text.value,
          stars: parseInt(finalRating.value),
        }
        let submitReview = await postReview('/review', review)
      }
    }

    const handleChange = (input: any) => {
      //console.log(text.value)
      input.id === 'text' && input.value !== ''
        ? (text.value = input.value)
        : null
      input.id === 'title' && input.value !== ''
        ? (title.value = input.value)
        : null
    }

    return {
      ratingAr,
      tempAr,
      title,
      text,
      selectRating,
      handleChange,
      handleReview,
    }
  },
  components: {
    InputComponent,
  },
})
</script>

<template>
  <div class="bg-white rounded-lg" style="height: 508px">
    <form
      @submit.prevent="handleReview"
      class="p-8 flex flex-col justify-between h-full"
      style="width: 40rem"
    >
      <div>
        <div class="flex flex-row justify-between">
          <div></div>
          <div>
            <ul id="review" class="mt-4">
              <li
                v-for="(rating, index) in ratingAr"
                :key="index"
                @click="selectRating(rating)"
                @mouseover="selectRating(rating)"
                class="
                  inline-block
                  cursor-pointer
                  rounded-md
                  ml-4
                  py-1
                  px-4
                  hover:bg-red-300w hover:bg-yellow-200
                "
                :class="
                  tempAr.includes(rating) ? 'bg-yellow-100' : 'bg-primary'
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
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
            <span class="text-gray-700 text-2xl font-semibold"
              >Leave a review</span
            >
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
              @keyup="handleChange"
            ></textarea>
          </label>
        </div>
        <div class="mt-8">
          <label class="flex flex-col" for="title">
            <span class="text-gray-700 text-lg font-medium"
              >Title of review</span
            >
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
              @keyup="handleChange"
            />
          </label>
        </div>
      </div>
      <button
        class="
          bg-p-red
          w-1/2
          rounded-md
          text-white
          font-semibold
          py-3
          mt-2
          lg:mt-8
          self-center
        "
        type="submit"
      >
        <p class="text-white">Submit review</p>
      </button>
    </form>
  </div>
</template>
