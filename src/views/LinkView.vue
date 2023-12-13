<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router';
import OpenIcon from '../icons/OpenIcon.vue'
import CopyIcon from '@/icons/CopyIcon.vue'
import { useToast } from 'vue-toastification'
import ShareIcon from '@/icons/ShareIcon.vue'
import { ref, onMounted, computed } from 'vue'
import Footer from '@/components/footerComponent.vue'

const data = ref([])
const toast = useToast()
const route = useRoute()
const selectedCountry = ref('')
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const link = ref(data.value.length > 0 ? data.value[0]?.link : '')

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

const openLink = (link) => {
  window.open(link, '_blank')
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
  selectedCountry.value = route.params.country
})
</script>

<template>
  <div class="home-link-wrapper">
    <div class="home-link-container">
      <div class="home-link-component">
        <div class="home-link-header">
          <div>
            <h1>University Group Links</h1>
            <p>Copy and share links to different university groups across the world</p>
          </div>
        </div>
        <div class="home-link-inner" v-if="filteredData.length > 0">
          <div class="home-link-details">
            <div
              class="link-inner-details"
              :class="{ active: d.link === link }"
              @click="link = d.link"
              v-for="d in filteredData"
              :key="d.link"
            >
              <img :src="d.logo" :alt="d.title" class="link-image" />
              <div class="link-info">
                <div class="link-title">
                  <h1>{{ d.title }}</h1>
                  <OpenIcon class="open-icon" @click="openLink(d.link)"/>
                </div>
                <p @click="openLink(d.link)">{{ d.description }}</p>
              </div>
            </div>
          </div>
          <div class="links-container">
            <div class="link-item">
              <p>{{ link }}</p>
              <div class="link-btn-container">
                <div class="link-btn-copy" @click="copyLink(link)">
                  <span> Copy Link</span>
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
@import '@/style/link.css';
</style>
