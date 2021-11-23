<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputComponent from '../components/InputComponent.vue'

export default defineComponent({
  setup() {
    let ratingAr: any = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ])

    const selectRating = (id: string) => {
        console.log(id)
    }

    return {
      ratingAr,
      selectRating,
    }
  },
  components: {
    InputComponent,
  },
})
</script>

<template>
  <div class="bg-white rounded-lg" style="height: 508px">
    <section
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
                @click="selectRating(rating.id)"
                class="
                  inline-block
                  cursor-pointer
                  rounded-md
                  bg-p-gray-100
                  ml-4
                  py-1
                  px-4
                  hover:bg-red-300w hover:bg-p-gray-200
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
              style="background-color: #faf7fa"
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
              "
              rows="3"
              placeholder="Type..."
              id="text"
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
              style="background-color: #faf7fa"
              class="
                rounded-md
                font-medium
                outline-none
                box-border
                w-full
                p-2
                px-4
                mt-4
              "
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
      >
        <p class="text-white">Submit review</p>
      </button>
    </section>
  </div>
</template>
