import { defineStore } from 'pinia'
import { useAPI, useAPIPrivate } from '../composables/useApi'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name?: string
}

export interface State {
  user: User
  accessToken: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: '' as string
    }
  },
  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => (state.accessToken ? true : false)
  },
  actions: {
    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },
    async login(payload: LoginData) {
      try {
        const { data } = await useAPI().post(`/api/v1/auth/login`, payload)
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        throw error.response
      }
    },
    async register(payload: RegisterData) {
      try {
        const { data } = await useAPI().post(`/api/v1/auth/register`, payload)
        return data
      } catch (error: Error | any) {
        throw error.response
      }
    },
    async getUser() {
      try {
        const { data } = await useAPIPrivate().get(`/api/v1/auth/user`)
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.response
      }
    },
    async logout() {
      try {
        const { data } = await useAPIPrivate().post(`/api/v1/auth/logout`)
        this.accessToken = ''
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.response
      }
    },
    async refresh() {
      try {
        const { data } = await useAPI().post(`/api/v1/auth/refresh`)
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.response
      }
    }
  }
})
