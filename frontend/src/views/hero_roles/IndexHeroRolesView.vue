<template>
  <div id="index-hero-roles">
    <EasyDataTable show-index :headers="headers" :items="items" :loading="loading">
      <template #loading>
        <EasyDataTableLoading />
      </template>
      <template #item-icon_url="{ icon_url }">
        <img
          v-if="icon_url"
          class="avatar-1 border rounded-circle"
          :src="icon_url"
          loading="lazy"
          alt=""
        />
        <ImageNotFound v-else />
      </template>
      <template #item-status="{ status }">
        <span
          class="badge"
          :class="[status === 'active' ? 'text-bg-success ' : 'text-bg-danger']"
          >{{ status }}</span
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
import { type HeroRole, HeroRolesMethod } from '@/methods/heroRolesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import EasyDataTableActions from '@/components/EasyDataTableActions.vue'
import ImageNotFound from '@/components/ImageNotFound.vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const headers: Header[] = [
  { text: 'ICON', value: 'icon_url' },
  { text: 'NAME', value: 'name' },
  { text: 'STATUS', value: 'status' },
  { text: 'Operation', value: 'operation', width: 161 }
]

const items = ref<Item[]>([])

onMounted(async () => {
  items.value = await HeroRolesMethod.find()
  loading.value = false
})

const editItem = (val: HeroRole) => {
  router.push({ name: 'edit.hero-roles', params: { id: val._id } })
}
const deleteItem = async (val: HeroRole) => {
  loading.value = true
  await HeroRolesMethod.delete(val._id!)
    .then(async () => {
      loading.value = false
      // filter items not equal to deleted item _id and set items again
      items.value = items.value.filter((i) => i._id !== val._id)
      toast.success(AlertMessage.deleteSuccess(val._id!))
    })
    .catch((err) => {
      toast.error(err.message)
    })
}
</script>

<style scoped></style>
