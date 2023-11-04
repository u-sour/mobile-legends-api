<template>
  <img
    v-if="imgSrc"
    class="avatar-1 rounded-3 p-1"
    loading="lazy"
    :src="imgSrc"
    :alt="imageFile![0].name"
    :title="imageFile![0].name"
    role="Presentation"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  imageFile: { type: Array<{ name?: string; file?: File }> }
})

const imgSrc = computed(() => {
  if (props.imageFile && props.imageFile[0]) {
    return URL.createObjectURL(props.imageFile[0].file!)
  }
  return undefined
})
</script>

<style scoped></style>
