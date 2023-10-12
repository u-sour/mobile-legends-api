import { useAuthStore } from '@/stores/auth'

export const authentication = {
  async install() {
    const authStore = useAuthStore()
    try {
      await authStore.attempt()
      return
    } catch (error) {
      return
    }
  }
}
