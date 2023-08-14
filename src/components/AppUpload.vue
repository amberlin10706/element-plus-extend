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
  }
})

const emits = defineEmits(['upload'])

const handleImageChange = async (uploadFile) => {
  if (!uploadFile.raw) {
    return false
  }

  if (props.accept?.length) {
    const mimeType = uploadFile.raw.type
    const isAcceptType = props.accept.some((accept) => {
      if (accept.includes('/*')) {
        return mimeType.startsWith(accept.replace('*', ''))
      } else {
        return accept === mimeType
      }
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
    :on-change="handleImageChange"
  >
    <slot></slot>
  </el-upload>
</template>
