<template>
  <div id="actions" class="p-1">
    <template v-if="deleteConfirmation">
      <Vue3Marquee :duration="5">
        <i class="bi bi-exclamation-triangle"></i>&nbsp;{{ AlertMessage.deleteConfirm }}
      </Vue3Marquee>
      <br />
      <button
        class="btn btn-primary me-1"
        @click="
          () => {
            $emit('delete')
            cancel()
          }
        "
        aria-label="yes-button"
      >
        Yes
      </button>
      <button class="btn btn-light" @click="cancel" aria-label="cancel-button">Cancel</button>
    </template>
    <template v-else>
      <button class="btn btn-warning me-1" @click="$emit('edit')" aria-label="edit-button">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" @click="confirm" aria-label="delete-button">
        <i class="bi bi-trash"></i>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import AlertMessage from '@/utils/alert-message'
import { Vue3Marquee } from 'vue3-marquee'
import { ref } from 'vue'

const deleteConfirmation = ref(false)
const confirm = () => {
  deleteConfirmation.value = true
}
const cancel = () => (deleteConfirmation.value = false)
</script>

<style scoped></style>
