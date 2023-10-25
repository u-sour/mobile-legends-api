<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-xxl">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand"
        ><img src="/favicon.ico" alt="mevn"
      /></RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#appNavbar"
        aria-controls="appNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="appNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="route in getRoutes" :key="route.name">
            <RouterLink :to="{ name: route.name }" class="nav-link active" aria-current="page">{{
              route.meta.pageTitle
            }}</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mx-2 mb-2 mb-lg-0">
          <li v-if="isAuthenticated" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ username }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink :to="{ name: 'user' }" class="dropdown-item" href="#"
                  >Profile</RouterLink
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li><button class="dropdown-item btn btn-danger" @click="logout">Logout</button></li>
            </ul>
          </li>
          <template v-else>
            <li class="nav-item">
              <RouterLink :to="{ name: 'login' }" class="nav-link active" aria-current="page"
                >Login</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'register' }" class="nav-link active" aria-current="page"
                >Register</RouterLink
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
import { useAuthStore } from '@/stores/auth'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const username = computed(() => authStore.userDetail.username)
const isAuthenticated = computed(() => authStore.isAuthenticated)

// get routes
const getRoutes = ref<any>([])
watchEffect(() => {
  getRoutes.value = routes.filter(
    (r) =>
      r.name === 'home' ||
      (r.name === 'heroes' && isAuthenticated.value) ||
      (r.name === 'hero-roles' && isAuthenticated.value) ||
      (r.name === 'hero-specialties' && isAuthenticated.value)
  )
})

const logout = async () => {
  await authStore
    .logout()
    .then(() => router.replace({ name: 'home' }))
    .catch((err) => console.log(err.message))
}
</script>

<style scoped></style>
