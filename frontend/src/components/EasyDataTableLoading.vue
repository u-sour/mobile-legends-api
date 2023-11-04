<template>
  <div class="text-center spinner-color-light" :class="{ 'spinner-color-dark': isDark }">
    <div class="spinner-border ms-auto" aria-hidden="true"></div>
    <br />
    <strong role="status">Loading...</strong>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<style scoped>
.spinner-color-light {
  color: var(--primary);
}

.spinner-color-dark {
  color: var(--primary);
}
</style>
