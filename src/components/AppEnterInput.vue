<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({
  onSearch: {
    type: Function,
    required: true
  }
})

const isComposing = ref(false)
const handleSearch = () => {
  if (isComposing.value) return
  props.onSearch()
}
</script>

<template>
  <el-input
    @keydown.enter="handleSearch"
    @compositionstart="() => (isComposing = true)"
    @compositionend="() => (isComposing = false)"
    clearable
    @clear="onSearch"
  >
    <template #suffix>
      <el-icon class="cursor-pointer" @click="onSearch"><Search /></el-icon>
    </template>
  </el-input>
</template>

<style scoped lang="scss"></style>
