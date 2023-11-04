<template>
  <nav
    class="navbar light-theme navbar-custom navbar-expand-lg bg-body-tertiary p-4"
    :class="{ 'dark-theme': isDark }"
  >
    <div class="container-xxl">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">
        <NavBarBrand></NavBarBrand>
      </RouterLink>
      <!-- <h1 class="text-light">site {{ siteData }}</h1> -->
      <!--toggle button for mobile nav-->
      <div class="d-flex align-items-center order-lg-2">
        <button
          class="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbar"
          aria-controls="appNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          v-if="isAuthenticated"
        >
          <span
            role="button"
            class="navbar-toggler-btn-light"
            :class="{ 'navbar-toggler-btn-dark': isDark }"
            ><i class="bi bi-list" aria-hidden="true"></i
          ></span>
        </button>
        <SwitchThemeBtn />
      </div>
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
            <!-- <li class="nav-item">
              <RouterLink :to="{ name: 'login' }" class="nav-link active" aria-current="page"
              >Login</RouterLink
              >
            </li> -->
            <!-- <li class="nav-item">
              <RouterLink :to="{ name: 'register' }" class="nav-link active" aria-current="page"
              >Register</RouterLink
              >
            </li> -->
            <!-- <SwitchThemeBtn /> -->
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
import { useAuthStore } from '@/stores/auth'
import { computed, ref, reactive, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useHead } from '@unhead/vue'
import SwitchThemeBtn from './SwitchThemeBtn.vue'
import NavBarBrand from './NavBarBrand.vue'

const isDark = useDark()
const router = useRouter()
const dynamicRoutes = useRoute()
const authStore = useAuthStore()
const username = computed(() => authStore.userDetail.username)
const isAuthenticated = computed(() => authStore.isAuthenticated)

// get routes
const getRoutes = ref<any>([])
const siteData = reactive<any>({})

watchEffect(() => {
  siteData.title = dynamicRoutes.meta.title
  siteData.description = dynamicRoutes.meta.description
  getRoutes.value = routes.filter(
    (r) =>
      (r.name === 'heroes' && isAuthenticated.value) ||
      (r.name === 'hero-roles' && isAuthenticated.value) ||
      (r.name === 'hero-specialties' && isAuthenticated.value)
  )
})

// meta tags for seo
useHead({
  title: computed(() => siteData.title),
  meta: [
    {
      name: 'description',
      content: computed(() => siteData.description)
    },
    {
      name: 'keywords',
      content:
        'mlbb api, free mlbb api, free mobile legends api, free api, rapidapi, API ml, API Mobile Legends, API Hero ML, RestAPI, API Free, API Gratis, RestAPI Dummy, API Dummy, API Dummy Gratis'
    }
  ]
})

const logout = async () => {
  await authStore
    .logout()
    .then(() => router.replace({ name: 'home' }))
    .catch((err) => console.log(err.message))
}
</script>

<style scoped>
.light-theme {
  background-color: var(--navbar-bg-color-light) !important;
  font-family: var(--header-en-font);
}
.navbar-toggler-btn-light {
  color: var(--secondary);
  font-size: 1.5rem;
}

/* change the brand and text color */
.light-theme .navbar-brand,
.light-theme.navbar-text {
  color: var(--navbar-text-color-light) !important;
}

/* change the link color */
.light-theme .navbar-nav .nav-link {
  color: var(--navbar-text-color-light) !important;
}

.dark-theme {
  background-color: var(--navbar-bg-color-dark) !important;
}

.navbar-toggler-btn-dark {
  color: var(--primary);
  font-size: 1.5rem;
}

/* change the brand and text color */
.dark-theme .navbar-brand,
.dark-theme.navbar-text {
  color: var(--navbar-text-color-dark) !important;
}

/* change the link color */
.dark-theme .navbar-nav .nav-link {
  color: var(--navbar-text-color-dark) !important;
}
</style>
