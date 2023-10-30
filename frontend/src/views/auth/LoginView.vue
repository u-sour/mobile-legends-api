<template>
  <div id="login" class="min-h-inherit">
    <div class="container min-h-inherit d-flex">
      <div class="card card-body">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
const authStore = useAuthStore()
const router = useRouter()

const form = reactive<LoginData>({
  email: '',
  password: ''
})

const submit = async () => {
  await authStore
    .login(form)
    .then(() => {
      router.replace({ name: 'user' })
    })
    .catch((err) => {
      toast.error(err.data.message)
    })
}
</script>

<style scoped>
#login .card {
  margin: auto;
}
</style>
