<template>
  <div class="container">
    <!---- Header ---->
    <PageHeader>
      <button v-if="route.meta.createBtn" class="btn btn-primary" @click="create">Create</button>
    </PageHeader>
    <!---- Content ---->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const create = () => router.push({ name: 'create.hero-roles' })
</script>

<style scoped></style>
