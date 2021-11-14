<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<template>
  <footer class="bg-footerbg relative bottom-0 px-40 pt-20 pb-10" style="background-color: #f1f0f2">
    <div class="flex flex-col justify-between space-y-10">
      <div class="flex flex-row justify-between">
        <div class="text-3xl text-p-gray font-bold">ePizza</div>
        <div class="flex flex-row space-x-20">
          <div class="space-y-3">
            <h3 class="text-2xl font-medium">About us</h3>
            <p>Why ePizza?</p>
            <p>Services</p>
            <p>Menu</p>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-medium">Follow us</h3>
            <p>Why ePizza?</p>
            <p>Services</p>
            <p>Menu</p>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-medium">Legal</h3>
            <p>Why ePizza?</p>
            <p>Services</p>
            <p>Menu</p>
          </div>
          <div class="space-y-3">
            <h3 class="text-2xl font-medium">Contact info</h3>
            <p>Why ePizza?</p>
            <p>Services</p>
            <p>Menu</p>
          </div>
        </div>
        <div>
          <span></span>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <p>© {{ new Date().getFullYear() }} ePizza, All rights reserved</p>
        <div class="flex flex-row items-center space-x-2">
          <svg
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <p>Makakstraat 69 | 8500 Kortrijk</p>
        </div>
      </div>
    </div>
  </footer>
</template>
