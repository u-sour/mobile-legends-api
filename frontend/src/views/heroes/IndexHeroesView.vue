<template>
  <div id="index-hero">
    <FormKit
      type="text"
      prefix-icon="search"
      v-model="search"
      placeholder="Search..."
      autocomplete="off"
    />

    <EasyDataTable
      show-index
      :headers="headers"
      :items="items"
      :search-field="searchField"
      :search-value="search"
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
              <img
                class="avatar-1 border rounded-circle m-1"
                loading="lazy"
                :role="skin.name"
                :alt="skin.name"
                :title="skin.name"
                :src="skin.icon_url"
              />
              |
              <img
                class="avatar-1 border rounded-1 m-1"
                loading="lazy"
                :role="skin.name"
                :alt="skin.name"
                :title="skin.name"
                :src="skin.splash_art_url"
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
import { onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { type Hero, HeroesMethod } from '@/methods/heroesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import EasyDataTableActions from '@/components/EasyDataTableActions.vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import ImageNotFound from '@/components/ImageNotFound.vue'
import { useRouter } from 'vue-router'
import { FormKit } from '@formkit/vue'

const router = useRouter()
const searchField = ['name', 'code']
const search = ref()
const loading = ref(false)
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
onMounted(async () => {
  loading.value = true
  items.value = await HeroesMethod.findWithAggregate()
  loading.value = false
})

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
