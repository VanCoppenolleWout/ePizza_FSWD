<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
// import Map from '../components/Map.vue'
import LoginComponent from '../components/LoginComponenet.vue'
import BannerComponent from '../components/BannerComponent.vue'
import { TimelineLite } from 'gsap'
import { useRouter } from 'vue-router'
import Image from '../components/Image.vue'

export default defineComponent({
  setup(props) {
    const userRegistered = ref(props.userCreated)
    const router = useRouter()

    const closeTab = () => (userRegistered.value = '0')

    const handleDelivery = () => {
      localStorage.setItem('delivery', 'true')
      router.push('/menu')
    }

    const handleCarryout = () => {
      localStorage.setItem('delivery', 'false')
      router.push('/menu')
    }

    // onMounted(() => {
    //   const timeline = new TimelineLite()

    //   timeline.from('.animation1', { y: '-50px', opacity: 0, stagger: 0.2 })
    //   timeline.from('.animation2', { y: '-50px', opacity: 0 }, '-=0.4')
    //   timeline.from('.animation3', { y: '-50px', opacity: 0 }, '-=0.2')
    // })

    const link = 'src/assets/images/pizza-bg.png'

    return {
      userRegistered,
      closeTab,
      handleCarryout,
      handleDelivery,
      link,
    }
  },
  components: {
    AppHeader,
    AppFooter,
    LoginComponent,
    BannerComponent,
    Map,
    Image,
  },
  props: {
    userCreated: String,
  },
})
</script>

<template>
  <div>
    <div class="container mx-auto p-8 md:px-0">
      <BannerComponent v-if="userRegistered === '1'" @close="closeTab" />
      <AppHeader mode="full" />

      <div class="md:mt-32 mt-16">
        <img
          class="
            lazyload
            absolute
            pizza-image
            hidden
            md:block
            w-input
            pointer-events-none
            transition-all
            ease
            duration-300
            img
          "
          v-lazy="link"
          alt=""
        />
        <!-- <Image source="src/assets/images/pizza-bg.png" /> -->

        <header id="header" class="m-w-top">
          <h1 class="font-semibold text-5xl md:text-6xl animation1">
            Newest, freshest and best pizza in
            <span class="text-red-500">Kortrijk</span>.
          </h1>
          <h2 class="font-medium text-2xl pt-10 animation1">
            Always wanted to try the freshest pizza in the whole wide world?
            Wait no longer and taste for
            <span class="text-red-500">youself</span>.
          </h2>
          <div class="flex flex-row items-center space-x-5 mt-6 animation1">
            <button
              class="
                rounded-xl
                bg-yellow-300
                py-4
                w-40
                text-white
                font-semibold
              "
              @click="handleDelivery"
            >
              DELIVERY
            </button>
            <p class="font-semibold">OR</p>
            <button
              class="
                rounded-xl
                bg-yellow-300
                py-4
                w-40
                text-white
                font-semibold
              "
              @click="handleCarryout"
            >
              CARRYOUT
            </button>
          </div>
        </header>
        <div class="m-w-landing" id="services">
          <div
            class="
              grid grid-cols-1
              lg:grid-cols-2
              gap-y-10
              justify-items-stretch
              pt-24
            "
          >
            <div
              class="
                m-w-card
                flex flex-col
                items-center
                bg-white
                rounded-2xl
                p-6
                space-y-4
                text-center
                cursor-default
                lg:justify-self-start
                animation2
              "
            >
              <h2 class="text-xl font-medium">
                New and <span class="text-p-red">improved</span>
              </h2>
              <p class="font-light">
                As a new company we strive to make the user experience a better
                experience with ePizza. We do this by placing the customer in
                the first place.
              </p>
            </div>
            <div
              class="
                m-w-card
                flex flex-col
                items-center
                bg-white
                rounded-2xl
                p-6
                space-y-4
                text-center
                cursor-default
                lg:justify-self-end
                animation2
              "
            >
              <h2 class="text-xl font-medium">
                Always <span class="text-p-red">fresh</span>
              </h2>
              <p class="font-light">
                We keep a promise to always use the freshest products for our
                artisanal pizza's. Our goal is to be the freshest in Kortrijk
                and surrounding cities.
              </p>
            </div>
            <div
              class="
                m-w-card
                flex flex-col
                items-center
                bg-white
                rounded-2xl
                p-6
                space-y-4
                text-center
                cursor-default
                lg:justify-self-start
                animation3
              "
            >
              <h2 class="text-xl font-medium">
                <span class="text-p-red">Fastest</span> in Kortrijk
              </h2>
              <p class="font-light">
                To compete with other companies we have hired a highly skilled
                workforce on the workfloor as well as on the streets so that you
                don't have to endlessly wait for your fresh pizza.
              </p>
            </div>
            <div
              class="
                m-w-card
                flex flex-col
                items-center
                bg-white
                rounded-2xl
                p-6
                space-y-4
                text-center
                cursor-default
                lg:justify-self-end
                animation3
              "
            >
              <h2 class="text-xl font-medium">
                Ready for the<span class="text-p-red"> Future</span>
              </h2>
              <p class="font-light">
                Our business relies on the web. Therefore we use the latest and
                greatest web technologies like Vue 3.
              </p>
            </div>
          </div>
          <div
            class="
              mt-20
              mb-20
              flex flex-row flex-wrap
              justify-between
              items-center
            "
          >
            <div class="space-y-3" id="contact">
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
                mt-4
              "
              style="width: 27rem"
            >
              <div>
                <p class="text-p-gray-200 font-medium">SEND US AN EMAIL</p>
                <p class="text-xl font-medium">info@epizza.com</p>
              </div>
              <a href="mailto:info@epizza.com">
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Map /> -->
    <AppFooter />
  </div>
</template>

<style>
.pizza-image {
  right: -250px;
  top: 700px;
}
@media (min-width: 1024px) {
  .pizza-image {
    right: -320px;
    top: 12rem;
  }
}
</style>
