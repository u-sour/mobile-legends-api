<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
