<template>
  <div class="create-hero-specialties">
    <FormKit type="form" id="create-hero-specialties" v-model="formData" @submit="submit">
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
            label="Type"
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
import { reset } from '@formkit/core'
import StaticSelectOptions from '@/utils/static-select-options'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import AlertMessage from '@/utils/alert-message'
import { type HeroSpecial, HeroSpecialtiesMethod } from '@/methods/heroSpecialtiesMethod'

const formData = ref<HeroSpecial>({
  name: '',
  type: '1',
  status: 'active'
})
const submitted = ref(false)

const submit = async (value: HeroSpecial) => {
  await HeroSpecialtiesMethod.create(value)
    .then(() => {
      submitted.value = true
      reset('create-hero-specialties')
      toast.success(AlertMessage.createSuccess)
    })
    .catch((err) => toast.error(err.message))
}
</script>

<style scoped></style>
