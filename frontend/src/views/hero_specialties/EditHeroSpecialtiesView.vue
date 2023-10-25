<template>
  <div class="edit-hero-specialties">
    <FormKit type="form" id="edit-hero-specialties" v-model="formData" @submit="submit">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="text"
            name="name"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            label="Name"
            validation="required"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="select"
            name="type"
            label="TYPE"
            placeholder="Select One"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            :options="StaticSelectOptions.heroSpecialType"
            validation="required"
            autocomplete="off"
          />
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <FormKit
            type="select"
            name="status"
            label="Status"
            placeholder="Select One"
            :wrapper-class="{
              'formkit-wrapper': false
            }"
            :options="StaticSelectOptions.status"
            validation="required"
            autocomplete="off"
          />
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import StaticSelectOptions from '@/utils/static-select-options'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import { type HeroSpecial, HeroSpecialtiesMethod } from '@/methods/heroSpecialtiesMethod'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const _id = route.params.id

const formData = ref<HeroSpecial>({
  name: '',
  type: '',
  status: 'active'
})

onMounted(async () => {
  await HeroSpecialtiesMethod.findOne(_id)
    .then((data) => {
      formData.value = data
    })
    .catch((err) => {
      toast.error(`${err.status} : ${err.statusText}`)
    })
})

const submitted = ref(false)

const submit = async (value: HeroSpecial) => {
  await HeroSpecialtiesMethod.edit(value)
    .then(() => {
      submitted.value = true
      router.go(-1)
      toast.success(AlertMessage.editSuccess)
    })
    .catch((err) => toast.error(err.message))
}
</script>

<style scoped></style>
