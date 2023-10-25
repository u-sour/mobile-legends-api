<template>
  <div class="edit-hero-roles">
    <FormKit
      type="form"
      id="edit-hero-roles"
      v-model="formData"
      @submit="submit"
      :disabled="disabled"
    >
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
import StaticSelectOptions from '@/utils/static-select-options'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import ConvertFile from '@/utils/convert-file'
import compressor from '@/utils/compressor'
import ImagePreview from '@/components/ImagePreview.vue'
import AlertMessage from '@/utils/alert-message'
import { type HeroRole, HeroRolesMethod } from '@/methods/heroRolesMethod'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const _id = route.params.id

const formData = ref<HeroRole>({
  icon_file_name: '',
  icon_base: '',
  name: '',
  status: 'active'
})

const submitted = ref(false)
const disabled = ref(false)

onMounted(async () => {
  disabled.value = true
  await HeroRolesMethod.findOne(_id)
    .then((data) => {
      disabled.value = false
      formData.value = data
    })
    .catch((err) => {
      toast.error(`${err.status} : ${err.statusText}`)
    })
})

const submit = async (value: HeroRole) => {
  // compress file image & convert to base 64
  if (value.icon_file) {
    const icon_blob_file = (await compressor(value.icon_file[0].file!)) as Blob
    const icon_base64 = await ConvertFile.toBase64(icon_blob_file)
    value.icon_file_name = value.icon_file[0].name!
    value.icon_base = icon_base64
  }
  await HeroRolesMethod.edit(value)
    .then(() => {
      submitted.value = true
      toast.success(AlertMessage.editSuccess)
      router.go(-1)
    })
    .catch((err) => toast.error(err.message))
}
</script>

<style scoped></style>
