<script setup>
import { ref, onMounted } from 'vue'
import CopyIcon from '@/icons/CopyIcon.vue'
import { useToast } from 'vue-toastification'
import ShareIcon from '@/icons/ShareIcon.vue'
import betImage from '@/assets/banner.png'
import Footer from '@/components/footerComponent.vue'

const toast = useToast()
const filteredData = ref([])
const data = ref([
  // {
  //   id: 1,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 1',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F1'
  // },
  // {
  //   id: 2,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 2',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F2'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // },
  // {
  //   id: 3,
  //   imgSrc: betImage,
  //   name: 'Bet-offer 3',
  //   description: 'Offers and welcome bonuses available',
  //   link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F3'
  // }
])

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

const filterLink = (id) => {
  filteredData.value = data.value.filter((d) => d.link === id)
}

onMounted(() => {
  if (data.value.length > 0) {
    filterLink(data.value[0]?.link)
  }
})
</script>

<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="home-component">
        <div class="home-header">
          <h1>Group links</h1>
          <p>copy and share links to different groups that you desire</p>
        </div>
        <div class="home-inner" v-if="data.length > 0">
          <div class="home-details">
            <div
              class="link-inner-details"
              :class="{ active: filteredData.length > 0 && d.link === filteredData[0].link }"
              @click="filterLink(d.link)"
              v-for="d in data"
              :key="d.link"
            >
              <img :src="d.imgSrc" :alt="d.name" class="link-image" />
              <p>{{ d.name }}</p>
              <div class="hover-link-info">
                <p>{{ d.description }}</p>
              </div>
            </div>
          </div>
          <div class="links-container">
            <div class="link-item" v-for="f in filteredData" :key="f.link">
              <p>{{ f.link }}</p>
              <div class="link-btn-container">
                <div class="link-btn-copy" @click="copyLink(f.link)">
                  <span> copy link</span>
                  <CopyIcon class="link-icon" />
                </div>
                <div class="link-btn-share" @click="shareLink(f.link)">
                  <ShareIcon class="link-icon-share" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nothing-container">
          <img src="../assets/nothing.png" alt="nothing" class="nothing-img" />
          <p>Nothing added yet</p>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<style scoped>
@import '@/style/home.css';
</style>
