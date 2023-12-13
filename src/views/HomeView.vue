<script setup>
import australiaImg from '@/assets/australia.jpg'
import { useToast } from 'vue-toastification'
import kingdomImg from '@/assets/kingdom.png'
import canadaImg from '@/assets/canada.png'
import statesImg from '@/assets/states.png'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const selectedCountry = ref('')
const countries = [
  { name: 'canada', image: canadaImg },
  { name: 'australia', image: australiaImg },
  { name: 'united States', image: statesImg },
  { name: 'united Kingdom', image: kingdomImg }
]

const selectCountry = (country) => {
  selectedCountry.value = country.name
  toast.success(`Group links for ${country.name}`)
  router.push({ name: 'Links', params: { country: country.name } })
}
</script>

<template>
  <div class="home-card-wrapper">
    <h1>Choose a country to get it's group links</h1>
    <div v-for="country in countries" :key="country.name" @click="selectCountry(country)" class="link-card">
      <img :src="country.image" alt="Country Image" class="country-image">
      <h1>{{ country.name }}</h1>
    </div>
  </div>
</template>

<style scoped>
@import '@/style/home.css';
</style>
