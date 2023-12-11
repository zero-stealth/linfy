<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CopyIcon from '@/icons/CopyIcon.vue'
import { useToast } from 'vue-toastification'
import ShareIcon from '@/icons/ShareIcon.vue'
import Footer from '@/components/footerComponent.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const data = ref([])
const toast = useToast()
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
          <h1>University Group Links</h1>
          <p>copy and share links to different university groups accross the world</p>
        </div>
        <div class="home-inner" v-if="data.length > 0">
          <div class="home-details">
            <div
              class="link-inner-details"
              :class="{ active: d.link === link }"
              @click="link = d.link"
              v-for="d in data"
              :key="d.link"
            >
              <img :src="d.logo" :alt="d.title" class="link-image" />
              <p>{{ d.title }}</p>
              <div class="hover-link-info">
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
        <div v-else class="nothing-container">
          <img src="../assets/nothing.png" alt="nothing" class="nothing-img" />
          <p>Nothing links added yet</p>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
@import '@/style/home.css';
</style>
