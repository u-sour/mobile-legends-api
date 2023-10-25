import { useAPI, useAPIPrivate } from '@/composables/useApi'

export interface HeroSpecial {
  _id?: string
  name: string
  type: string
  status: string
}

export const HeroSpecialtiesMethod = {
  findOne: async (_id: string | string[]) => {
    try {
      const { data } = await useAPI().get(`/api/v1/hero-specialties/specialty/${_id}`)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  find: async (selector?: object) => {
    try {
      const { data } = await useAPI().get(
        `/api/v1/hero-specialties/${JSON.stringify(selector || {})}`
      )
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  create: async (payload: HeroSpecial) => {
    try {
      const { data } = await useAPIPrivate().post('/api/v1/hero-specialties', payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  edit: async (payload: HeroSpecial) => {
    try {
      const _id = payload._id
      const { data } = await useAPIPrivate().patch(`/api/v1/hero-specialties/${_id}`, payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  delete: async (_id: string) => {
    try {
      const { data } = await useAPIPrivate().delete(`/api/v1/hero-specialties/${_id}`)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  }
}
