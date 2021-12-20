<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    let errorMsg: Ref<string> = ref('')

    const handleInput = (e: any) => {
      emit('update:modelValue', e.target.value)
      e.target.value === ''
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
    full: Boolean,
    disabled: Boolean,
    modelValue: String,
    accountFull: Boolean,
    accountSmall: Boolean,
  },
  emits: ['update:modelValue'],
})
</script>

<template>
  <div
    class="mb-7 relative"
    :class="{
      'flex-1': id === 'email',
      'md:ml-8': id === 'phone_nr',
    }"
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
        border-2
        p-2
        px-4
        hover:border-red-200
        active:border-red-200
        focus:border-red-200
      "
      :class="
        id === 'email' || full
          ? 'md:max-w-sm'
          : id === 'phone_nr'
          ? 'lg:w-72 '
          : accountFull
          ? 'w-[80%] sm:w-full'
          : accountSmall
          ? 'w-1/2'
          : 'md:w-72 md:max-w-xs lg:w-96 '
      "
      autocomplete="on"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :disabled="disabled"
    />
    <div class="text-red-500 absolute mt-1 input-error" v-if="errorMsg">
      This field is required
    </div>
  </div>
</template>
