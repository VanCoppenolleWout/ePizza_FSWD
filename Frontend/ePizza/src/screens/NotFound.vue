<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

export default defineComponent({
  setup(context) {
    // const error: Ref<string | undefined> = ref(context.error)
  },
  components: { AppHeader },
  props: {
    error: String,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0 h-screen">
    <AppHeader mode="full" />
    <div class="md:mt-32 mt-16">
      <img
        class="
          absolute
          pizza-image
          hidden
          md:block
          pointer-events-none
          transition-all
          ease
          duration-300
          img
        "
        src="../assets/images/pizza-bg.png"
        alt=""
      />
      <div
        class="flex flex-col justify-center items-start"
        style="height: 60vh"
      >
        <section
          class="flex flex-col justify-center items-start"
          style="max-width: 40rem"
        >
          <div
            class="
              px-6
              py-3
              rounded-xl
              transform
              hover:scale-105
              transition
              ease-out
              duration-300
              cursor-default
              moving-bg
            "
          >
            <span class="text-lg opacity-90 font-medium">Page not found</span>
          </div>
          <h1 class="font-semibold text-5xl md:text-7xl text-red-700 mt-8">
            Oh no, Error 404!
          </h1>
          <p v-if="error" class="text-2xl mt-6">
            {{ error }}
          </p>
          <p v-else class="text-2xl mt-6">
            You came across our secret page... Maybe you are in the wrong spot?
          </p>
          <div
            class="
              flex flex-row
              items-center
              md:justify-start
              justify-between
              md:space-x-10
              mt-8
            "
          >
            <router-link
              to="/"
              class="
                font-medium
                px-6
                py-3
                bg-p-red
                text-white
                rounded-xl
                md:text-lg
              "
              >Back to homepage</router-link
            >
            <a href="#contact" class="font-medium md:text-lg">Contact us</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
.pizza-image {
  right: -250px;
  top: 700px;
  width: 900px;
}
@media (min-width: 1024px) {
  .pizza-image {
    right: -400px;
    top: 8rem;
  }
}
</style>
