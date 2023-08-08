<script setup>
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emits = defineEmits(['update:modelValue'])

function addTag(e) {
  const newTags = props.modelValue.concat([e.target.value])
  emits('update:modelValue', newTags)
  e.target.value = ''
}
function removeTag($index) {
  const newTags = props.modelValue.filter((_, index) => index !== $index)
  emits('update:modelValue', newTags)
}
</script>

<template>
  <div class="tag-input-box">
    <el-tag
      v-for="(tag, index) in modelValue"
      :key="tag + index"
      :closable="!disabled"
      :disable-transitions="true"
      @close="() => removeTag(index)"
    >
      {{ tag }}
    </el-tag>
    <input class="tag-input" @keyup.enter="addTag" :disabled="disabled" />
  </div>
</template>

<style lang="scss" scoped>
.tag-input-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 2px 4px;
  column-gap: 4px;
  span {
    white-space: pre-wrap;
    word-break: break-word;
    height: auto;
  }
}
.tag-input {
  background: transparent;
  border: 0;
  font-size: inherit;
  outline: none;
  padding-left: 2px;
  display: flex;
  flex: 1;
  flex-basis: 120px;
  width: 100%;
}
</style>

<style lang="scss">
.el-form-item.is-error.is-required {
  .tag-input-box {
    border: 1px solid #f56c6c;
  }
}
</style>
