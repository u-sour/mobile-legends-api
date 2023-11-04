import { useAPI, useAPIPrivate } from '@/composables/useApi'
import ConvertFile from '@/utils/convert-file'

export interface Hero {
  _id?: string
  code: string
  name: string
  lane: string
  roleIds: Array<string>
  specialtyIds: Array<string>
  release_year: string
  battle_points: string
  ticket: string
  diamond: string
  lucky_gem: string
  skins: Array<HeroSkin>
  skills?: Array<HeroSkill>
  base_attributes?: Array<HeroAttribute>
}

/* 
  Note: 
  icon_public_id,
  icon_url,
  icon_file_name,
  splash_art_public_id,
  splash_art_url,
  splash_art_file_name
  are exist after created
  
  Info: 
  use for init data on edit form & pass it to server side update image file on couldinary
*/
export interface HeroSkin {
  name: string
  icon_public_id?: string
  icon_url?: string
  icon_file?: [{ name?: string; file?: File }]
  icon_file_name: string
  icon_base: string
  splash_art_public_id?: string
  splash_art_url?: string
  splash_art_file?: [{ name?: string; file?: File }]
  splash_art_file_name: string
  splash_art_base: string
  status: string
}

export interface HeroSkill {
  skill_name: string
  skill_icon: string
  type: string
  cooldown: string
  manacost: string
  description: string
}

export interface HeroAttribute {
  movement_speed?: string
  physical_attack?: string
  physical_defense?: string
  physical_lifesteal?: string
  physical_penetration?: string
  magic_attack?: string
  magic_power?: string
  magic_penetration?: string
  magic_lifesteal?: string
  spell_vamp?: string
  magic_resistance?: string
  hp?: string
  mana?: string
  attack_speed?: string
  hp_regen_rate?: string
  mana_regen_rate?: string
  critical_strike_chance?: string
  critical_damage?: string
  cd_reduction?: string
  bs_cd_reduction?: string
  healing_effect?: string
  monster_damage_reduction?: string
  monster_damage?: string
}

export const HeroesMethod = {
  count: async () => {
    try {
      const { data } = await useAPIPrivate().get(`/api/v1/heroes/count`)
      return data.index
    } catch (error: Error | any) {
      throw error.response
    }
  },
  findOne: async (_id: string | string[]) => {
    try {
      const { data } = await useAPIPrivate().get(`/api/v1/heroes/${_id}`)
      data.release_year = `${data.release_year}-01-01`
      // get & set icon_file & splash_art_file
      for (let index = 0; index < data.skins.length; index++) {
        const skin: HeroSkin = data.skins[index]
        if (skin.icon_url && skin.splash_art_url) {
          const iconFile = await ConvertFile.fromUrl(skin.icon_url, skin.icon_file_name)
          const splashArtFile = await ConvertFile.fromUrl(
            skin.splash_art_url,
            skin.splash_art_file_name
          )
          skin.icon_file = [{ name: skin.icon_file_name, file: iconFile }]
          skin.splash_art_file = [{ name: skin.splash_art_file_name, file: splashArtFile }]
        }
      }
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  find: async (selector?: object) => {
    try {
      const { data } = await useAPIPrivate().get(`/api/v1/heroes`)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  findWithAggregate: async (selector: { search?: string; page: number; rowsPerPage: number }) => {
    try {
      const { search, page, rowsPerPage } = selector
      const { data } = await useAPI().get(
        search
          ? `/api/v1/heroes/public?search=${search}&page=${page}&limit=${rowsPerPage}`
          : `/api/v1/heroes/public?page=${page}&limit=${rowsPerPage}`
      )
      // find hero skins
      for (let index = 0; index < data.heroes.length; index++) {
        const hero = data.heroes[index]
        const heroSkin = await useAPI().get(`/api/v1/hero-skins/public/id/${hero._id}`)
        hero.skins = heroSkin.data.heroes[0].skins
      }
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  create: async (payload: Hero) => {
    try {
      const { data } = await useAPIPrivate().post('/api/v1/heroes', payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  edit: async (payload: Hero) => {
    try {
      const _id = payload._id
      const { data } = await useAPIPrivate().patch(`/api/v1/heroes/${_id}`, payload)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  },
  delete: async (_id: string) => {
    try {
      const { data } = await useAPIPrivate().delete(`/api/v1/heroes/${_id}`)
      return data
    } catch (error: Error | any) {
      throw error.response
    }
  }
}
