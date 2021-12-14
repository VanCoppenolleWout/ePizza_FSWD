<script lang="ts">
import { computed, defineComponent, reactive, ref, Ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import Basket from '../components/Basket.vue'
import InputComponent from '../components/InputComponent.vue'
import Loader from '../components/Loader.vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { fetchData } from '../composables/useNetwork'
import { Pizza } from '../interfaces/pizza'
import { User } from '../interfaces/user'
import { store } from '../store/store'

export default defineComponent({
  setup(context) {
    const { get, post } = fetchData()
    const { deletePizzasLocal } = useLocalStorage()
    const { delivery } = context
    const loader: Ref<boolean> = ref(false)
    const userInputDisabled: Ref<boolean> = ref(false)
    const addressInputDisabled: Ref<boolean> = ref(false)
    const userId: Ref<string> = ref('')
    const addressId: Ref<string> = ref('')
    const router: Router = useRouter()
    const error: Ref<boolean> = ref(false)
    const paymentOption: Ref<string> = ref('Paypal')

    const user: User = reactive({
      name: '',
      lastname: '',
      email: '',
    })

    const address = reactive({
      city: '',
      street: '',
      number: '',
      zip_code: '',
    })

    const firebaseUser = computed(() => {
      return store.getters.getUser
    })

    const getUserAddress = async () => {
      try {
        if (firebaseUser.value) {
          const data = await get(`/user/${firebaseUser.value.uid}`)

          userId.value = firebaseUser.value.uid
          user.name = data.name
          user.lastname = data.lastname
          user.email = data.email
          userInputDisabled.value = true

          if (data.addresses.length > 0) {
            address.city = data.addresses[0].city
            address.street = data.addresses[0].street
            address.zip_code = data.addresses[0].postal_code
            address.number = data.addresses[0].number.toString()
            addressId.value = data.addresses[0].address_id
            addressInputDisabled.value = true
          }
        }
      } catch (error) {
        addressInputDisabled.value = true
        userInputDisabled.value = true
      }
    }

    const placeOrder = async (pizzas: Pizza[]) => {
      try {
        let data: any
        let date = new Date()
        date.setMinutes(new Date().getMinutes() + 5)
        if (userInputDisabled.value && addressInputDisabled.value) {
          loader.value = true
          const body = {
            user: userId.value,
            address: addressId.value,
            pizzas: pizzas,
            time_preference: date,
            payment_method: paymentOption.value,
          }
          data = await post('/order', body)
          handleRoute(data)
        }

        if (userInputDisabled.value && !addressInputDisabled.value) {
          let date = new Date()
          date.setMinutes(new Date().getMinutes() + 5)
          for (let value of Object.values(address)) {
            if (value === '' && delivery == 'true') error.value = true
          }
          if (error.value !== true) {
            loader.value = true
            const body = {
              user: userId.value,
              address:
                delivery === 'true'
                  ? {
                      city: address.city,
                      zip_code: address.zip_code,
                      street: address.street,
                      number: address.number,
                    }
                  : undefined,
              pizzas: pizzas,
              time_preference: date,
              payment_method: paymentOption.value,
            }
            data = await post('/order', body)
            handleRoute(data)
          }
        } else {
          for (let value of Object.values(user)) {
            if (value === '') error.value = true
          }
          for (let value of Object.values(address)) {
            if (value === '' && delivery == 'true') error.value = true
          }

          if (error.value !== true) {
            loader.value = true
            const body = {
              user: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
              },
              address:
                delivery === 'true'
                  ? {
                      city: address.city,
                      zip_code: address.zip_code,
                      street: address.street,
                      number: address.number,
                    }
                  : undefined,
              pizzas: pizzas,
              time_preference: date,
              payment_method: paymentOption.value,
            }

            data = await post('/order', body)
            handleRoute(data)
          }
        }
      } catch (error) {}
    }

    const handleRoute = (data: any) => {
      deletePizzasLocal()
      router.push({
        name: 'tracker',
        params: { order: JSON.stringify(data) },
      })
    }

    getUserAddress()

    return {
      loader,
      user,
      address,
      userInputDisabled,
      addressInputDisabled,
      placeOrder,
      error,
      paymentOption,
    }
  },
  components: {
    AppHeader,
    Basket,
    InputComponent,
    Loader,
  },
  props: {
    delivery: String,
  },
})
</script>

<template>
  <div>
    <Loader v-if="loader" />
    <div class="container mx-auto p-8 md:px-0">
      <div
        class="
          bg-black bg-opacity-50
          fixed
          w-screen
          h-full
          top-0
          left-0
          z-10
          flex
          justify-center
          items-center
        "
        v-if="error"
        @click="error = false"
      >
        <div class="w-96 h-48 bg-white rounded-sm p-4 relative">
          <h3 class="text-xl text-red-600">Oh Snap!</h3>
          <p>Please fill in all fields!</p>
          <p
            class="
              absolute
              bottom-0
              mr-2
              mb-2
              right-0
              w-8
              cursor-pointer
              hover:underline
            "
          >
            Ok
          </p>
        </div>
      </div>
      <div>
        <AppHeader />
        <router-link to="/menu" class="hover:underline flex">
          <svg
            class="text-gray-700 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <p>Go back</p>
        </router-link>
      </div>
      <div class="md:flex items-start mt-12 pb-32">
        <div class="md:w-1/3 lg:mx-1 hidden md:block">
          <div class="md:h-80">
            <p class="font-bold text-gray-500 text-xl">01</p>
            <h3 class="font-bold text-2xl">Personal Details</h3>
          </div>
          <div class="md:h-80" v-if="delivery === 'true'">
            <p class="font-bold text-gray-500 text-xl">02</p>
            <h3 class="font-bold text-2xl">Shipping Details</h3>
          </div>
          <div>
            <p class="font-bold text-gray-500 text-xl">03</p>
            <h3 class="font-bold text-2xl">Payment Methods</h3>
          </div>
        </div>

        <form class="md:w-2/3 lg:w-1/2 mx-1">
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
              v-model="user.name"
              :disabled="userInputDisabled"
            />
            <InputComponent
              class="md:ml-0 w-full"
              id="name"
              placeholder="Doe"
              type="text"
              label="Lastname"
              :full="true"
              v-model="user.lastname"
              :value="user.lastname"
              :disabled="userInputDisabled"
            />

            <InputComponent
              class="md:ml-0 w-full"
              id="email"
              placeholder="johndoe@gmail.com"
              type="email"
              label="Email"
              :full="true"
              v-model="user.email"
              :value="user.email"
              :disabled="userInputDisabled"
            />
          </div>

          <div
            class="flex items-center mb-2 md:hidden"
            v-if="delivery === 'true'"
          >
            <p class="font-bold text-gray-500 text-lg mr-2">02</p>
            <h3 class="font-bold text-xl" v-if="delivery === 'true'">
              Shipping Details
            </h3>
          </div>

          <div class="h-80" v-if="delivery === 'true'">
            <InputComponent
              class="md:ml-0 w-full"
              id="city"
              placeholder="Kortrijk"
              type="text"
              label="City"
              :full="true"
              :disabled="addressInputDisabled"
              v-model="address.city"
            />
            <InputComponent
              class="md:ml-0 w-full"
              id="street address"
              placeholder="Graaf Karel De Goedelaan"
              type="text"
              label="Street Address"
              :full="true"
              :disabled="addressInputDisabled"
              v-model="address.street"
            />
            <div class="flex">
              <InputComponent
                class="md:ml-0 w-full mr-2"
                id="number"
                placeholder="32"
                type="text"
                label="Number"
                :full="true"
                :disabled="addressInputDisabled"
                v-model="address.number"
              />
              <InputComponent
                class="md:ml-2 w-full ml-2"
                id="zip code"
                placeholder="8500"
                type="text"
                label="Zip Code"
                :full="true"
                :disabled="addressInputDisabled"
                v-model="address.zip_code"
              />
            </div>
            <div
              v-if="addressInputDisabled"
              class="-mt-5 underline"
              @click="addressInputDisabled = false"
            >
              Change details
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
                justify-between
                items-center
                mb-4
              "
              :class="paymentOption === 'Paypal' ? 'border-p-red' : ''"
              @click="paymentOption = 'Paypal'"
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
                class="w-6 h-6 border-2 rounded-full flex relative"
                :class="paymentOption === 'Paypal' ? 'border-p-red' : ''"
              >
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
                  :class="paymentOption === 'Paypal' ? 'bg-p-red' : ''"
                ></div>
              </div>
            </div>
            <div
              class="border-2 rounded-md flex p-4 justify-between items-center"
              :class="paymentOption === 'Bancontact App' ? 'border-p-red' : ''"
              @click="paymentOption = 'Bancontact App'"
            >
              <div class="flex items-center">
                <img
                  class="h-10 mr-4"
                  src="../assets/images/mobile-pay.svg"
                  alt="bancontact logo"
                />
                <p class="text-lg font-semibold">Bancontact App</p>
              </div>

              <div
                class="w-6 h-6 border-2 rounded-full flex relative"
                :class="
                  paymentOption === 'Bancontact App' ? 'border-p-red' : ''
                "
              >
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
                  :class="paymentOption === 'Bancontact App' ? 'bg-p-red' : ''"
                ></div>
              </div>
            </div>
          </div>
        </form>

        <div class="w-0 lg:w-2/6 mx-1 flex justify-end mt-2">
          <Basket :orderPage="true" @placeOrder="placeOrder" />
        </div>
      </div>
    </div>
  </div>
</template>
