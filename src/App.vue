<script setup>
import AppTagInput from '@/components/AppTagInput.vue'
import { ref } from 'vue'

const tags = ref([])
</script>

<template>
  <div>
    <AppTagInput v-model="tags"></AppTagInput>
  </div>
</template>

<style scoped></style>
