<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    let errorMsg: Ref<string> = ref('')
    const handleInput = (event: any) => {
      emit('handleInput', event.target)
      event.target.value === ''
        ? (errorMsg.value = 'This field is required')
        : (errorMsg.value = '')
    }
    return {
      handleInput,
      errorMsg,
    }
  },
  props: {
    label: String,
    id: String,
    type: String,
    placeholder: String,
  },
})
</script>

<template>
  <div
    class="mb-7 relative"
    :class="{ 'flex-1': id === 'email', 'md:ml-8': id === 'phone_nr' }"
  >
    <label class="block mb-1 font-semibold capitalize" :for="id">{{
      label
    }}</label>
    <input
      class="
        rounded-md
        outline-none
        border-gray-200
        box-border
        w-full
        max-w-md
        border-2
        p-2
        px-4
      "
      :class="
        id === 'email'
          ? 'md:max-w-sm'
          : id === 'phone_nr'
          ? 'lg:w-72'
          : 'md:w-72 md:max-w-xs lg:w-96'
      "
      autocomplete="on"
      
      :type="type"
      :id="id"
      :placeholder="placeholder"
      @blur="handleInput"
    />
    <div class="text-red-500 absolute mt-1" v-if="errorMsg">
      This field is required
    </div>
  </div>
</template>