import { axiosInstance, axiosPrivateInstance } from '../utils/axios'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

// useAPIPrivate must be provide access_token from server if not it will keep calling refresh() state and request it
// use in auth state (pinia) on getUser,logout because this two methods need to provide acces_token from server
export function useAPIPrivate() {
  const authStore = useAuthStore()
  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true
          try {
            await authStore.refresh()
            prevRequest.headers['Authorization'] = authStore.accessToken
            return axiosInstance(prevRequest)
          } catch (error) {
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )
  })

  return axiosPrivateInstance
}

export function useAPI() {
  return axiosInstance
}
