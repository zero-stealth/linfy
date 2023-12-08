<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input
          type="password"
          class="input-l"
          placeholder="Password (8 characters, uppercase, lowercase, number)"
          v-model="password"
        />
        <input
          type="password"
          class="input-l"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
        <button class="btn-f" type="submit">Sign up</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">Login</button>
        <span @click="goHome()" class="reverse">Go back home</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const authStore = useAuthStore()
const router = useRouter()
const password = ref('')
const errMsg = ref('')
const email = ref('')
const confirmPassword = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
}

const create = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/register`, {
        email: email.value,
        password: password.value,
        isAdmin: true
      })

      const token = response.data.token
      const isAdmin = response.data.isAdmin
      localStorage.setItem('email', email.value)
      authStore.updateToken(JSON.stringify(token))
      if (isAdmin) {
        authStore.updateAdmin(isAdmin)
        localStorage.setItem('admin', isAdmin)
        router.push({ name: 'Panel' })
      } else {
        router.push({ name: 'Home' })

      }
    } catch (error) {
      if (error.response.status === 400) {
        errMsg.value = 'User already exists!'
      } else {
        errMsg.value = 'Invalid email or password'
      }
    }
  } else {
    errMsg.value = 'Please enter all the required fields'
    reset()
  }
}

const login = () => {
  router.push({ name: 'AdminLogin' })
}

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style>
@import '@/style/auth.css';
.error-message {
  color: red;
}
</style>
