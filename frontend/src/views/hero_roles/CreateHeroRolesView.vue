<template>
  <div class="create-hero-roles">
    <FormKit type="form" id="create-hero-roles" v-model="formData" @submit="submit">
      <div class="row">
        <div class="col-12">
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
            validation="required"
            autocomplete="off"
          >
            <template #prefix>
              <ImagePreview :imageFile="formData.icon_file" />
            </template>
          </FormKit>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
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
        <div class="col-12 col-md-6 col-lg-6">
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
import ConvertFile from '@/utils/convert-file'
import compressor from '@/utils/compressor'
import AlertMessage from '@/utils/alert-message'
import ImagePreview from '@/components/ImagePreview.vue'
import { type HeroRole, HeroRolesMethod } from '@/methods/heroRolesMethod'

const formData = ref<HeroRole>({
  icon_file_name: '',
  icon_base: '',
  name: '',
  status: 'active'
})
const submitted = ref(false)

const submit = async (value: HeroRole) => {
  // compress file image & convert to base 64
  if (value.icon_file) {
    const icon_blob_file = (await compressor(value.icon_file[0].file!)) as Blob
    const icon_base64 = await ConvertFile.toBase64(icon_blob_file)
    value.icon_file_name = value.icon_file[0].name!
    value.icon_base = icon_base64
  }
  await HeroRolesMethod.create(value)
    .then(() => {
      submitted.value = true
      reset('create-hero-roles')
      toast.success(AlertMessage.createSuccess)
    })
    .catch((err) => toast.error(err.message))
}
</script>

<style scoped></style>
