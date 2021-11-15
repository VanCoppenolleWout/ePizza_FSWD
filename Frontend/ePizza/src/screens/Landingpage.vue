<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    AppFooter,
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40 relative overflow-hidden">
      <AppHeader mode='full'/>
    <div class="mt-32">
      <img
        class="
          absolute
          top-48
          pizza-image
          hidden
          md:block
          w-96
          lg:w-input
          pointer-events-none
          transition-all
          ease-in
          duration-300
        "
        src="../assets/images/pizza-bg.png"
        alt=""
      />

      <header class="m-w-top">
        <h1 class="font-semibold text-6xl">
          Newest, freshest and best pizza in
          <span class="text-red-500">Kortrijk</span>.
        </h1>
        <h2 class="font-medium text-2xl pt-10">
          Always wanted to try the freshest pizza in the whole wide world? Wait
          no longer and taste for
          <span class="text-red-500">youself</span>.
        </h2>
        <div class="flex flex-row items-center space-x-5 mt-6">
          <button
            class="rounded-xl bg-yellow-300 py-4 w-40 text-white font-semibold"
          >
            DELIVERY
          </button>
          <p class="font-semibold">OR</p>
          <button
            class="rounded-xl bg-yellow-300 py-4 w-40 text-white font-semibold"
          >
            CARRYOUT
          </button>
        </div>
      </header>
      <div class="m-w-landing">
        <div
          class="
            grid grid-cols-1
            lg:grid-cols-2
            gap-y-10
            justify-items-stretch
            mt-24
          "
        >
          <div
            class="
              m-w-card
              flex flex-col
              justify-between
              items-center
              bg-white
              rounded-2xl
              p-6
              space-y-4
              text-center
              cursor-default
              lg:justify-self-start
            "
          >
            <h2 class="text-xl font-medium">
              New but <span class="text-p-red">improved</span>
            </h2>
            <p class="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
          </div>
          <div
            class="
              m-w-card
              flex flex-col
              justify-between
              items-center
              bg-white
              rounded-2xl
              p-6
              space-y-4
              text-center
              cursor-default
              lg:justify-self-end
            "
          >
            <h2 class="text-xl font-medium">
              Always <span class="text-p-red">fresh</span>
            </h2>
            <p class="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
          </div>
          <div
            class="
              m-w-card
              flex flex-col
              justify-between
              items-center
              bg-white
              rounded-2xl
              p-6
              space-y-4
              text-center
              cursor-default
              lg:justify-self-start
            "
          >
            <h2 class="text-xl font-medium">
              <span class="text-p-red">Fastest</span> in Kortrijk
            </h2>
            <p class="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
          </div>
          <div
            class="
              m-w-card
              flex flex-col
              justify-between
              items-center
              bg-white
              rounded-2xl
              p-6
              space-y-4
              text-center
              cursor-default
              lg:justify-self-end
            "
          >
            <h2 class="text-xl font-medium">
              <span class="text-p-red">Fastest</span> in Kortrijk
            </h2>
            <p class="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
          </div>
        </div>
        <div class="mt-20 mb-20 flex flex-row justify-between items-center">
          <div class="space-y-3">
            <h1 class="text-p-red font-semibold text-3xl">Any Questions?</h1>
            <h2 class="font-medium text-2xl">Contact us anytime.</h2>
          </div>
          <div
            class="
              flex flex-row
              justify-between
              bg-white
              px-8
              pt-4
              pb-5
              rounded-xl
              items-center
            "
            style="width: 27rem"
          >
            <div>
              <p class="text-p-gray-200 font-medium">SEND US AN EMAIL</p>
              <p class="text-xl font-medium">info@epizza.com</p>
            </div>
            <svg
              class="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7A7A7A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<style>
.pizza-image {
  right: -200px;
}
@media (min-width: 1024px) {
  .pizza-image {
    right: -280px;
  }
}
</style>
