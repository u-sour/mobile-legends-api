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
  <main>Home page</main>
</template>

<style></style>
