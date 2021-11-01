<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  setup() {
    let name: Ref<string | null> = ref(null)
    const checkInput = (inp: any) => {
      console.log(inp)
    }

    return {
      checkInput,
      name,
    }
  },
})
</script>

<template>
  <div class="flex justify-end">
    <form
      class="
        w-full
        max-w-3xl
        bg-white
        relative
        p-4
        md:p-10
        shadow-sm
        rounded-md
      "
    >
      <div class="flex items-center mb-10">
        <svg
          class="inline-block"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EF4444"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
        <h3
          class="
            mx-auto
            text-2xl
            sm:text-3xl
            text-red-500
            font-semibold
            text-center
          "
        >
          Create an Account
        </h3>
        <div class="w-8"></div>
      </div>

      <div class="md:flex justify-between">
        <div class="mb-5">
          <label class="block mb-1" for="name">Name</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-xs
              md:w-80
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="text"
            id="name"
            placeholder="John"
            v-model="name"
            @keyup="checkInput"
          />
          <div class="mb-2 mt-2 text-red-500">This field is required</div>
        </div>
        <div>
          <label class="block mb-1" for="surname">Surname</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-xs
              md:w-80
              lg:w-96
              border-2
              p-2
              px-4
            "
            type="text"
            id="surname"
            placeholder="Doe"
          />
        </div>
      </div>

      <div class="md:flex justify-between">
        <div class="mb-5 flex-1">
          <label class="block mb-1" for="email">Email</label>
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
            "
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div>
          <label class="block mb-1" for="telephone">Telephone</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-xs
              md:w-52
              lg:w-52
              border-2
              p-2
              px-4
            "
            type="tel"
            id="telephone"
            placeholder="+32 496 05 43 89"
          />
        </div>
      </div>

      <div class="md:flex justify-between">
        <div class="mb-5">
          <label class="block mb-1" for="password">Password</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-xs
              lg:w-72
              md:w-72
              border-2
              p-2
              px-4
            "
            type="password"
            id="password"
            placeholder="●●●●●●●●"
          />
        </div>
        <div>
          <label class="block mb-1" for="confirm">Confirm password</label>
          <input
            class="
              rounded-md
              outline-none
              border-gray-200
              box-border
              w-full
              max-w-xs
              md:w-72
              lg:w-72
              border-2
              p-2
              px-4
            "
            type="password"
            id="confirm"
            placeholder="●●●●●●●●"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style>
input[type='password']:not(:placeholder-shown) {
  /* letter-spacing: 0.125rem; */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  line-height: 24px;
}
</style>
