<template>
  <div class="brand-light-theme" :class="{ 'brand-dark-theme': isDark }">
    <h6 class="m-auto fs-3">MLBB API</h6>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>

<style scoped>
.brand-light-theme {
  color: var(--secondary);
}

.brand-dark-theme {
  color: var(--primary);
}
</style>
