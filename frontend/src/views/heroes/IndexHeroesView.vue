<template>
  <div id="index-hero">
    <FormKit
      type="text"
      prefix-icon="search"
      v-model="search"
      placeholder="Search..."
      autocomplete="off"
    />
    <!-- <button class="btn btn-primary" @click="insertSimpleData">Simple Data</button> -->

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
                :src="skin.icon_url"
                loading="lazy"
                alt=""
              />
              |
              <img
                class="avatar-1 border rounded-1 m-1"
                :src="skin.splash_art_url"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </template>
        <ImageNotFound v-else />
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
// import data from '@/utils/simple-data.json'

const searchField = ['name', 'code']
const search = ref()

const router = useRouter()
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
  items.value = await HeroesMethod.find()
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

// const insertSimpleData = async () => {
//   for (let index = 0; index < data.length; index++) {
//     const d = data[index]
//     try {
//       await HeroesMethod.create(d)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
</script>

<style scoped></style>
