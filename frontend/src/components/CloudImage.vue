<template>
  <AdvancedImage
    :cldImg="img"
    :plugins="plugins"
    :alt="name"
    role="img"
    :title="name"
    :aria-describedby="name"
  />
</template>

<script setup lang="ts">
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/vue'
import { Cloudinary } from '@cloudinary/url-gen'
// Import required actions
import { fill } from '@cloudinary/url-gen/actions/resize'

import { computed } from 'vue'

const props = defineProps({
  publicId: { type: String, required: true },
  name: { type: String, required: true }
})
// Create a Cloudinary instance and set your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME
  }
})
//plugins
const plugins = [lazyload({ rootMargin: '0px', threshold: 0.25 }), placeholder({ mode: 'blur' })]
// Instantiate a CloudinaryImage object for the image with the public ID
const img = computed(() => cld.image(props.publicId))
// Apply the transformation
img.value.resize(fill().width(40).height(40)).format('auto').quality('auto')
</script>

<style scoped></style>
