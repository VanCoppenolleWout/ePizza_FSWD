<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    Basket,
  },
})
</script>

<template>
  <div class="p-8 lg:py-20 lg:px-40">
    <AppHeader />
    <div class="mt-20 flex flex-row justify-between">
      <div style="width: 50rem">
        <div>
          <h1 class="text-2xl font-semibold text-p-red pb-6">
            Existing details
          </h1>
          <div
            class="
              flex flex-row
              items-center
              space-x-8
              bg-white
              px-8
              py-10
              rounded-3xl
              mb-8
            "
          >
            <input type="radio" name="radio" id="radio1" />
            <div class="space-y-2 text-xl">
              <p>{{ 'Kerkstraat 41' }}, {{ 'Gavere' }}</p>
              <p>{{ 'Dikkelvenne' }}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-semibold text-p-red pb-6">New address</h1>
          <div
            class="
              flex flex-row
              items-center
              space-x-8
              bg-white
              px-8
              py-10
              rounded-3xl
              mb-8
            "
          >
            <input type="radio" name="radio" id="radio1" />
            <div class="space-y-2 text-xl">
              <p>{{ 'Kerkstraat 41' }}, {{ 'Gavere' }}</p>
              <p>{{ 'Dikkelvenne' }}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-semibold text-p-red pb-6">Payment type</h1>
          <div
            class="
              flex flex-row
              items-center
              space-x-8
              bg-white
              px-8
              py-10
              rounded-3xl
            "
          >
            <input type="radio" name="radio" id="radio1" />
            <div class="text-xl flex flex-col">
              <div>
                <input type="radio" name="payment" id="option-1" />
                <label for="option-1" class="cursor-pointer">
                  <span class="text-base">At location</span>
                </label>
              </div>
              <div>
                <input type="radio" name="payment" id="option-2" />
                <label for="option-1" class="cursor-pointer">
                  <span class="text-base">Bancontact (not yet available)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Basket />
    </div>
  </div>
</template>
