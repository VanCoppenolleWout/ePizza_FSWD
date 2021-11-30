<script lang="ts">
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { fetchData } from './composables/useNetwork'
import { ActionTypes, MutationTypes, useStore } from './store/store'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  /* transform: translateX(-30%); */
  opacity: 0;
}
</style>
