<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { TimelineLite } from 'gsap'

export default defineComponent({
  setup() {
    const count = ref(0)
    const right = ref(true)

    const testArr = [
      'src/assets/images/forestiere-nobg.png',
      'src/assets/images/pepperoni-nobg.png',
      'src/assets/images/supreme-nobg.png',
      'src/assets/images/forestiere-nobg.png',
      'src/assets/images/pepperoni-nobg.png',
      'src/assets/images/supreme-nobg.png',
    ]

    const forward = async () => {
      const timeline = new TimelineLite()
      await timeline.to(`.pizza2`, 0.5, {
        css: { css: { right: '-50px' }, bottom: '-200px', rotate: 360 },
      })
    }
    //  css: { css: { left: '-30px' }, bottom: '-200px' },
    const backward = async () => {
      const timeline = new TimelineLite()
      await timeline.to(`.pizza2`, 0.5, {
        css: { css: { left: '-50px' }, bottom: '-200px', rotate: 360 },
      })
    }

    return {
      forward,
      testArr,
      count,
      backward,
      right,
    }
  },
  components: { AppHeader },
})
</script>

<template>
  <div>
    <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10">
      <div>
        <AppHeader />
      </div>
      <div class="mb-24">
        <div @click="forward">forward</div>
        <div @click="backward">backward</div>
      </div>
      <div class="flex justify-between items-center">
        <img
          class="pizza-img pizza1"
          :src="count === 0 ? testArr[5] : testArr[count - 1]"
          alt=""
        />

        <img
          @click="forward"
          class="pizza-img pizza2 absolute"
          :class="right ? 'right' : 'left'"
          :src="testArr[count]"
          alt=""
        />

        <img
          class="pizza-img pizza3"
          :src="count === 5 ? testArr[0] : testArr[count + 1]"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style>
.pizza-img {
  width: 280px;
}
.pizza1 {
  width: 100px;
  height: 100px;
}
.pizza2 {
}
.right {
  top: 50%;
  right: 50%;
  /* bring your own prefixes */
  transform: translate(50%, -50%);
}
.left {
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
.pizza3 {
  width: 100px;
  height: 100px;
}
</style>
