<script setup>
import { ElMessage } from 'element-plus'

const props = defineProps({
  accept: {
    type: Array,
    default: () => []
  },
  fileSizeLimit: {
    type: Number,
    default: 1024 * 1024 * 5
  },
  drag: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['upload'])

const onchange = async (uploadFile) => {
  if (!uploadFile.raw) {
    return false
  }

  if (props.accept?.length) {
    const mimeType = uploadFile.raw.type
    const isAcceptType = props.accept.some((accept) => {
      const [type, subtype] = accept.split('/')

      if (subtype === '*') {
        return mimeType.startsWith(`${type}/`)
      }

      return mimeType === accept
    })

    if (!isAcceptType) {
      ElMessage.error('格式錯誤')
      return false
    }
  }

  if (uploadFile.raw.size > props.fileSizeLimit) {
    ElMessage.error('檔案大小超過限制')
    return false
  }

  emits('upload', uploadFile.raw)
  return true
}
</script>

<template>
  <el-upload
    action="#"
    :auto-upload="false"
    :show-file-list="false"
    :accept="accept.toString()"
    :on-change="onchange"
    :drag="drag"
  >
    <slot></slot>
  </el-upload>
</template>
