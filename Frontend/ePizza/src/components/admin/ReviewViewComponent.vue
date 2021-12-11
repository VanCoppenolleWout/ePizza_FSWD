<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'
import moment from 'moment'

export default defineComponent({
  setup() {
    const { get } = fetchData()

    const reviews: any = ref([])
    let finalRating: Ref<string | null> = ref(null)

    let ratingAr: any = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ])
    let tempAr: any = ref([])
    const token: string =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3OTg5ZTU4ZWU1ODM4OTgzZDhhNDQwNWRlOTVkYTllZTZmNWVlYjgiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BpenphLWJhY2tlbmQtNjdjMTMiLCJhdWQiOiJwaXp6YS1iYWNrZW5kLTY3YzEzIiwiYXV0aF90aW1lIjoxNjM4NjM2NjUxLCJ1c2VyX2lkIjoickRsV2g4Y3FyaE9QdUEwb3lyNlRFM0txaW4wMiIsInN1YiI6InJEbFdoOGNxcmhPUHVBMG95cjZURTNLcWluMDIiLCJpYXQiOjE2Mzg3MTA4MTQsImV4cCI6MTYzODcxNDQxNCwiZW1haWwiOiJkb2NlbnRAaG93ZXN0LmJlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRvY2VudEBob3dlc3QuYmUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.aYxwWs7nQH22OQZJkvVzUC3VZ0jmcRX2o2nRaR2f0XBNGCV9IOU2EJk57KXqJGrmJK2HCK6MzSZrVC05S7hk9ELaYIkTitv0_ngJvQHPZ0L7jcHuVLwyYC-GmbWTY1giHYqJnGT8aE3XHSyEJNg6MLBA31EVU5e25dKlbGCo5TQcf_mJcAf0ZE50X88HHA8swqysFq5XlMhIKi4pAwCgKA5b1_D-pmRzk_MlowzhPTo0pm4_RxMj5Q4QX5BKAX-QBjBZnXhRKgIK6W-QVGR3oCL1X-WRxpDVeCFvTbHFh8pxHq7p-Wpgl1sIdXBFQSZykUXicnT5AqruULK9kAsIXw'

    const getAllReviews = async () => {
      reviews.value = await get('/review/all', token)
      console.log(reviews.value)

      // show correct amount of stars
      for (const [key, value] of Object.entries(reviews.value)) {
        //@ts-ignore
        finalRating.value = value.stars
        //@ts-ignore
        console.log(value.date)
        var output = ratingAr.value.filter(
          //@ts-ignore
          (ratingAr: { id: string }) => ratingAr.id <= value.stars,
        )
        tempAr.value = output
      }
    }
    getAllReviews()

    return {
      reviews,
      moment,
    }
  },
})
</script>

<template>
  <div class="bg-white rounded-lg p-8" style="min-height: 240px">
    <h1 class="text-p-red text-2xl font-semibold mb-4">Reviews</h1>
    <section v-if="reviews.length > 0">
      <div v-for="(item, index) in reviews" :key="index" class="my-8">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row space-x-4 items-center">
            <button
              class="rounded-full p-3 flex bg-gray-300 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </button>
            <div>
              <p class="font-semibold">
                {{ item.user.name }} {{ item.user.lastname }}
              </p>
              <ul id="review">
                <li
                  v-for="index in item.stars"
                  :key="index"
                  class="inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
          <p class="hidden md:visible">
            {{ moment(item.date).format('DD/MM - hh:mm a') }}
          </p>
        </div>
        <div class="mt-4">
          <p class="text-sm font-medium mb-2">{{ item.title }}</p>
          <p class="w-2/3">{{ item.description }}</p>
          <p class="md:hidden text-xs">
            {{ moment(item.date).format('DD/MM - hh:mm a') }}
          </p>
        </div>
      </div>
    </section>
    <section
      v-else
      class="flex items-center self-center justify-center flex-1 mt-12"
    >
      <p class="font-medium text-sm">No reviews yet.</p>
    </section>
  </div>
</template>
