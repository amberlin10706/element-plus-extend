<script setup>
import { ref } from 'vue'

const emits = defineEmits(['enter'])

const isComposing = ref(false)
const handleEnter = () => {
  if (isComposing.value) return
  emits('enter')
}
</script>

<template>
  <el-input
    @keydown.enter="handleEnter"
    @compositionstart="() => (isComposing = true)"
    @compositionend="() => (isComposing = false)"
  ></el-input>
</template>

<style scoped lang="scss"></style>
