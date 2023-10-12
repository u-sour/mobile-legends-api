<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-5">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              id="email"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              id="password"
              autocomplete="off"
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type LoginData, useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const form = reactive<LoginData>({
  email: '',
  password: ''
})
const errorMessage = ref<string>('')

const submit = async () => {
  await authStore
    .login(form)
    .then(() => {
      router.replace({ name: 'user' })
    })
    .catch((err) => {
      errorMessage.value = err.data.message
    })
}
</script>

<style scoped>
#login .card {
  max-width: 40vw;
  margin: auto;
}
</style>
