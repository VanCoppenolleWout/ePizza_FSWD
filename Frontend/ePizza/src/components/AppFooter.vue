<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let lang = ref<string | null>('nl');
    const handleChange = (e: any) => {
      localStorage.setItem('lang', e.target.value)
      window.location.reload()
    }

    
    const getLang = () => {
      if (localStorage.getItem('lang') !== null)
      {
        lang.value = localStorage.getItem('lang')
      }
    }
    getLang()
    
    return {
      handleChange,
      lang,
    }
  },
})
</script>

<template>
  <footer
    class="bg-footerbg relative bottom-0 p-20 lg:px-40 lg:pt-20 lg:pb-10"
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
        "
      >
        <div class="text-3xl text-p-gray font-bold mx-2 my-2">ePizza</div>
        <div class="sm:flex sm:flex-row sm:space-x-10 md:space-x-20">
          <div class="mx-2 my-2">
            <h3 class="text-2xl font-medium">{{ $t('footer_h1') }}</h3>
            <a href="#header" class="hover:underline cursor-pointer block"
              >{{ $t('footer_why') }}</a
            >
            <a href="#services" class="hover:underline cursor-pointer block"
              >{{ $t('footer_services') }}</a
            >
            <router-link to="/menu" class="hover:underline cursor-pointer block"
              >{{ $t('footer_menu') }}</router-link
            >
          </div>
          <div class="mx-2 my-2">
            <h3 class="text-2xl font-medium">{{ $t('footer_h2') }}</h3>
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

          <div class="mx-2 my-2">
            <h3 class="text-2xl font-medium">{{ $t('footer_h3') }}</h3>
            <a href="#" class="hover:underline cursor-pointer block"
              >{{ $t('footer_privacy') }}</a
            >
            <a href="#" class="hover:underline cursor-pointer block">{{ $t('footer_cookies') }}</a>
            <a href="#" class="hover:underline cursor-pointer block"
              >{{ $t('footer_conditions') }}</a
            >
          </div>
          <div class="mx-2 my-2">
            <h3 class="text-2xl font-medium">{{ $t('footer_h4') }}</h3>

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
        <!-- <div style="width: 100px"></div> -->
        <div class="inline-block relative w-64" style="width: 10rem">
          <select
            style="background-color: #f1f0f2"
            class="
              block
              appearance-none
              w-full
              border border-gray-400
              hover:border-gray-500
              px-4
              py-2
              pr-8
              rounded
              shadow
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="lang"
            @change="handleChange"
          >
            <option value="en">{{ $t('btn_english') }}</option>
            <option value="nl">{{ $t('btn_dutch') }}</option>
          </select>
          <div
            class="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              text-gray-700
            "
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between flex-wrap">
        <p class="my-6">
          © {{ new Date().getFullYear() }} ePizza, <span>{{ $t('footer_rights') }}</span>
        </p>
        <div class="flex flex-row items-center space-x-2">
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
          <p>Graaf Karel de Goedelaan 6 | 8500 Kortrijk</p>
        </div>
      </div>
    </div>
  </footer>
</template>
