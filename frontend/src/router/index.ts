import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // (not allow user enter to route user page without login)
    // if route user want to enter require auth & user doesn't login it will redirect to login page
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // (not allow user enter to route login or register page after login)
    // else if route user want to enter require guest & user already login login it will go to home page
    return next({ name: 'home' })
  } else {
    next()
  }
})

export default router
