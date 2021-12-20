<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { useStore } from './store/store'

export default defineComponent({
  setup() {
    const { store } = useStore()
    const route = useRoute()
    const showSideBar = computed(() => route.meta.showSideBar)

    const admin = computed(() => {
      return store.getters.getAdmin
    })
    return { admin, showSideBar }
  },
  components: { SideBar },
})
</script>

<template>
  <SideBar v-if="admin && showSideBar" />
  <router-view v-slot="{ Component }">
    <transition
      :duration="{ enter: 400, leave: 400 }"
      name="fade"
      mode="out-in"
      appear
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
