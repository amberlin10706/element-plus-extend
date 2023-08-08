<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '確認',
  },
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', false)"
    width="400"
    :align-center="true"
    :show-close="false"
    class="app-alert"
  >
    <div
      class="w-[90px] bg-white h-[90px] rounded-[50%] flex justify-center items-center absolute -top-10 left-1/2 -translate-x-1/2"
    >
      <div class="bg-primary w-[60px] h-[60px] rounded-[50%] flex justify-center items-center">
        <img src="@/assets/icons/file-success.svg" alt="file icon" />
      </div>
    </div>

    <div class="flex justify-center items-center py-14">
      <div class="text-black text-base">{{ title }}</div>
    </div>
    <div
      class="bg-primary text-white text-base flex justify-center items-center h-[50px] cursor-pointer"
      @click="$emit('update:modelValue', false)"
    >
      {{ buttonText }}
    </div>
  </el-dialog>
</template>

<style lang="scss">
.app-alert {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
