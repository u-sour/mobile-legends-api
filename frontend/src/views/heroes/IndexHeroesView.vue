<template>
  <div id="index-hero">
    <form @submit.prevent="search">
      <FormKit
        type="text"
        prefix-icon="search"
        v-model="searchValue"
        placeholder="Search..."
        autocomplete="off"
      />
    </form>
    <EasyDataTable
      show-index
      :headers="headers"
      :items="items"
      buttons-pagination
      v-model:server-options="serverOptions"
      :server-items-length="serverItemsLength"
      :loading="loading"
    >
      <template #loading>
        <EasyDataTableLoading />
      </template>
      <template #expand="item">
        <template v-if="item.skins">
          <div class="d-flex">
            <div v-for="skin in item.skins" :key="skin.name" class="w-auto me-3">
              <span class="badge text-bg-light fs-6 mt-2"
                ><i class="bi bi-shop"></i> {{ skin.name }}</span
              ><br />
              <CloudImage
                :public-id="skin.icon_public_id"
                :name="skin.name"
                class="avatar-1 border border-2 rounded-circle"
              />
              |
              <CloudImage
                :public-id="skin.splash_art_public_id"
                :name="skin.name"
                class="avatar-1 border rounded-1 m-1"
              />
            </div>
          </div>
        </template>
        <ImageNotFound v-else />
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
      <template #item-operation="item">
        <EasyDataTableActions @edit="editItem(item)" @delete="deleteItem(item)" />
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table'
import { type Hero, HeroesMethod } from '@/methods/heroesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import EasyDataTableActions from '@/components/EasyDataTableActions.vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import CloudImage from '@/components/CloudImage.vue'
import ImageNotFound from '@/components/ImageNotFound.vue'
import { useRouter, useRoute } from 'vue-router'
import { FormKit } from '@formkit/vue'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const searchValue = ref()
const serverItemsLength = ref(0)
const { page, limit } = route.query
const serverOptions = ref<ServerOptions>({
  page: parseInt(page?.toString() || '1'),
  rowsPerPage: parseInt(limit?.toString() || '25')
})

const headers: Header[] = [
  { text: 'NAME', value: 'name' },
  { text: 'CODE', value: 'code' },
  { text: 'ROLE(s)', value: 'roleIds' },
  { text: 'SPECIALTIES', value: 'specialtyIds' },
  { text: 'LANING', value: 'lane' },
  { text: 'RELEASE YEAR', value: 'release_year' },
  { text: 'Operation', value: 'operation', width: 161 }
]

const items = ref<Item[]>([])
const loadFromServer = async () => {
  loading.value = true
  const { page, rowsPerPage } = serverOptions.value
  router.replace({
    name: 'heroes',
    query: searchValue.value
      ? { search: searchValue.value, page: page, limit: rowsPerPage }
      : { page: page, limit: rowsPerPage }
  })
  const { heroes, serverTotalHeroesLength } = await HeroesMethod.findWithAggregate({
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

const editItem = (val: Hero) => {
  router.push({ name: 'edit.heroes', params: { id: val._id } })
}
const deleteItem = async (val: Hero) => {
  loading.value = true
  await HeroesMethod.delete(val._id!)
    .then(async () => {
      loading.value = false
      // filter items not equal to deleted item _id and set items again
      items.value = items.value.filter((i) => i._id !== val._id)
      toast.success(AlertMessage.deleteSuccess(val._id!))
    })
    .catch((err) => {
      toast.error(err.data.message)
    })
}
</script>

<style scoped></style>
