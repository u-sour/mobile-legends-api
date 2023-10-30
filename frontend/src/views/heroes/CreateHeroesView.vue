<template>
  <div id="create-heroes">
    <FormKit
      type="form"
      id="create-heroes"
      v-model="formData"
      @submit="submit"
      :disabled="disabled"
    >
      <div class="row">
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="text"
            name="code"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            label="Code"
            validation="required"
            autocomplete="off"
            disabled
          />
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="text"
            name="name"
            label="Name"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            validation="required"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="select"
            label="Lane"
            name="lane"
            placeholder="Select One"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            :options="StaticSelectOptions.lanes"
            validation="required"
          />
        </div>
        <div class="col-12 col-lg-6">
          <FormKit
            type="select"
            multiple
            label="Roles"
            name="roleIds"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            :options="roleOptions"
            validation="required"
          />
        </div>
        <div class="col-12 col-lg-6">
          <FormKit
            type="select"
            multiple
            label="Specialties"
            name="specialtyIds"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            :options="specialtyOptions"
            validation="required"
          />
        </div>
        <!--------------------------------- Price --------------------------------------->
        <div class="col-12 col-md-3 col-lg-3">
          <FormKit
            type="text"
            name="battle_points"
            label="Battle Points"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-3 col-lg-3">
          <FormKit
            type="text"
            name="ticket"
            label="Ticket"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-3 col-lg-3">
          <FormKit
            type="text"
            name="diamond"
            label="Diamond"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-3 col-lg-3">
          <FormKit
            type="text"
            name="lucky_gem"
            label="Lucky Gem"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            autocomplete="off"
          />
        </div>
        <!----------------------------------------------------------------------------->
        <div class="col-12">
          <FormKit
            type="date"
            name="release_year"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            label="Release Year"
            validation="required|date_after:2015-12-31"
          />
        </div>
      </div>
      <!--------------------------------- skins --------------------------------------->
      <div v-auto-animate>
        <div class="d-flex justify-content-between">
          <h1>Skins</h1>
          <FormKit
            type="button"
            input-class="$remove:formkit-input btn btn-primary p-action-btn"
            @click="addSkins"
          >
            <FormKitIcon icon="add"></FormKitIcon>
          </FormKit>
        </div>
        <hr />
        <FormKit v-model="formData.skins" name="skins" type="list" dynamic #default="{ items }">
          <div v-for="(item, index) in items" :key="item" class="row">
            <FormKit type="group" :index="index">
              <FormKit
                type="text"
                label="Name"
                name="name"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-lg-3"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="file"
                label="Icon"
                name="icon_file"
                file-item-icon=""
                no-files-icon="fileImage"
                accept=".jpg,.jpeg,.png"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-lg-3"
                validation="required"
                autocomplete="off"
              >
                <template #prefix>
                  <ImagePreview :imageFile="formData.skins[index].icon_file" />
                </template>
              </FormKit>
              <FormKit
                type="file"
                label="Splash Art"
                name="splash_art_file"
                file-item-icon=""
                no-files-icon="fileImage"
                accept=".jpg,.jpeg,.png"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-lg-3"
                validation="required"
                autocomplete="off"
              >
                <template #prefix>
                  <ImagePreview :imageFile="formData.skins[index].splash_art_file" />
                </template>
              </FormKit>
              <div class="col-12 col-lg-1">
                <FormKit
                  type="select"
                  label="Status"
                  name="status"
                  placeholder="Select One"
                  :wrapper-class="{
                    'formkit-wrapper': false
                  }"
                  :options="StaticSelectOptions.status"
                  validation="required"
                />
              </div>
            </FormKit>

            <div
              class="col-12 col-lg-2 list-inline list-unstyled mt-lg-action-btn d-flex justify-content-lg-between"
            >
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="p-action-btn"
                  @click="formData.skins?.splice(index - 1, 0, formData.skins?.splice(index, 1)[0])"
                >
                  <FormKitIcon icon="arrowUp" />
                </FormKit>
              </li>
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="p-action-btn"
                  @click="formData.skins?.splice(index + 1, 0, formData.skins?.splice(index, 1)[0])"
                >
                  <FormKitIcon icon="arrowDown" />
                </FormKit>
              </li>
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="$remove:formkit-input btn btn-danger p-action-btn"
                  @click="formData.skins?.splice(index, 1)"
                >
                  <FormKitIcon icon="close" />
                </FormKit>
              </li>
            </div>
          </div>
        </FormKit>
      </div>
      <!--------------------------------- skills --------------------------------------->
      <div v-auto-animate>
        <div class="d-flex justify-content-between">
          <h1>Skills</h1>
          <FormKit
            type="button"
            input-class="$remove:formkit-input btn btn-primary p-action-btn"
            @click="addSkills"
          >
            <FormKitIcon icon="add"></FormKitIcon>
          </FormKit>
        </div>
        <hr />
        <FormKit v-model="formData.skills" name="skills" type="list" dynamic #default="{ items }">
          <div v-for="(item, index) in items" :key="item" class="row">
            <FormKit type="group" :index="index">
              <FormKit
                type="text"
                label="Name"
                name="skill_name"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-2"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Icon"
                name="skill_icon"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-2"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Type"
                name="type"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-1"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Cool Down"
                name="cooldown"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-1"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Mana Cost"
                name="manacost"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-1"
                validation="required"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Description"
                name="description"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-6 col-lg-3"
                validation="required"
                autocomplete="off"
              />
            </FormKit>

            <div
              class="col-12 col-md-6 col-lg-2 list-inline list-unstyled mt-lg-action-btn d-flex justify-content-lg-between"
            >
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="p-action-btn"
                  @click="
                    formData.skills?.splice(index - 1, 0, formData.skills?.splice(index, 1)[0])
                  "
                >
                  <FormKitIcon icon="arrowUp" />
                </FormKit>
              </li>
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="p-action-btn"
                  @click="
                    formData.skills?.splice(index + 1, 0, formData.skills?.splice(index, 1)[0])
                  "
                >
                  <FormKitIcon icon="arrowDown" />
                </FormKit>
              </li>
              <li class="list-inline-item">
                <FormKit
                  type="button"
                  input-class="$remove:formkit-input btn btn-danger p-action-btn"
                  @click="formData.skills?.splice(index, 1)"
                >
                  <FormKitIcon icon="close" />
                </FormKit>
              </li>
            </div>
          </div>
        </FormKit>
      </div>
      <!--------------------------------- attributes --------------------------------------->
      <div v-auto-animate>
        <div class="d-flex justify-content-between">
          <h1>Attributes</h1>
          <div class="d-flex">
            <FormKit
              type="button"
              input-class="$remove:formkit-input btn btn-primary p-action-btn me-2"
              @click="addAttributes"
            >
              <FormKitIcon icon="add"></FormKitIcon>
            </FormKit>
            <FormKit
              type="button"
              input-class="$remove:formkit-input btn btn-danger p-action-btn"
              @click="removeAttributes"
            >
              <FormKitIcon icon="close"></FormKitIcon>
            </FormKit>
          </div>
        </div>
        <hr />
        <FormKit
          v-model="formData.base_attributes"
          name="base_attributes"
          type="list"
          dynamic
          #default="{ items }"
        >
          <div v-for="(item, index) in items" :key="item" class="row">
            <FormKit type="group" :index="index">
              <FormKit
                type="text"
                label="HP"
                name="hp"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Mana"
                name="mana"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Attack Speed"
                name="attack_speed"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Movement Speed"
                name="movement_speed"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Spell Vamp"
                name="spell_vamp"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Healing Effect"
                name="healing_effect"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="HP Regen Rate"
                name="hp_regen_rate"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Mana Regen Rate"
                name="mana_regen_rate"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Critical Strike Chance"
                name="critical_strike_chance"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Critical Damage"
                name="critical_damage"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="CD Reduction"
                name="cd_reduction"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="BS CD Reduction"
                name="bs_cd_reduction"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Monster Damage Reduction"
                name="monster_damage_reduction"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Monster Damage"
                name="monster_damage"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-6"
                autocomplete="off"
              />
              <h6>Physical</h6>
              <FormKit
                type="text"
                label="Attack"
                name="physical_attack"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Defense"
                name="physical_defense"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Lifesteal"
                name="physical_lifesteal"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Penetration"
                name="physical_penetration"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-12 col-md-3 col-lg-3"
                autocomplete="off"
              />
              <h6>Magic</h6>
              <FormKit
                type="text"
                label="Attack"
                name="magic_attack"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-md col-lg"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Power"
                name="magic_power"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-md col-lg"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Penetration"
                name="magic_penetration"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-md col-lg"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Lifesteal"
                name="magic_lifesteal"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-md col-lg"
                autocomplete="off"
              />
              <FormKit
                type="text"
                label="Resistance"
                name="magic_resistance"
                :wrapper-class="{
                  'formkit-wrapper': false
                }"
                outer-class="col-md col-lg"
                autocomplete="off"
              />
            </FormKit>
          </div>
        </FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Option, SelectOptions } from '@/utils/select-options'
import StaticSelectOptions from '@/utils/static-select-options'
import { reset } from '@formkit/core'
import { FormKitIcon } from '@formkit/vue'
import { vAutoAnimate } from '@formkit/auto-animate'
import { type Hero, HeroesMethod } from '@/methods/heroesMethod'
import { toast } from 'vue3-toastify'
import ConvertFile from '@/utils/convert-file'
import compressor from '@/utils/compressor'
import ImagePreview from '@/components/ImagePreview.vue'
import AlertMessage from '@/utils/alert-message'
import moment from 'moment'

const formData = ref<Hero>({
  code: '',
  name: '',
  lane: '',
  roleIds: [],
  specialtyIds: [],
  battle_points: '',
  ticket: '',
  diamond: '',
  lucky_gem: '',
  release_year: '',
  skins: [
    {
      name: '',
      icon_file_name: '',
      icon_base: '',
      splash_art_file_name: '',
      splash_art_base: '',
      status: 'active'
    }
  ]
})
const submitted = ref<boolean>(false)
const disabled = ref(false)

//options
const roleOptions = ref<Array<Option>>([])
const specialtyOptions = ref<Array<Option>>([])

onMounted(async () => {
  disabled.value = true
  roleOptions.value = await SelectOptions.roleOptions()
  specialtyOptions.value = await SelectOptions.specialtyOptions()
  formData.value.code = await HeroesMethod.count()
  disabled.value = false
})

const addSkins = () => {
  formData.value.skins.push({
    name: '',
    icon_file_name: '',
    icon_base: '',
    splash_art_file_name: '',
    splash_art_base: '',
    status: 'active'
  })
}

const addSkills = () => {
  formData.value?.skills?.push({
    skill_name: '',
    skill_icon: '',
    type: '',
    cooldown: '',
    manacost: '',
    description: ''
  })
}

const addAttributes = () => {
  if (formData.value.base_attributes && formData.value?.base_attributes?.length < 1) {
    formData.value?.base_attributes?.push({
      movement_speed: '',
      physical_attack: '',
      physical_defense: '',
      physical_lifesteal: '',
      physical_penetration: '',
      magic_attack: '',
      magic_power: '',
      magic_penetration: '',
      magic_lifesteal: '',
      spell_vamp: '',
      magic_resistance: '',
      hp: '',
      mana: '',
      attack_speed: '',
      hp_regen_rate: '',
      mana_regen_rate: '',
      critical_strike_chance: '',
      critical_damage: '',
      cd_reduction: '',
      bs_cd_reduction: '',
      healing_effect: '',
      monster_damage_reduction: '',
      monster_damage: ''
    })
  }
}

const removeAttributes = (index: number) => formData.value?.base_attributes?.splice(index, 1)

const submit = async (value: Hero) => {
  value.release_year = moment(value.release_year).format('YYYY')
  for (let index = 0; index < value.skins.length; index++) {
    const skin = value.skins[index]
    // compress file image & convert to base 64
    if (skin.icon_file?.length && skin.icon_file[0]) {
      const icon_blob_file = (await compressor(skin.icon_file[0].file!)) as Blob
      const icon_base64 = await ConvertFile.toBase64(icon_blob_file)
      skin.icon_file_name = skin.icon_file[0].name!
      skin.icon_base = icon_base64
    }
    if (skin.splash_art_file?.length && skin.splash_art_file[0]) {
      const splash_art_blob_file = (await compressor(skin.splash_art_file[0].file!)) as Blob
      const splash_art_base64 = await ConvertFile.toBase64(splash_art_blob_file)
      skin.splash_art_file_name = skin.splash_art_file[0].name!
      skin.splash_art_base = splash_art_base64
    }
  }
  await HeroesMethod.create(value)
    .then(async () => {
      submitted.value = true
      toast.success(AlertMessage.createSuccess)
      reset('create-heroes')
      formData.value.code = await HeroesMethod.count()
    })
    .catch((err) => toast.error(err.message))
}
</script>

<style scoped></style>
