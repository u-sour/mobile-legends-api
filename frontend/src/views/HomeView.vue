<script setup lang="ts">
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table'
import VueWriter from 'vue-writer'
import { ref, watch } from 'vue'
import { HeroesMethod } from '@/methods/heroesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import { useDark } from '@vueuse/core'
import CloudImage from '@/components/CloudImage.vue'
import ImageNotFound from '@/components/ImageNotFound.vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isDark = useDark()
const loading = ref(false)
const searchValue = ref()
const serverItemsLength = ref(0)
const { page, limit } = route.query
const serverOptions = ref<ServerOptions>({
  page: parseInt(page?.toString() || '1'),
  rowsPerPage: parseInt(limit?.toString() || '25')
})

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

const loadFromServer = async () => {
  loading.value = true
  const { page, rowsPerPage } = serverOptions.value
  router.replace({
    name: 'home',
    query: searchValue.value
      ? { search: searchValue.value, page: page, limit: rowsPerPage }
      : { page: page, limit: rowsPerPage }
  })
  const { heroes, serverTotalHeroesLength } = await HeroesMethod.findWithAggregateNoRateLimit({
    search: searchValue.value,
    page,
    rowsPerPage
  })
  items.value = heroes
  serverItemsLength.value = serverTotalHeroesLength
  loading.value = false
}

// initial load
loadFromServer()

watch(
  serverOptions,
  () => {
    loadFromServer()
  },
  { deep: true }
)

const search = () => {
  loadFromServer()
}
const domainName = import.meta.env.VITE_API_URI || 'http://localhost:5173'
const apis = ref([
  {
    id: 'heroes',
    title: 'Heroes',
    endPoints: [
      {
        name: 'Get heroes by search (hero name or code)',
        url: `${domainName}/api/v1/heroes/public/search/?search=miya`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get heroes by search (hero name or code) with pagination',
        url: `${domainName}/api/v1/heroes/public/search/?search=miya&page=1&limit=25`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get hero by id',
        url: `${domainName}/api/v1/heroes/public/id/653a7a89b806d40c256b12e2`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get all heroes',
        url: `${domainName}/api/v1/heroes/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: {
      serverTotalHeroesLength: 1,
      heroes: [
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
          // skins: [
          //   {
          //     name: '',
          //     icon_public_id: '',
          //     icon_url: '',
          //     icon_file_name: '',
          //     splash_art_public_id: '',
          //     splash_art_url: '',
          //     splash_art_file_name: '',
          //     status: '',
          //     _id: ''
          //   }
          // ],
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
    }
  },
  {
    id: 'hero-skins',
    title: 'Hero Skins',
    endPoints: [
      {
        name: 'Get hero skins by search (hero name or code)',
        url: `${domainName}/api/v1/hero-skins/public/search/?search=miya`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get hero skins by search (hero name or code) with pagination',
        url: `${domainName}/api/v1/hero-skins/public/search/?search=miya&page=1&limit=25`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get hero skin by id',
        url: `${domainName}/api/v1/hero-skins/public/id/653a7a89b806d40c256b12e2`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get all hero skins',
        url: `${domainName}/api/v1/hero-skins/public`,
        type: 'Get',
        status: 'active',
        copied: false
      }
    ],
    response: {
      serverTotalHeroesLength: 1,
      heroes: [
        {
          _id: '653a7a89b806d40c256b12e2',
          code: '1',
          name: 'Miya',
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
          ]
        }
      ]
    }
  },
  {
    id: 'hero-roles',
    title: 'Hero Roles',
    endPoints: [
      {
        name: 'Get hero role by id',
        url: `${domainName}/api/v1/hero-roles/public/id/652fbbd137ea7f85db3f4223`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get all hero roles',
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
        name: 'Get hero specialty by id',
        url: `${domainName}/api/v1/hero-specialties/public/id/653b529128cdd9c14aa89c1e`,
        type: 'Get',
        status: 'active',
        copied: false
      },
      {
        name: 'Get all hero specialties',
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
    <div class="col-12 mb-4">
      <h1 class="header-title text-center my-5">Mobile Legends Bang Bang API</h1>
      <div class="col-12">
        <p class="fs-1">Overview</p>
        <p class="fs-4">
          I created this API as a case study project also can be used by any developer and it's
          <span class="fw-bold">free</span> no <span class="fw-bold">sign up</span>. This API was
          created with the aim of making it easier for programmers with any programming language to
          test and learn the application being built.
        </p>
        <p class="fs-4">
          This API is an unoffical so it mean data isn't updated in real time. If there is a data
          error in this API, contact me
          <a
            href="mailto:yousour.dev@gmail.com"
            class="link-color-light"
            :class="{ 'link-color-dark': isDark }"
            >here</a
          >.
          <span class="d-lg-flex d-md-flex d-sm-inline">
            Currently it's support fetching&nbsp;
            <VueWriter
              :array="['Heroes.', 'Hero Skins.', 'Hero Roles.', 'Hero Specailties.']"
              class="fw-bold"
              :eraseSpeed="50"
              :typeSpeed="100"
            />
          </span>
        </p>
      </div>
      <FormKit
        type="search"
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
        :style="
          !isDark ? '--clear-icon-color: var(--primary)' : '--clear-icon-color:var(--secondary)'
        "
        v-model.lazy="searchValue"
        @change="search"
        placeholder="Search..."
        autocomplete="off"
      />
      <EasyDataTable
        show-index
        :headers="headers"
        :items="items"
        buttons-pagination
        theme-color="#231f20"
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
      >
        <template #loading>
          <EasyDataTableLoading />
        </template>
        <template #item-skins="{ skins }">
          <div class="p-1">
            <CloudImage
              :public-id="skins.icon_public_id"
              :name="skins.name"
              class="avatar-1 border border-2 rounded-circle"
              v-if="skins && skins.icon_public_id"
            />
            <ImageNotFound v-else />
          </div>
        </template>
        <template #item-roleIds="{ roleIds }">
          <span v-for="(role, index) in roleIds" :key="role._id">
            {{ role.name }}<span v-if="index !== roleIds.length - 1"> / </span></span
          >
        </template>
        <template #item-specialtyIds="{ specialtyIds }">
          <span v-for="(specialty, index) in specialtyIds" :key="specialty._id"
            >{{ specialty.name }}<span v-if="index !== specialtyIds.length - 1"> / </span></span
          >
        </template>
      </EasyDataTable>
    </div>
    <!--------------------------------------API Endpoints--------------------------------------->
    <p class="fs-1">Available API Endpoints</p>
    <template v-for="api in apis" :key="api.title">
      <p class="fs-3 fw-bold mt-4">{{ api.title }}</p>
      <div class="mb-3" v-for="endPoint in api.endPoints" :key="endPoint.name">
        <p class="fs-5">{{ endPoint.name }}</p>
        <div class="card">
          <div class="card-body d-flex justify-content-between">
            <div>
              <span class="badge text-bg-success fs-6 text-uppercase">{{ endPoint.type }}</span
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
      <p class="fs-5">Response 200 application/json</p>
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
