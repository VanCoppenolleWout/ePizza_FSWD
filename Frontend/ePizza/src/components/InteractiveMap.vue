<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const selectLocation = () => {}

    let openedMarkerID = ref<any>(null)

    const openMarker = (id: any) => {
      openedMarkerID.value = id
    }

    return {
      selectLocation,
      openMarker,
      openedMarkerID,
      center: { lat: 50.823558, lng: 3.253541 },
      markers: [
        {
          id: 1,
          position: {
            lat: 50.823558,
            lng: 3.253541,
          },
        },
      ],
    }
  },
})
</script>

<template>
  <GMapMap
    :center="center"
    :zoom="14"
    map-type-id="terrain"
    class="w-full h-full"
  >
    <GMapCluster>
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="openMarker(m.id)"
        :icon="'src/assets/images/marker.png'"
      >
        <GMapInfoWindow
          :opened="openedMarkerID === m.id"
          :closeclick="true"
          @closeclick="openMarker(null)"
        >
          <div class="flex flex-row space-x-4 items-center">
            <div class="bg-p-red px-4 py-2 rounded-lg pointer-events-none">
              <p class="text-white font-medium">1</p>
            </div>
            <p class="text-lg">Graaf Karel de Goedelaan 6, Kortrijk</p>
          </div>
          <router-link
            to="/menu"
            class="
              cursor-pointer
              m-auto
              w-1/2
              text-white
              bg-p-red
              hover:bg-red-600
              p-2
              font-bold
              rounded-md
              flex
              justify-center
              items-center
              mt-6
            "
          >
            <p class="">Bestel</p>
          </router-link>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>
