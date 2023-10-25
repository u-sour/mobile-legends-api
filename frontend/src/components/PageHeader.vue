<template>
  <FormKit v-if="route.meta.backBtn" type="button" prefix-icon="left" label="Back" @click="back" />
  <div class="d-flex justify-content-between">
    <h1>
      {{ route.meta.pageTitle }}
    </h1>
    <h1><slot /></h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const back = () => router.go(-1)
</script>

<style scoped></style>
