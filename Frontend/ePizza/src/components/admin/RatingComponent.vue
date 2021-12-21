<script lang="ts">
import { defineComponent } from 'vue'
import { Review } from '../../interfaces/review'

export default defineComponent({
  setup(props) {},
  props: {
    review: { type: Object as () => Review, required: true },
  },
})
</script>

<template>
  <div
    class="
      bg-white
      max-w-2xl
      rounded-lg
      shadow-sm
      hover:shadow-md
      transform
      transition
      ease-out
      duration-300
      hover:scale-[101%]
      p-4
      h-full
      max-h-96
      flex
      mb-4
    "
  >
    <div class="flex h-full items-start">
      <div class="rounded-full p-3 sm:p-4 flex bg-gray-300">
        <svg
          class="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div></div>
    </div>
    <div class="ml-8">
      <h3 class="text-gray-500 font-semibold mb-2" v-if="review.user">
        {{ review.user.name }} {{ review.user.lastname }}
      </h3>
      <h3 class="text-gray-500 font-semibold mb-2" v-if="review.guest">
        {{ review.guest.name }} {{ review.guest.lastname }}
      </h3>
      <div class="flex gap-1 -ml-1 mb-4">
        <svg
          v-for="index in review.stars"
          :key="index"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
      </div>

      <div>
        <h3 class="text-gray-500 font-semibold">{{ $t('rating_title') }}</h3>
        <p class="mb-2">{{ review.title }}</p>
        <h3 class="text-gray-500 font-semibold">{{ $t('rating_des') }}</h3>
        <p>
          {{ review.description }}
        </p>
      </div>
    </div>
  </div>
</template>
