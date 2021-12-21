<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <nav
    class="
      z-50
      fixed
      bottom-0
      bg-white
      shadow-xl
      sm:flex
      w-screen
      h-16
      sm:hover:w-48
      hover:justify-start
      sm:h-screen sm:w-24 sm:transition-all sm:ease-in-out sm:duration-400
      group
    "
  >
    <div class="md:flex md:flex-col md:justify-between md:my-6">
      <ul
        class="
          h-full
          items-center
          sm:items-start sm:mt-2
          flex
          flex-row-reverse
          justify-around
          sm:justify-start sm:flex-col sm:gap-4
           pt-3
           md:pt-0
          px-6
          sm:px-0
        "
      >
        <router-link to="/orders" class="sm:ml-7">
          <div class="flex items-center router-link">
            <div
              class="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                router-link-svg
              "
            >
              <svg
                class="text-gray-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="26"
                viewBox="0 0 28 32"
              >
                <g id="order" transform="translate(-80 -10)">
                  <path
                    id="Path_77"
                    data-name="Path 77"
                    d="M107.633,18.144a4.106,4.106,0,0,0-.877-1.358l-5.683-5.571A4.945,4.945,0,0,0,98.083,10H82.333A2.308,2.308,0,0,0,80,12.286V39.714A2.308,2.308,0,0,0,82.333,42h23.333A2.308,2.308,0,0,0,108,39.714v-20a4.047,4.047,0,0,0-.367-1.571Zm-8.22-5.326,5.707,5.59a1.929,1.929,0,0,1,.4.731H98.667V12.423a2.111,2.111,0,0,1,.747.4Zm6.253,26.9H82.333V12.286h14v7.429a1.637,1.637,0,0,0,.51,1.215,1.706,1.706,0,0,0,1.24.5h7.583V39.714Zm-5.833-9.143H88.167a1.143,1.143,0,1,0,0,2.286H99.833a1.143,1.143,0,1,0,0-2.286Zm0-4.571H88.167a1.143,1.143,0,1,0,0,2.286H99.833a1.143,1.143,0,1,0,0-2.286ZM87,22.571a1.156,1.156,0,0,0,1.167,1.143h4.54a1.156,1.156,0,0,0,1.167-1.143h0a1.156,1.156,0,0,0-1.167-1.143h-4.54A1.156,1.156,0,0,0,87,22.571Z"
                    transform="translate(0 0)"
                  />
                </g>
              </svg>
            </div>
            <p
              class="
                ml-2
                text-md text-gray-500
                font-semibold
                router-link-p
                hidden
                sm:block
              "
            >
              {{ $t('side_order') }}
            </p>
          </div>
        </router-link>
        <router-link to="/stock" class="sm:ml-7">
          <div class="flex items-center router-link">
            <div
              class="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                router-link-svg
              "
            >
              <svg
                class="fill-current text-gray-500 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
              >
                <g
                  id="pizza-black-white"
                  transform="translate(84.893 32.001) rotate(180)"
                >
                  <g
                    id="Group_56"
                    data-name="Group 56"
                    transform="translate(60.449 25.035)"
                  >
                    <g id="Group_55" data-name="Group 55">
                      <path
                        id="Path_62"
                        data-name="Path 62"
                        d="M84.816,408.809l-1.2-3.124a24.607,24.607,0,0,1-21.9.041l-1.188,3.083a1.112,1.112,0,0,0,.568,1.42,28.886,28.886,0,0,0,11.526,2.422h.04a28.94,28.94,0,0,0,11.59-2.422A1.112,1.112,0,0,0,84.816,408.809Z"
                        transform="translate(-60.449 -405.685)"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_58"
                    data-name="Group 58"
                    transform="translate(62.593)"
                  >
                    <g id="Group_57" data-name="Group 57">
                      <path
                        id="Path_63"
                        data-name="Path 63"
                        d="M104.214.684a1.012,1.012,0,0,0-1.915,0L99.486,8.057a2.561,2.561,0,0,1,.277-.03,2.842,2.842,0,0,1,2.755,2.916,2.842,2.842,0,0,1-2.755,2.916,2.681,2.681,0,0,1-2.093-1.042L93.179,24.589a22.219,22.219,0,0,0,20.139-.041Zm.37,22.652a2.921,2.921,0,1,1,2.755-2.916A2.842,2.842,0,0,1,104.584,23.337Z"
                        transform="translate(-93.179)"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p class="ml-2 text-md text-gray-500 font-semibold hidden sm:block">
              {{ $t('side_stock') }}
            </p>
          </div>
        </router-link>
        <router-link to="/rating" class="sm:ml-7">
          <div class="flex items-center router-link">
            <div
              class="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                router-link-svg
              "
            >
              <svg
                class="fill-current text-gray-500"
                id="rating"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 32 32"
              >
                <path
                  id="Path_75"
                  data-name="Path 75"
                  d="M16,0A16,16,0,1,0,32,16,16.018,16.018,0,0,0,16,0Zm0,29.091A13.091,13.091,0,1,1,29.091,16,13.106,13.106,0,0,1,16,29.091Z"
                />
                <path
                  id="Path_76"
                  data-name="Path 76"
                  d="M87.194,75.572l-4.608-.67-2.061-4.176a1.456,1.456,0,0,0-2.611,0L75.854,74.9l-4.608.67a1.456,1.456,0,0,0-.807,2.483l3.334,3.25L72.986,85.9A1.456,1.456,0,0,0,75.1,87.43l4.121-2.167,4.121,2.167a1.455,1.455,0,0,0,.677.167h0a1.458,1.458,0,0,0,1.417-1.781l-.774-4.51L88,78.056a1.456,1.456,0,0,0-.807-2.483Zm-5.108,4.183a1.456,1.456,0,0,0-.419,1.289l.418,2.436L79.9,82.33a1.456,1.456,0,0,0-1.355,0l-2.188,1.15.418-2.436a1.456,1.456,0,0,0-.419-1.289l-1.77-1.725,2.446-.356a1.456,1.456,0,0,0,1.1-.8l1.094-2.216,1.094,2.216a1.456,1.456,0,0,0,1.1.8l2.446.356Z"
                  transform="translate(-63.22 -63.144)"
                />
              </svg>
            </div>
            <p class="ml-2 text-md text-gray-500 font-semibold hidden sm:block">
              {{ $t('side_reviews') }}
            </p>
          </div>
        </router-link>
        
        <router-link to="/" class="md:hidden sm:ml-7">
          <div class="flex items-center router-link">
            <div
              class="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                router-link-svg
              "
            >
              <svg
                class="stroke-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
              </svg>
            </div>
            <p class="ml-2 text-md text-gray-500 font-semibold hidden sm:block">
              Home
            </p>
          </div>
        </router-link>
      </ul>
      <router-link to="/" class="hidden md:block sm:ml-7">
        <div class="flex items-center router-link">
          <div
            class="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              router-link-svg
            "
          >
            <svg
              class="stroke-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
              <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
            </svg>
          </div>
          <p class="ml-2 text-md text-gray-500 font-semibold hidden sm:block">
            Home
          </p>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active .router-link-svg {
  --tw-bg-opacity: 1;
  background-color: rgba(252, 165, 165, var(--tw-bg-opacity));
  border-radius: 100%;
}
.router-link-active p {
  color: #f54749;
}
.router-link-active svg {
  fill: #f54749;
}

.router-link:hover .router-link-svg {
  --tw-bg-opacity: 1;
  background-color: rgba(252, 165, 165, var(--tw-bg-opacity));
}
.router-link:hover .router-link-svg {
  --tw-bg-opacity: 1;
  background-color: rgba(252, 165, 165, var(--tw-bg-opacity));
}
.router-link p {
  transition: opacity 1s ease-out;
  opacity: 0;
  height: 0;
  overflow: hidden;
  width: 0;
}
nav:hover p {
  opacity: 1;
  height: auto;
  width: auto;
}
.router-link:hover p {
  color: #f54749;
}

.router-link:hover svg {
  fill: #f54749;
}
</style>
