<script setup>
import axios from 'axios'
import CopyIcon from '@/icons/CopyIcon.vue'
import { useToast } from 'vue-toastification'
import ShareIcon from '@/icons/ShareIcon.vue'
import { ref, onMounted, computed } from 'vue'
import FilterIcon from '../icons/FilterIcon.vue'
import Footer from '@/components/footerComponent.vue'

const data = ref([])
const toast = useToast()
const selectedCountry = ref('')
const isDropdownOpen = ref(false)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const link = ref(data.value.length > 0 ? data.value[0]?.link : '')
const countries = ['All countries', 'Canada', 'Australia', 'United States', 'United Kingdom']

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const getGroupLink = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/data/links`)
    data.value = response.data.length > 0 ? response.data : []
    if (data.value.length > 0) {
      link.value = data.value[0].link
    }
  } catch (err) {
    toast.error(err.response.data.message)
  }
}
const selectCountry = (country) => {
  selectedCountry.value = country
  isDropdownOpen.value = false
}

const filteredData = computed(() => {
  const countryToFilter = selectedCountry.value

  switch (countryToFilter) {
    case null:
    case '':
    case 'All countries':
      return data.value
    default:
      return data.value.filter((d) => d.country && d.country.includes(countryToFilter))
  }
})

const copyLink = (link) => {
  if (!navigator.clipboard) {
    toast.error('Clipboard API is not supported in this browser')
    return
  }

  navigator.clipboard
    .writeText(link)
    .then(() => {
      toast.success('Link copied to clipboard')
    })
    .catch((error) => {
      toast.error('Error copying link to clipboard: ' + error.message)
    })
}

const shareLink = (link) => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Share Link',
        text: 'Check out this link:',
        url: link
      })
      .then(() => toast.success('Link shared successfully'))
      .catch((error) => toast.error('Error sharing link: ' + error.message))
  } else {
    toast.error('Navigator Share API is not supported in this browser')
  }
}

onMounted(() => {
  getGroupLink()
})
</script>

<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="home-component">
        <div class="home-header">
          <div>
            <h1>University Group Links</h1>
            <p>copy and share links to different university groups accross the world</p>
          </div>
          <div class="custom-dropdown" id="customDropdown">
            <div class="selected-option" @mouseover="toggleDropdown">
              {{ selectedCountry || 'Filter by country' }}
              <FilterIcon class="dropdown-icon" />
            </div>
            <div class="dropdown-options" v-show="isDropdownOpen">
              <div
                class="option"
                v-for="(country, index) in countries"
                :key="index"
                @click="selectCountry(country)"
              >
                {{ country }}
              </div>
            </div>
          </div>
        </div>
        <div class="home-inner" v-if="filteredData.length > 0">
          <div class="home-details">
            <div
              class="link-inner-details"
              :class="{ active: d.link === link }"
              @click="link = d.link"
              v-for="d in filteredData"
              :key="d.link"
            >
              <img :src="d.logo" :alt="d.title" class="link-image" />
              <div class="link-info">
                <h1>{{ d.title }}</h1>
                <p>{{ d.description }}</p>
              </div>
            </div>
          </div>
          <div class="links-container">
            <div class="link-item">
              <p>{{ link }}</p>
              <div class="link-btn-container">
                <div class="link-btn-copy" @click="copyLink(link)">
                  <span> copy link</span>
                  <CopyIcon class="link-icon" />
                </div>
                <div class="link-btn-share" @click="shareLink(link)">
                  <ShareIcon class="link-icon-share" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="nothing-container" v-if="filteredData.length === 0">
            <img src="../assets/nothing.png" alt="nothing" class="nothing-img" />
            <p>No links added</p>
          </div>
        </div>
       </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
@import '@/style/home.css';
</style>
