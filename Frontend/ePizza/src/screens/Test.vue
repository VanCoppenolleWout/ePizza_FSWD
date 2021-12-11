<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { TimelineLite } from 'gsap'

export default defineComponent({
  setup() {
    const count = ref(0)
    const right = ref(true)

    const testArr = [
      {
        name: 'Cheese',
        img: 'src/assets/images/forestiere-nobg.png',
      },
      {
        name: 'Pepperoni',
        img: 'src/assets/images/pepperoni-nobg.png',
      },
      {
        name: 'Salami',
        img: 'src/assets/images/supreme-nobg.png',
      },
      {
        name: 'Cheesee',
        img: 'src/assets/images/forestiere-nobg.png',
      },
      {
        name: 'Pepperonie',
        img: 'src/assets/images/pepperoni-nobg.png',
      },
      {
        name: 'Salamie',
        img: 'src/assets/images/supreme-nobg.png',
      },
    ]

    const forward = async () => {
      // TweenMax.set('.pizza2', { clearProps: 'all' })
      const timeline = new TimelineLite()
      await timeline
        .to(`.middle`, 0.5, {
          ease: 'power2.out',
          css: {
            css: {
              left: 'auto',
              top: 'auto',
            },
            rotate: 360,
          },
        })
        .to(
          `.middle`,
          0.5,
          {
            css: {
              css: {
                right: '-160px',
                bottom: '-160px',
              },
              rotate: 360,
            },
          },
          '-=0.5',
        )
        .to(
          '.left',
          0.5,
          {
            css: {
              css: {
                right: '0',
                bottom: '0',
                left: '0',
                top: '0',
              },
              rotate: 360,
            },
          },
          '-=0.5',
        )

      // count.value += 1
    }
    //  css: { css: { left: '-30px' }, bottom: '-200px' },
    const backward = async () => {
      // const timeline = new TimelineLite()
      // await timeline.to(`.pizza2`, 0.5, {
      //   css: { css: { left: '-50px' }, bottom: '-200px', rotate: -360 },
      // })
      // TweenMax.set('.pizza2', { clearProps: 'all' })
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
    <div class="container mx-auto p-8 md:px-0 pb-36 lg:pb-10 h-screen">
      <div>
        <AppHeader />
      </div>
      <div class="mb-24">
        <div @click="forward">forward</div>
        <div @click="backward">backward</div>
      </div>
      <div class="flex justify-between items-center">
        <img
          v-for="(pizza, index) in testArr"
          :key="index"
          class="absolute mx-auto my-auto"
          :src="pizza.img"
          alt=""
          :class="
            count === index
              ? `absolute middle left-0 right-0 top-0 bottom-0  `
              : count + 1 === index
              ? '-left-40 -bottom-40 left'
              : count - 1 === index
              ? '-right-40 -bottom-40 right'
              : 'hidden'
          "
        />
      </div>
    </div>
  </div>
</template>

<style></style>
