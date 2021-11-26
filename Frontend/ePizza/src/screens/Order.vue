<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import InputComponent from '../components/InputComponent.vue'

export default defineComponent({
  setup() {},
  components: {
    AppHeader,
    Basket,
    InputComponent,
  },
})
</script>

<template>
  <div class="container mx-auto p-8 md:px-0">
    <AppHeader />
    <div class="md:flex items-start mt-12 pb-32">
      <div class="md:w-1/3 lg:mx-1 hidden md:block">
        <div class="md:h-80">
          <p class="font-bold text-gray-500 text-xl">01</p>
          <h3 class="font-bold text-2xl">Personal Details</h3>
        </div>
        <div class="md:h-80">
          <p class="font-bold text-gray-500 text-xl">02</p>
          <h3 class="font-bold text-2xl">Shipment Details</h3>
        </div>
        <div>
          <p class="font-bold text-gray-500 text-xl">03</p>
          <h3 class="font-bold text-2xl">Payment Methods</h3>
        </div>
      </div>

      <div class="md:w-2/3 lg:w-1/2 mx-1">
        <div class="md:h-80">
          <div class="flex items-center mb-2 md:hidden">
            <p class="font-bold text-gray-500 text-lg mr-2">01</p>
            <h3 class="font-bold text-xl">Personal Details</h3>
          </div>
          <InputComponent
            class="mr-2 w-full"
            id="name"
            placeholder="Johhn"
            type="text"
            label="Name"
            :full="true"
          />
          <InputComponent
            class="md:ml-2 w-full"
            id="name"
            placeholder="Doe"
            type="text"
            label="Last Name"
            :full="true"
          />

          <InputComponent
            class="md:ml-2 w-full"
            id="email"
            placeholder="johndoe@gmail.com"
            type="email"
            label="Email"
            :full="true"
          />
        </div>

        <div class="flex items-center mb-2 md:hidden">
          <p class="font-bold text-gray-500 text-lg mr-2">02</p>
          <h3 class="font-bold text-xl">Shipping Details</h3>
        </div>

        <div class="h-80">
          <InputComponent
            class="md:ml-2 w-full"
            id="street"
            placeholder="Kortrijk"
            type="text"
            label="City"
            :full="true"
          />
          <InputComponent
            class="md:ml-2 w-full"
            id="street"
            placeholder="Graaf Karel De Goedelaan"
            type="text"
            label="Street Address"
            :full="true"
          />
          <div class="flex">
            <InputComponent
              class="md:ml-2 w-full mr-2"
              id="number"
              placeholder="32"
              type="text"
              label="Number"
              :full="true"
            />
            <InputComponent
              class="md:ml-2 w-full ml-2"
              id="street"
              placeholder="8500"
              type="text"
              label="Zip Code"
              :full="true"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center mb-2 md:hidden">
            <p class="font-bold text-gray-500 text-lg mr-2">03</p>
            <h3 class="font-bold text-xl">Payment Method</h3>
          </div>
          <div
            class="
              border-2
              rounded-md
              flex
              p-4
              border-p-red
              justify-between
              items-center
              mb-4
            "
          >
            <div class="flex items-center">
              <img
                class="h-10 mr-4"
                src="../assets/images/paypal-logo.svg"
                alt="paypal logo"
              />
              <p class="text-lg font-semibold">PayPal</p>
            </div>

            <div
              class="w-6 h-6 border-p-red border-2 rounded-full flex relative"
            >
              <div
                class="
                  w-3
                  h-3
                  bg-p-red
                  rounded-full
                  absolute
                  top-1/2
                  left-1/2
                  transform
                  -translate-x-1/2 -translate-y-1/2
                "
              ></div>
            </div>
          </div>
          <div
            class="border-2 rounded-md flex p-4 justify-between items-center"
          >
            <div class="flex items-center">
              <img
                class="h-10 mr-4"
                src="../assets/images/mobile-pay.svg"
                alt="paypal logo"
              />
              <p class="text-lg font-semibold">Bancontact App</p>
            </div>

            <div class="w-6 h-6 border-2 rounded-full flex relative">
              <div
                class="
                  w-3
                  h-3
                  rounded-full
                  absolute
                  top-1/2
                  left-1/2
                  transform
                  -translate-x-1/2 -translate-y-1/2
                "
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-0 lg:w-2/6 mx-1 flex justify-center">
        <Basket />
      </div>
    </div>
  </div>
</template>
