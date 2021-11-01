<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../interfaces/user'
import { signUp } from '../utils/network'
import RegisterComponent from '../components/RegisterComponent.vue'

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
        type: 'user',
      }
      const test = await signUp(url, user)
      console.log(test)
    }
    return {
      signup,
    }
  },
  components: { RegisterComponent },
})
</script>

<template>
  <!-- <p @click="signup">register</p> -->
  <RegisterComponent />
</template>
