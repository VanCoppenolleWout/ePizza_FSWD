<script lang="ts">
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { defineComponent } from 'vue'
import { fetchData } from './composables/useNetwork'
import { ActionTypes, MutationTypes, useStore } from './store/store'

export default defineComponent({
  setup() {
    const { store } = useStore()
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      const { get } = fetchData()
      const admin = await get('/user/admin', await user?.getIdToken())
      store.dispatch(MutationTypes.setAdmin, admin.admin)
      store.dispatch(ActionTypes.setUser, user)
    })
  },
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-leave-to,
.fade-enter-from {
  /* transform: translateX(-30%); */
  opacity: 0;
}
</style>
