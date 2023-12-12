<template>
  <div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Update Group link</h1>
        <div class="form-group">
          <label for="title">Group title:</label>
          <input v-model="title" type="text" class="form-g-input" placeholder="penguin" id="title" />
        </div>
        <div class="form-group">
          <label for="logo">Group Logo:</label>
          <input
            @change="handleFileUpload"
            type="file"
            class="form-g-input"
            id="Image"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="link">Link:</label>
          <input
            v-model="link"
            type="text"
            class="form-g-input"
            placeholder="http://example.com"
            id="link"
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input
            v-model="description"
            type="text"
            class="form-g-input"
            placeholder="link for group"
            id="description"
          />
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <select v-model="country" class="form-g-input" id="country">
            <option disabled value="">Choose country</option>
            <option value="united-states">United States</option>
            <option value="united-Kingdom">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
          </select>
        </div>
        <button type="submit" class="btn-f-f">Update Job</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['formSubmit'])


const title = ref('')
const logo = ref(null)
const link = ref('')
const country = ref('')
const description = ref('')

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    logo.value = file
  }
}

function handleSubmit() {
  try {
    const formData = {
      title: title.value,
      logo: logo.value,
      link: link.value,
      country: country.value,
      description: description.value
    }

    emit('formSubmit', formData)
  } catch (err) {
    // console.log(err)
  }
}
</script>

<style>
@import '@/style/games.css';
</style>
