<script lang="ts">
import { getAuth } from '@firebase/auth'
import { defineComponent, ref, Ref } from 'vue'
import SideBar from '../components/SideBar.vue'
import { fetchData } from '../composables/useNetwork'
import { Review } from '../interfaces/review'
import RatingComponent from '../components/admin/RatingComponent.vue'
import RatingSkeleton from '../components/admin/RatingSkeleton.vue'

export default defineComponent({
  setup() {
    const { get } = fetchData()
    const auth = getAuth()

    const reviews: Ref<Array<Review>> = ref([])

    const getReviews = async () => {
      const idToken = await auth.currentUser?.getIdToken()
      reviews.value = await get('/review/all', idToken)
    }

    getReviews()

    return { reviews }
  },
  components: {
    SideBar,
    RatingComponent,
    RatingSkeleton,
  },
})
</script>

<template>
  <div class="sm:ml-24 mb-16 md:mb-0">
    <div class="sm:p-8 p-4 sm:max-w-[80%] sm:m-auto">
      <h3 class="text-gray-700 text-2xl font-semibold mb-4">Reviews</h3>
      <p class="max-w-6xl text-gray-500 mb-8">
        {{ $t('rating_sub') }}
      </p>

      <div v-if="reviews.length > 0">
        <RatingComponent
          v-for="(review, index) in reviews"
          :key="index"
          :review="review"
        />
      </div>

      <div v-else>
        <RatingSkeleton v-for="index in 5" :key="index" />
      </div>
    </div>
  </div>
</template>
