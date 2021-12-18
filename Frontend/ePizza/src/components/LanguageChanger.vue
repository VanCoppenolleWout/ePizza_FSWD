<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let lang = ref<string | null>('nl')
    const handleChange = (e: any) => {
      localStorage.setItem('lang', e.target.value)
      window.location.reload()
    }

    const getLang = () => {
      if (localStorage.getItem('lang') !== null) {
        lang.value = localStorage.getItem('lang')
      }
    }
    getLang()

    return {
      handleChange,
      lang,
    }
  },

  props: {
    background: String,
  },
})
</script>

<template>
  <div class="inline-block relative w-64" style="width: 10rem">
    <select
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
      :style="
        background === 'white'
          ? 'background-color: #ffffff'
          : 'background-color: #f1f0f2'
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
</template>
