<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import StickyFooter from './components/StickyFooter.vue'
</script>

<template>
  <NavBar />
  <RouterView class="mb-6" />
  <StickyFooter />
</template>

<style scoped></style>
