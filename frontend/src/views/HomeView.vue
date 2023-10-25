<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const heroes = ref([])

onMounted(async () => {
  // const res = await axios.get('/api/heroes')
  // heroes.value = res.data
})
</script>

<template>
  <div id="home">
    <div class="container mt-5">Home page</div>
  </div>
</template>

<style></style>
