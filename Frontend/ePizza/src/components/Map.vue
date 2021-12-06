<script lang="ts">
/* eslint-disable no-undef */
import { computed, ref, onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
const GOOGLE_MAPS_API_KEY = 'AIzaSyBOYHJY2dqs-bNqacxobU5CvYRJRoJAR6E'
export default {
  setup() {
    const currPos: any = computed(() => ({
      lat: 50.824709,
      lng: 3.251388,
    }))
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    let map = ref(null)
    let marker = ref(null)
    onMounted(async () => {
      await loader.load()
      //@ts-ignore
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 15,
      })
      //@ts-ignore
      marker.value = new google.maps.Marker({
        position: currPos.value,
        map: map,
      })
    })
    return { currPos, mapDiv, marker }
  },
}
</script>

<template>
  <div ref="mapDiv" style="width: 100%; height: 50vh"></div>
</template>
