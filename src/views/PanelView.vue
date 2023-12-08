<template>
  <div class="panel-container">
    <div class="panel-bar" :class="[isOpen ? 'close-dash' : '']">
      <div class="panel-nav">
          <div class="pan-arrow-container " @click="goBack()">
            <span>Go home</span>
            <HomeIcon class="pan-arrow" />
          </div>
          <div class="panel-profile">
            <div class="panel-img" :style="{ backgroundImage: `url(${logo})` }"></div>
          </div>
        <div class="panel-btn-container">
          <button
            @click="setActivePage(UserManagement)"
            :class="getButtonClass(UserManagement)"
          >
            <GroupIcon class="icon-panel" />
            <span>Admin Management</span>
          </button>
          <button @click="setActivePage(GroupLinkManagement)" :class="getButtonClass(GroupLinkManagement)">
            <LinkIcon class="icon-panel" />
            <span>Link Management</span>
          </button>
          <button @click="setActivePage(PostGroupLink)" :class="getButtonClass(PostGroupLink)">
            <linkPostIcon class="icon-panel" />
            <span> Post Link</span>
          </button>
        </div>
      </div>
      <button @click="logout" :class="getButtonClass(logout)">
        <LogoutIcon class="icon-panel" />
        <span>Logout </span>
      </button>
    </div>
    <div class="panel-main">
      <component :is="activePage" />
      <div class="float-menu" @click="showMenu">
        <DashIcon class="float-m-icon" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, shallowRef } from 'vue'
import linkPostIcon from '@/icons/linkPostIcon.vue'
import LogoutIcon from '@/icons/logoutIcon.vue'
import GroupIcon from '@/icons/GroupIcon.vue'
import LinkIcon from '@/icons/LinkIcon.vue'
import DashIcon from '@/icons/DashIcon.vue'
import HomeIcon from '@/icons/homeIcon.vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'

const username = ref('admin')
const router = useRouter()
const isOpen = ref(false)

watchEffect(() => {
  username.value = localStorage.getItem('username')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
}

const goBack = () => {
  router.push({ name: 'Home' })
}
// pages
import UserManagement from '@/components/UserManagement.vue'
import GroupLinkManagement from '@/components/GroupLinkManagement.vue'
import PostGroupLink from '@/components/PostGroupLink.vue'

const activePage = shallowRef(UserManagement)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['panel-btn', activePage.value === page ? 'active-cp' : 'inactive-cp']
}

const logout = () => {
  localStorage.removeItem('token')
  router.push({ name: 'Home' })
}
</script>
<style>
@import '@/style/panel.css';
</style>
