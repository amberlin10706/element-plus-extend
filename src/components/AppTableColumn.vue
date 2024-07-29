<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  formatter: {
    type: Function,
    default: (row, column, cellValue) => cellValue,
  },
  minWidth: {
    type: Number,
    default: 0,
  },
  component: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <el-table-column :label="label" :prop="prop" :formatter="formatter" :min-width="minWidth">
    <template v-if="component" #default="{ row, column }">
      <component :is="component" :row="row" :column="column" />
    </template>
  </el-table-column>
</template>

<style scoped lang="scss"></style>
