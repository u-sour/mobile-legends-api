<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <p class="p-1 fs-6">
        Made with ❤️ by
        <a
          href="https://sour-dev.vercel.app/"
          target="_blank"
          class="link-color-light fw-bold text-decoration-none"
          :class="{ 'link-color-dark': isDark }"
          >Sour.Dev</a
        >
        <br />
        Copyright &copy; {{ years }}
      </p>

      <a
        href="https://github.com/u-sour"
        target="_blank"
        class="link-color-light fs-1"
        :class="{ 'link-color-dark': isDark }"
        ><i class="bi bi-github"></i
      ></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDark } from '@vueuse/core'
const isDark = useDark()
const years = moment().format('YYYY') !== '2023' ? `2023-${moment().format('YYYY')}` : '2023'
</script>

<style scoped>
.link-color-light {
  color: var(--primary) !important;
  opacity: 0.7;
  transition: ease 1s;
}
.link-color-light:hover,
.link-color-light:active {
  color: var(--primary) !important;
  opacity: 1;
}

.link-color-dark {
  color: var(--secondary) !important;
  opacity: 0.7;
  transition: ease 1s;
}
.link-color-dark:hover,
.link-color-dark:active {
  color: var(--secondary) !important;
  opacity: 1;
}
</style>
