<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const model = defineModel()

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const YEAR_TD_SELECTOR = '.el-year-table td.available'
const HEADER_SELECTOR = '.el-date-range-picker__header, .el-date-picker__header'

let panelObserver = null

const elDatePickerRef = ref()

const format = computed(() => {
  if (props.type === 'datetime' || props.type === 'datetimerange') {
    return 'ROC-MM-DD HH:mm:ss'
  }
  return 'ROC-MM-DD'
})

const timeFormat = computed(() => {
  if (props.type === 'datetime' || props.type === 'datetimerange') {
    return 'HH:mm:ss'
  }
  return undefined
})

const toRocYear = (year) => year - 1911
const replaceYear = (text) => text.replace(/\b(\d{4})\b/g, (_, y) => String(toRocYear(parseInt(y))))

function getMyPanel() {
  const el = elDatePickerRef.value?.$el.nextElementSibling
  if (!el) return null
  const input = el.querySelector('input')
  if (!input) return null
  const popperId = input.getAttribute('aria-controls')
  if (!popperId) return null
  return document.getElementById(popperId)
}

function patchHeaders() {
  document.querySelectorAll(HEADER_SELECTOR).forEach((header) => {
    const walker = document.createTreeWalker(header, NodeFilter.SHOW_TEXT)
    let node
    while ((node = walker.nextNode())) {
      if (/\b\d{4}\b/.test(node.textContent)) {
        node.textContent = replaceYear(node.textContent)
      }
    }
  })
}

function patchYearCells() {
  document.querySelectorAll(YEAR_TD_SELECTOR).forEach((td) => {
    const ariaLabel = td.getAttribute('aria-label')
    const textEl = td.querySelector('.el-date-table-cell__text')
    if (!textEl || !ariaLabel) return

    const rocYear = replaceYear(ariaLabel)
    if (td.dataset.roc === rocYear) return
    textEl.textContent = rocYear
    td.dataset.roc = rocYear
  })
}

const patch = () => {
  patchHeaders()
  patchYearCells()
}

onMounted(() => {
  const panel = getMyPanel()
  if (!panel) {
    console.warn('AppRocDatePicker: Date picker panel not found')
    return
  }

  patch()

  panelObserver = new MutationObserver(() => nextTick(patch))
  panelObserver.observe(panel, {
    childList: true,
    subtree: true
  })
})

onBeforeUnmount(() => panelObserver?.disconnect())

defineExpose({
  handleOpen: () => elDatePickerRef.value?.handleOpen(),
  handleClose: () => elDatePickerRef.value?.handleClose(),
  focus: () => elDatePickerRef.value?.focus(),
  blur: () => elDatePickerRef.value?.blur()
})
</script>

<template>
  <el-date-picker
    ref="elDatePickerRef"
    v-model="model"
    v-bind="$attrs"
    :type="type"
    :format="format"
    :time-format="timeFormat"
  />
</template>
