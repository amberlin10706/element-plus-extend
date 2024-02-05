<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '500',
  },
  confirmText: {
    type: String,
    default: '確認',
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
  confirmAction: {
    type: Function,
    default: () => {},
  },
})

const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = async () => {
  await props.confirmAction()
  emits('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <slot></slot>
    <div class="flex justify-end">
      <el-button type="primary" plain @click="handleClose"> 取消 </el-button>
      <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
        {{ confirmText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
