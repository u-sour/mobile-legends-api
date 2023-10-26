import { useAPIPrivate } from '@/composables/useApi'
import ConvertFile from '@/utils/convert-file'
/* 
  Note: 
  icon_public_id,
  icon_url,
  icon_file_name,
  are exist after created

  Info: 
  use for init data on edit form & pass it to server side update image file on couldinary
*/
export interface HeroRole {
  _id?: string
  icon_public_id?: string
  icon_url?: string
  icon_file?: [{ name?: string; file?: File }]
  icon_file_name: string
  icon_base: string
  name: string
  status: string
}

export const HeroRolesMethod = {
  findOne: async (_id: string | string[]) => {
    try {
      const { data } = await useAPIPrivate().get(`/api/v1/hero-roles/${_id}`)
      // get & set icon_file
      const iconFile = await ConvertFile.fromUrl(data.icon_url, data.icon_file_name)
      data.icon_file = [{ name: data.icon_file_name, file: iconFile }]
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  find: async (selector: object) => {
    try {
      const { data } = await useAPIPrivate().get(
        `/api/v1/hero-roles?selector=${JSON.stringify(selector || {})}`
      )
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  create: async (payload: HeroRole) => {
    try {
      const { data } = await useAPIPrivate().post('/api/v1/hero-roles', payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  edit: async (payload: HeroRole) => {
    try {
      const _id = payload._id
      const { data } = await useAPIPrivate().patch(`/api/v1/hero-roles/${_id}`, payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  delete: async (_id: string) => {
    try {
      const { data } = await useAPIPrivate().delete(`/api/v1/hero-roles/${_id}`)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  }
}
