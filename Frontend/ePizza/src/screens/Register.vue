<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../interfaces/user'
import { signUp } from '../utils/network'
import RegisterComponent from '../components/RegisterComponent.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  setup() {
    const url = 'http://localhost:3001/user/signup'
    const signup = async () => {
      let user: User = {
        name: 'Woutroee',
        surname: 'Vancoppenolle',
        email: 'niggeronthetriggedrd2@gmail.com',
        birthdate: '2000-06-20',
        phone_nr: '+32496054389',
        password: 'test',
      }
      const test = await signUp(url, user)
      console.log(test)
    }
    return {
      signup,
    }
  },
  components: { RegisterComponent, AppHeader, AppFooter },
})
</script>

<template>
  <!-- <p @click="signup">register</p> -->

  <div class="container mx-auto p-8 md:p-0 md:pt-8 overflow-x-hidden">
    <AppHeader />
    <RegisterComponent class="mt-8 flex justify-center" />
  </div>
  <!-- <AppFooter /> -->
</template>

<style></style>
