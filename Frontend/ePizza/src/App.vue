<script lang="ts">
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'
import { defineComponent } from 'vue'
import { ActionTypes, useStore } from './store/store'

export default defineComponent({
  setup() {
    const { store } = useStore()
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      store.dispatch(ActionTypes.setUser, user)
    })
  },
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
