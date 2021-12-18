<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import moment from 'moment'

export default defineComponent({
  setup(context, { emit }) {
    const time = context.dropdownArr![0]
    let selection = ref<Date | null>(time)

    watch(selection, () => {
      emit('dateSelection', selection)
    })

    return {
      selection,
      moment,
    }
  },

  props: {
    dropdownArr: { type: Array as () => Array<Date> },
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
      v-model="selection"
    >
      <option v-for="(item, index) in dropdownArr" :key="index" :value="item">
        {{ moment(item).format('HH:mm') }}
      </option>
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
