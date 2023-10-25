import { type Hero, HeroesMethod } from '@/methods/heroesMethod'
import { type HeroRole, HeroRolesMethod } from '@/methods/heroRolesMethod'
import { type HeroSpecial, HeroSpecialtiesMethod } from '@/methods/heroSpecialtiesMethod'

export interface Option {
  label: string
  value: any
}

export const SelectOptions = {
  heroOptions: async () => {
    const options: Array<Option> = []
    const heroes: [Hero] = await HeroesMethod.find()
    for (let index = 0; index < heroes.length; index++) {
      const hero = heroes[index]
      options.push({ label: hero.name, value: hero._id })
    }
    return options
  },
  roleOptions: async () => {
    const options: Array<Option> = []
    const roles: [HeroRole] = await HeroRolesMethod.find({ status: 'active' })
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index]
      options.push({ label: role.name, value: role._id })
    }
    return options
  },
  specialtyOptions: async () => {
    const options: Array<Option> = []
    const specialties: [HeroSpecial] = await HeroSpecialtiesMethod.find({ status: 'active' })
    for (let index = 0; index < specialties.length; index++) {
      const specialty = specialties[index]
      options.push({ label: specialty.name, value: specialty._id })
    }
    return options
  }
}
