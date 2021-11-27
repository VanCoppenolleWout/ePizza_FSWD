<script lang="ts">
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { defineComponent } from 'vue'
import { fetchData } from './composables/useNetwork'
import { ActionTypes, MutationTypes, useStore } from './store/store'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <router-view></router-view>
  <!-- </transition> -->
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter-from {
  /* transform: translateX(-30%); */
  opacity: 0.5;
}
</style>
