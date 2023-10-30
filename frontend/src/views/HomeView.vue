<script setup lang="ts">
import type { Header, Item } from 'vue3-easy-data-table'
import { TxtAnime } from 'txtanime.js'
import { onMounted, ref } from 'vue'
import { HeroesMethod } from '@/methods/heroesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import { useDark } from '@vueuse/core'
import ImageNotFound from '@/components/ImageNotFound.vue'

const isDark = useDark()
const searchField = ['name', 'code']
const search = ref()
const loading = ref(false)

const headers: Header[] = [
  { text: 'Hero', value: 'skins' },
  { text: 'NAME', value: 'name' },
  { text: 'CODE', value: 'code' },
  { text: 'ROLE(s)', value: 'roleIds' },
  { text: 'SPECIALTIES', value: 'specialtyIds' },
  { text: 'LANING', value: 'lane' },
  { text: 'RELEASE YEAR', value: 'release_year' }
]
const items = ref<Item[]>([])

onMounted(async () => {
  new TxtAnime('#pub-api', {
    effect: 'txt-an-7',
    text: ['Heroes.', 'Hero Skins.', 'Hero Roles.', 'Hero Specailties.']
  })
  loading.value = true
  items.value = await HeroesMethod.findWithAggregate()
  loading.value = false
})
const domainName = 'http://localhost:5173'
const apis = ref([
  {
    id: 'heroes',
    title: 'Heroes',
    endPoints: [
      {
        name: 'Heroes by ID',
        url: `${domainName}/api/v1/heroes/public/id/123456`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get Heroes',
        url: `${domainName}/api/v1/heroes/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: [
      {
        _id: '653a7a89b806d40c256b12e2',
        code: '1',
        name: 'Miya',
        roleIds: [],
        specialtyIds: [],
        lane: 'Gold Laner',
        release_year: '2016',
        battle_points: '10800',
        ticket: '399',
        lucky_gem: '',
        skins: [
          {
            name: '',
            icon_public_id: '',
            icon_url: '',
            icon_file_name: '',
            splash_art_public_id: '',
            splash_art_url: '',
            splash_art_file_name: '',
            status: '',
            _id: ''
          }
        ],
        skills: [
          {
            skill_name: '',
            skill_icon: '',
            type: '',
            cooldown: '',
            manacost: '',
            description: ''
          }
        ],
        base_attributes: [
          {
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
          }
        ]
      }
    ]
  },
  {
    id: 'hero-skins',
    title: 'Hero Skins',
    endPoints: [
      {
        name: 'Hero Skins by ID',
        url: `${domainName}/api/v1/hero-skins/public/id/123456`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get Hero Skins',
        url: `${domainName}/api/v1/hero-skins/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: []
  },
  {
    id: 'hero-roles',
    title: 'Hero Roles',
    endPoints: [
      {
        name: 'Hero Roles by ID',
        url: `${domainName}/api/v1/hero-roles/public/id/123456`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get Hero Roles',
        url: `${domainName}/api/v1/hero-roles/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: [
      {
        _id: '652fbbd137ea7f85db3f4223',
        name: 'Tank',
        status: 'active',
        icon_file_name: 'Tank_Icon.png',
        icon_public_id: 'Hero Roles/i5mnmijrerkpe60kirns',
        icon_url:
          'https://res.cloudinary.com/dzjfj09x1/image/upload/v1698386128/Hero%20Roles/i5mnmijrerkpe60kirns.png'
      }
    ]
  },
  {
    id: 'hero-specialties',
    title: 'Hero Specialties',
    endPoints: [
      {
        name: 'Hero Specialties by ID',
        url: `${domainName}/api/v1/hero-specialties/public/id/123456`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get Hero Specialties',
        url: `${domainName}/api/v1/hero-specialties/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: [
      {
        _id: '653b529128cdd9c14aa89c1e',
        name: 'Regen',
        type: '1',
        status: 'active'
      }
    ]
  }
])
function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus({ preventScroll: true })
  textArea.select()
  try {
    document.execCommand('copy')
  } catch (err) {
    console.error('Unable to copy to clipboard', err)
  }
  document.body.removeChild(textArea)
}

const onCopy = (endPoint: any) => {
  endPoint.copied = true
  //copy text
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(endPoint.url)
  } else {
    unsecuredCopyToClipboard(endPoint.url)
  }
  setTimeout(() => {
    endPoint.copied = false
  }, 1200)
}
</script>

<template>
  <div class="container">
    <div class="col-lg-12 text-center">
      <h1 class="header-title">Mobile Legends Bang Bang API</h1>
      <div class="col-lg-12">
        <p class="fs-1">
          This is an unoffical rest api for all developers and it's
          <span class="fw-bold">free</span> no <span class="fw-bold">sign up</span>. Currently it's
          support fetching
          <span id="pub-api" class=""></span>
        </p>
      </div>
      <FormKit
        type="text"
        prefix-icon="search"
        :wrapper-class="{
          'formkit-wrapper': false
        }"
        :prefixIcon-class="{ 'search-icon-light': !isDark, 'search-icon-dark': isDark }"
        :inner-class="{
          'search-inner-light': !isDark,
          'search-inner-dark': isDark
        }"
        :input-class="{ 'search-input-light': !isDark, 'search-input-dark': isDark }"
        v-model="search"
        placeholder="Search..."
        autocomplete="off"
      />
      <EasyDataTable
        show-index
        :headers="headers"
        :items="items"
        buttons-pagination
        theme-color="#231f20"
        :search-field="searchField"
        :search-value="search"
        :loading="loading"
      >
        <template #loading>
          <EasyDataTableLoading />
        </template>
        <template #item-skins="{ skins }">
          <div class="p-1">
            <img
              v-if="skins.length > 0 && skins[0].icon_url"
              class="avatar-1 border rounded-circle"
              :src="skins[0].icon_url"
              loading="lazy"
              :alt="skins[0].name"
              :title="skins[0].name"
            />
            <ImageNotFound v-else />
          </div>
        </template>
        <template #item-roleIds="{ roleIds }">
          <span v-for="role in roleIds" :key="role._id">
            {{ role.name }}
          </span>
        </template>
        <template #item-specialtyIds="{ specialtyIds }">
          <span v-for="specialty in specialtyIds" :key="specialty._id">
            <template v-if="specialtyIds.length < 1">
              {{ specialty.name }}
            </template>
            <template v-else> {{ specialty.name }}, </template>
          </span>
        </template>
      </EasyDataTable>
    </div>
    <hr />
    <p class="fs-1">
      <i class="bi bi-patch-check-fill available-icon-color"></i> Available Rest API Endpoints
    </p>
    <template v-for="api in apis" :key="api.title">
      <p class="fs-3">{{ api.title }}</p>
      <div class="mb-3" v-for="endPoint in api.endPoints" :key="endPoint.name">
        <span class="fs-6">{{ endPoint.name }}</span>
        <div class="card">
          <div class="card-body d-flex justify-content-between">
            <div>
              <span class="badge text-bg-success end-point-type">{{ endPoint.type }}</span
              >&nbsp;
              <span class="text-break">{{ endPoint.url }}</span>
            </div>
            <a role="button" @click="onCopy(endPoint)" title="Copy to clipboard">
              <i
                :class="[
                  endPoint.copied ? 'bi-clipboard-check copied-icon-color' : 'bi-clipboard',
                  'bi'
                ]"
              ></i>
            </a>
          </div>
        </div>
      </div>
      <span>Response 200 application/json</span>
      <div class="accordion" :id="`accordion${api.id}`">
        <div class="accordion-item">
          <p class="accordion-header">
            <button
              class="accordion-button fs-6"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse${api.id}`"
              aria-expanded="true"
              :aria-controls="`collapse${api.id}`"
            >
              Document
            </button>
          </p>
          <div
            :id="`collapse${api.id}`"
            class="accordion-collapse collapse show"
            :data-bs-parent="`#accordion${api.id}`"
          >
            <div class="accordion-body">
              <code>
                <pre v-html="JSON.stringify(api.response, null, 2)"></pre>
              </code>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.header-title {
  font-size: 4rem;
}
.available-icon-color,
.copied-icon-color {
  color: var(--success);
}

.text-bg-success {
  background-color: var(--success) !important;
}
.accordion-button:focus {
  box-shadow: none;
  background-color: #ffffff;
  border-color: rgba(0, 0, 0, 0.125);
  font-weight: normal;
}

.accordion-button:not(.collapsed) {
  color: var(--primary);
  box-shadow: none;
  background-color: #ffffff;
  font-weight: bold;
}
</style>
