<script lang="ts">
import { defineComponent, ref } from 'vue'
import LanguageChanger from '../components/LanguageChanger.vue'

export default defineComponent({
  setup() {},
  components: { LanguageChanger },
})
</script>

<template>
  <footer
    class="bg-footerbg relative bottom-0 p-6 md:p-20 lg:px-28 xl:px-40 lg:pt-20 lg:pb-10"
    style="background-color: #f1f0f2"
  >
    <div class="flex flex-col justify-between space-y-10">
      <div
        class="
          items-start
          flex flex-col
          sm:flex-row
          justify-between
          sm:flex-wrap
          space-y-6
          sm:space-y-0
        "
      >
        <div class="text-3xl text-p-gray font-bold mx-2 my-2">ePizza</div>
        <div
          class="
            flex flex-wrap
            justify-between
            sm:justify-start sm:flex sm:flex-row sm:space-x-10
            md:space-x-12
            lg:space-x-20
          "
        >
          <div class="mx-2 my-2 w-5/12 sm:w-max">
            <h3 class="text-xl lg:text-2xl font-medium md:pb-3">
              {{ $t('footer_h1') }}
            </h3>
            <a href="#header" class="hover:underline cursor-pointer block">{{
              $t('footer_why')
            }}</a>
            <a href="#services" class="hover:underline cursor-pointer block">{{
              $t('footer_services')
            }}</a>
            <router-link
              to="/menu"
              class="hover:underline cursor-pointer block"
              >{{ $t('footer_menu') }}</router-link
            >
          </div>
          <div class="mx-2 my-2 w-5/12 sm:w-max">
            <h3 class="text-xl lg:text-2xl font-medium md:pb-3">
              {{ $t('footer_h2') }}
            </h3>
            <a
              href="https://www.instagram.com/howest_mct/"
              class="hover:underline cursor-pointer flex items-center"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/mct.howest"
              class="hover:underline cursor-pointer block"
              >Facebook</a
            >
            <a
              href="https://twitter.com/MCT_howest"
              class="hover:underline cursor-pointer block"
              >Twitter</a
            >
          </div>

          <div class="mx-2 my-2 w-5/12 sm:w-max">
            <h3 class="text-xl lg:text-2xl font-medium md:pb-3">
              {{ $t('footer_h3') }}
            </h3>
            <a href="#" class="hover:underline cursor-pointer block">{{
              $t('footer_privacy')
            }}</a>
            <a href="#" class="hover:underline cursor-pointer block">{{
              $t('footer_cookies')
            }}</a>
            <a href="#" class="hover:underline cursor-pointer block">{{
              $t('footer_conditions')
            }}</a>
          </div>
          <div class="mx-2 my-2 w-5/12 sm:w-max">
            <h3 class="text-xl lg:text-2xl font-medium md:pb-3">
              {{ $t('footer_h4') }}
            </h3>

            <a
              href="mailto:info@pizza.com"
              class="hover:underline cursor-pointer block"
              >info@pizza.com</a
            >
            <a href="tel:055808420" class="hover:underline cursor-pointer block"
              >055 80 84 20</a
            >
            <!-- <a href="#" class="hover:underline cursor-pointer block">Menu</a> -->
          </div>
        </div>
        <LanguageChanger background="" />
      </div>

      <div
        class="
          flex flex-col-reverse
          items-center
          sm:flex-row sm:justify-between
        "
      >
        <p class="my-6">
          © {{ new Date().getFullYear() }} ePizza,
          <span>{{ $t('footer_rights') }}</span>
        </p>
        <div class="flex flex-row items-center space-x-2 mb-4 sm:mb-0">
          <svg
            class="stroke-current text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
          <p class="text-sm sm:text-base">
            Graaf Karel de Goedelaan 6 | 8500 Kortrijk
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
