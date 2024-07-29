<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  title: {
    type: String,
    default: '',
  },
  itemKey: {
    type: String,
    default: '',
  },
  form: {
    type: Object,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const value = toRef(props.form, props.itemKey)
</script>

<template>
  <el-form-item v-if="type === 'text'" :label="title" :prop="itemKey">
    <el-input v-model="value" :placeholder="`輸入${title}`" />
  </el-form-item>

  <el-form-item v-if="type === 'select'" :label="title" :prop="itemKey">
    <el-select v-model="value" :placeholder="`選擇${title}`">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<style scoped lang="scss"></style>
