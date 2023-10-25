<template>
  <div id="index-hero-specialties">
    <EasyDataTable show-index :headers="headers" :items="items" :loading="loading">
      <template #loading>
        <EasyDataTableLoading />
      </template>
      <template #item-type="{ type }">
        <span>{{
          StaticSelectOptions.heroSpecialType.filter((t) => t.value === type)[0].label
        }}</span>
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
import StaticSelectOptions from '@/utils/static-select-options'
import type { Header, Item } from 'vue3-easy-data-table'
import { type HeroSpecial, HeroSpecialtiesMethod } from '@/methods/heroSpecialtiesMethod'
import EasyDataTableLoading from '@/components/EasyDataTableLoading.vue'
import EasyDataTableActions from '@/components/EasyDataTableActions.vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const headers: Header[] = [
  { text: 'NAME', value: 'name' },
  { text: 'TYPE', value: 'type' },
  { text: 'STATUS', value: 'status' },
  { text: 'Operation', value: 'operation', width: 161 }
]

const items = ref<Item[]>([])

onMounted(async () => {
  items.value = await HeroSpecialtiesMethod.find()
  loading.value = false
})

const editItem = (val: HeroSpecial) => {
  router.push({ name: 'edit.hero-specialties', params: { id: val._id } })
}
const deleteItem = async (val: HeroSpecial) => {
  loading.value = true
  await HeroSpecialtiesMethod.delete(val._id!)
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
