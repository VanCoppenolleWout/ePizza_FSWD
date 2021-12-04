<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { fetchData } from '../../composables/useNetwork'

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

    const getAllReviews = async () => {
      reviews.value = await get(
        '/review/all',
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BpenphLWJhY2tlbmQtNjdjMTMiLCJhdWQiOiJwaXp6YS1iYWNrZW5kLTY3YzEzIiwiYXV0aF90aW1lIjoxNjM4NjM2NjUxLCJ1c2VyX2lkIjoickRsV2g4Y3FyaE9QdUEwb3lyNlRFM0txaW4wMiIsInN1YiI6InJEbFdoOGNxcmhPUHVBMG95cjZURTNLcWluMDIiLCJpYXQiOjE2Mzg2MzY2NTEsImV4cCI6MTYzODY0MDI1MSwiZW1haWwiOiJkb2NlbnRAaG93ZXN0LmJlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRvY2VudEBob3dlc3QuYmUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JQIYL1kDkvLvD5idRVjC1NDEj3swtlFnmp2GC4-Ab1ozSiaiC7KX9YqcAa8dd2KAHcjSrVI-UYQ2UJ_ouMMmY0en7XW2UBnbWl9nx8YOXxgAK_di3LqSBuJ87o4bLBhF35zPsiwETx7eDLn15A1ouH5LDcqqNDhyVDjwT6DowYWOHqcKFk7Zf5Ar2FlhuAcV3MoeeJ-5_QQ5YRjNnnTL5U5kBZ_EdDkylu1_7WAuEEWqzHHLTG-_6X9iYY4JEHGNKPhq-9RD_fEgqUrGAz6WW38-kmfZFJKHHhhxXkRHePH3Nx7wG-pTHrDy3Ff6zIg8iHE4vchEy3IUpiABMn_7uw',
      )

      // show correct amount of stars
      for (const [key, value] of Object.entries(reviews.value)) {
        
        //@ts-ignore
        finalRating.value = value.stars
        var output = ratingAr.value.filter(
          //@ts-ignore
          (ratingAr: { id: string }) => ratingAr.id <= value.stars,
        )
        tempAr.value = output
        console.log(tempAr.value, 'tempAr.value')
        //console.log(tempAr, 'getoonde sterren')
      }

      //console.log(reviews.value, 'incoming reviews')
    }
    getAllReviews()

    return {
      reviews,
      tempAr,
    }
  },
})
</script>

<template>
  <div class="bg-white rounded-lg p-8" style="min-height: 508px">
    <h1 class="text-p-red text-2xl font-semibold mb-4">Reviews</h1>
    <div v-for="(item, index) in reviews" :key="index" class="my-8">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row space-x-4 items-center">
          <button class="rounded-full p-3 flex bg-gray-300 pointer-events-none">
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
              <li v-for="item in tempAr" :key="item" class="inline-block" >
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
        <p>{{ item.date }}</p>
      </div>
      <div class="mt-4">
        <p class="text-sm font-medium mb-2">{{ item.title }}</p>
        <p class="w-2/3">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>
