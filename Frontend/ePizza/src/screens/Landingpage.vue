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
// import t from 'vue-i18n';

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
            {{ $t('landing_title') }}
            <span class="text-red-500">{{ $t('landing_title2') }}</span
            >.
          </h1>
          <h2 class="font-medium text-2xl pt-10 animation1">
            {{ $t('landing_subtitle') }}
            <span class="text-red-500">{{ $t('landing_subtitle2') }}</span
            >.
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
              {{ $t('btn_delivery') }}
            </button>
            <p class="font-semibold">{{ $t('landing_or') }}</p>
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
              {{ $t('btn_carryout') }}
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
                {{ $t('services_title1-1') }}
                <span class="text-p-red">{{ $t('services_title1-2') }}</span>
              </h2>
              <p class="font-light">
                {{ $t('services_text1') }}
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
                {{ $t('services_title2-1') }}
                <span class="text-p-red">{{ $t('services_title2-2') }}</span>
              </h2>
              <p class="font-light">
                {{ $t('services_text2') }}
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
                <span class="text-p-red">{{ $t('services_title3-1') }}</span>
                {{ $t('services_title3-2') }}
              </h2>
              <p class="font-light">
                {{ $t('services_text3') }}
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
                {{ $t('services_title4-1')
                }}<span class="text-p-red"> {{ $t('services_title4-2') }}</span>
              </h2>
              <p class="font-light">
                {{ $t('services_text4') }}
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
              <h1 class="text-p-red font-semibold text-3xl">{{ $t('landing_questions') }}</h1>
              <h2 class="font-medium text-2xl">{{ $t('landing_contact') }}</h2>
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
                <p class="text-p-gray-200 font-medium">{{ $t('landing_mail') }}</p>
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
