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
    const selectedMenu = ref(false)

    const closeTab = () => (userRegistered.value = '0')

    const handleDelivery = () => {
      localStorage.setItem('delivery', 'true')
      router.push('/menu')
    }

    const testfunction = (value: boolean) => {
      if (localStorage.getItem('delivery') === null) {
        selectedMenu.value = value
      } else {
        router.push('/menu')
      }
    }

    const handleCarryout = () => {
      localStorage.setItem('delivery', 'false')
      router.push('/locations')
    }

    function goBack() {
      router.push('/')
    }

    const link = 'src/assets/images/pizza-bg.png'

    return {
      userRegistered,
      closeTab,
      handleCarryout,
      handleDelivery,
      selectedMenu,
      testfunction,
      link,
      goBack,
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
    <div @click.self="goBack" class="container mx-auto p-8 md:px-0">
      <div
        class="
          bg-black bg-opacity-30
          fixed
          w-screen
          h-screen
          top-0
          left-0
          z-10
          flex
          justify-center
          items-center
          overflow-y-auto
        "
        v-if="selectedMenu"
      >
        <div class="w-[80vw] sm:w-[30rem] bg-white p-6 relative rounded-md">
          <div class="flex flex-col items-center">
            <div class="w-full flex flex-row justify-between items-center">
              <div class="w-8"></div>
              <h1 class="text-lg sm:text-2xl font-semibold text-p-red">
                {{ $t('popup_title') }}
              </h1>
              <div
                class="transform rotate-45 border-2 rounded-full p-1"
                @click="testfunction(false)"
              >
                <svg
                  class="
                    stroke-current
                    text-gray-400
                    cursor-pointer
                    hover:text-gray-700
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
            <p class="text-center mt-6">
              {{ $t('popup_sub') }}
            </p>

            <div
              class="
                flex flex-col
                sm:flex-row
                items-center
                space-y-3
                sm:space-y-0 sm:space-x-3
                md:space-x-5
                mt-6
                animation1
              "
            >
              <button
                class="
                  rounded-xl
                  bg-yellow-300
                  py-4
                  w-40
                  text-white
                  font-semibold
                  text-sm
                  sm:text-base
                  transform
                  transition
                  hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-md
                  ease-out
                  duration-300
                  hover:scale-[101%]
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
                  text-sm
                  sm:text-base
                  transform
                  transition
                  hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-md
                  ease-out
                  duration-300
                  hover:scale-[101%]
                "
                @click="handleCarryout"
              >
                {{ $t('btn_carryout') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BannerComponent v-if="userRegistered === '1'" @close="closeTab" />
      <AppHeader mode="full" @handleStatus="testfunction(true)" />

      <div class="md:mt-32 mt-16">
        <img
          class="
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
          src="../assets/images/pizza-bg.png"
          alt=""
        />

        <header id="header" class="m-w-top">
          <h1 class="font-semibold text-3xl md:text-6xl animation1">
            {{ $t('landing_title') }}
            <span class="text-red-500">{{ $t('landing_title2') }}</span
            >.
          </h1>
          <h2 class="font-medium text-xl md:text-2xl pt-10 animation1">
            {{ $t('landing_subtitle') }}
            <span class="text-red-500">{{ $t('landing_subtitle2') }}</span
            >.
          </h2>
          <div
            class="
              flex flex-row
              items-center
              space-x-3
              sm:space-x-5
              mt-6
              animation1
            "
          >
            <button
              class="
                rounded-xl
                bg-yellow-300
                py-4
                w-40
                text-white
                font-semibold
                text-sm
                sm:text-base
                transform
                transition
                hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-md
                ease-out
                duration-300
                hover:scale-[101%]
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
                text-sm
                sm:text-base
                transform
                transition
                hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-md
                ease-out
                duration-300
                hover:scale-[101%]
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
                transform
                transition
                hover:-translate-y-0.5 hover:shadow-sm
                ease-out
                duration-300
                hover:scale-[102%]
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
                transform
                transition
                hover:-translate-y-0.5 hover:shadow-sm
                ease-out
                duration-300
                hover:scale-[102%]
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
                transform
                transition
                hover:-translate-y-0.5 hover:shadow-sm
                ease-out
                duration-300
                hover:scale-[102%]
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
                transform
                transition
                hover:-translate-y-0.5 hover:shadow-sm
                ease-out
                duration-300
                hover:scale-[102%]
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
              my-10
              md:my-20
              flex flex-row flex-wrap
              justify-between
              items-center
            "
          >
            <div class="space-y-1 md:space-y-3" id="contact">
              <h1 class="text-p-red font-semibold text-xl md:text-3xl">
                {{ $t('landing_questions') }}
              </h1>
              <h2 class="font-medium text-lg md:text-2xl">
                {{ $t('landing_contact') }}
              </h2>
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
                <p class="text-p-gray-200 font-medium">
                  {{ $t('landing_mail') }}
                </p>
                <p class="text-xl font-medium">info@epizza.com</p>
              </div>
              <a
                href="mailto:info@epizza.com"
                class="
                  transform
                  transition
                  ease-out
                  duration-300
                  hover:scale-[115%]
                "
              >
                <svg
                  class="cursor-pointer hover:stroke-p-red"
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
