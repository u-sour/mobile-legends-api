<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-5">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              v-model="form.username"
              class="form-control"
              id="username"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input
              type="text"
              v-model="form.first_name"
              class="form-control"
              id="first_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input
              type="text"
              v-model="form.last_name"
              class="form-control"
              id="last_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              v-model="form.email"
              class="form-control"
              id="email"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              id="password"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password-confirm" class="form-label">Confirm Password</label>
            <input
              type="password"
              v-model="form.password_confirm"
              class="form-control"
              id="password-confirm"
              autocomplete="off"
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RegisterData, useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const form = reactive<RegisterData>({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirm: ''
})
const errorMessage = ref<string>('')

const submit = async () => {
  await authStore
    .register(form)
    .then(() => {
      router.replace({ name: 'login' })
    })
    .catch((err) => {
      errorMessage.value = err.message
    })
}
</script>

<style scoped>
#register .card {
  max-width: 40vw;
  margin: auto;
}
</style>
