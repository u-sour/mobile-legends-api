<template>
  <div class="container min-h-inherit">
    <div class="min-h-inherit d-flex justify-content-center align-items-center">
      <div class="col-12 text-center">
        <i class="bi bi-emoji-frown fs-1"></i>
        <p class="fs-1 fw-bold">404 Page Not Found</p>
        <p class="fs-3">The page you requested cloud not be found.</p>
        <RouterLink
          :to="{ name: 'home' }"
          class="link-color-light fs-5"
          :class="{ 'link-color-dark': isDark }"
          role="button"
          >Back to home</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<style scoped>
.link-color-light {
  color: var(--primary) !important;
}
.link-color-dark {
  color: var(--secondary) !important;
}
</style>
