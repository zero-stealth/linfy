<template>
  <div class="game-container">
    <div class="game-game-p">
      <div class="game-cf">
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Link</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in linkData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.logo" alt="game-p" class="game-pi" />
                    <span>{{ data.title }}</span>
                  </div>
                </td>
                <td>
                  <span>{{ data.description }}</span>

                </td>
                 <td>
                  <span>{{ data.link }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editGame(EditGroupLink, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteGroupLink(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>

              <tr v-if="linkData.length === 0">
                <td colspan="8">No GroupLink posted!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isLinkOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <ExitIcon class="icon-exit" @click="showEdit" />
      </div>
      <div class="game-main-p">
        <component
          @formSubmit="updateGroupLink"
          :is="activePage"
        />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import axios from 'axios'
import ExitIcon from '@/icons/ExitIcon.vue'
import FileIcon from '@/icons/FileIcon.vue'
import DeleteIcon from '@/icons/DeleteIcon.vue'
import EditGroupLink from '@/components/EditGroupLink.vue'
import { ref, onMounted, shallowRef } from 'vue'
import { useToast } from 'vue-toastification'

const linkData = ref([])
const toast = useToast()
const isLinkOpen = ref(false)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const getGroupLink = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/data/links`
    )
    linkData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.message)
  }
}

const showEdit = () => {
  isLinkOpen.value = !isLinkOpen.value
}

const activePage = shallowRef(EditGroupLink)
const GroupLinkID = ref('')


const editGame = (GroupLink, id) => {
  activePage.value = GroupLink
  GroupLinkID.value = id
  showEdit()
}


async function updateGroupLink(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.title !== '') {
      formDataa.append('title', formData.title)
    }
    if (formData.country !== '') {
      formDataa.append('country', formData.country)
    }
    if (formData.logo !== null) {
      formDataa.append('logo', formData.logo)
    }
    if (formData.link !== '') {
      formDataa.append('link', formData.link)
    }
    if (formData.description !== '') {
      formDataa.append('description', formData.description)
    }
    const response = await axios.put(
      `${SERVER_HOST}/data/links/${GroupLinkID.value}`,
      formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    toast.success('group link updated')
  } catch (error) {
    toast.error(error.response.data.message)

  }
}


onMounted(() => {
  getGroupLink()
})

const deleteGroupLink = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/data/links/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success('group link deleted')
    await getGroupLink()
  } catch (error) {
    toast.error(error.response.data.message)

  }
}




</script>
<style scoped>
@import '@/style/management.css';
</style>
