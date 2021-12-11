<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
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
