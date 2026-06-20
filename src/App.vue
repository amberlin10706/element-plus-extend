<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import AppEnterInput from '@/components/AppEnterInput.vue'
import AppUpload from '@/components/AppUpload.vue'
import AppDialog from '@/components/AppDialog.vue'

// AppEnterInput
const keyword = ref('')
const handleSearch = () => {
  ElMessage.success(`觸發搜尋：${keyword.value || '(空)'}`)
}

// AppUpload
const handleUpload = (file) => {
  ElMessage.success(`已選擇檔案：${file.name}`)
}

// AppDialog
const dialogVisible = ref(false)
const confirmDialog = () => new Promise((resolve) => setTimeout(resolve, 800)) // 模擬非同步送出

// 左側導覽列：每個元件對應一個項目，點選後切換右側展示內容
const navItems = [
  {
    key: 'AppEnterInput',
    name: 'AppEnterInput',
    desc: '支援 Enter / 點放大鏡觸發搜尋，並處理中文輸入法組字'
  },
  {
    key: 'AppUpload',
    name: 'AppUpload',
    desc: '封裝上傳，含格式 / 大小驗證，透過 slot 自訂觸發 UI'
  },
  {
    key: 'AppDialog',
    name: 'AppDialog',
    desc: '含取消 / 確認按鈕，confirmAction 支援非同步並自動 loading'
  }
]
const activeKey = ref(navItems[0].key)
</script>

<template>
  <el-container class="layout">
    <!-- 左側導覽列 -->
    <el-aside class="layout__aside" width="220px">
      <div class="layout__brand">Element Plus Extend</div>
      <el-menu :default-active="activeKey" @select="(key) => (activeKey = key)">
        <el-menu-item v-for="item in navItems" :key="item.key" :index="item.key">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右側內容：依 activeKey 顯示對應元件展示 -->
    <el-main class="layout__main">
      <el-card class="showcase__card" shadow="never">
        <template #header>
          <span class="showcase__name">{{ activeKey }}</span>
          <span class="showcase__desc">
            {{ navItems.find((item) => item.key === activeKey)?.desc }}
          </span>
        </template>

        <!-- AppEnterInput -->
        <template v-if="activeKey === 'AppEnterInput'">
          <AppEnterInput v-model="keyword" :on-search="handleSearch" />
          <div class="showcase__hint">目前值：{{ keyword }}</div>
        </template>

        <!-- AppUpload -->
        <template v-else-if="activeKey === 'AppUpload'">
          <AppUpload
            :accept="['image/*']"
            :file-size-limit="1024 * 1024 * 5"
            @upload="handleUpload"
          >
            <el-button :icon="UploadFilled" type="primary">選擇圖片</el-button>
          </AppUpload>
        </template>

        <!-- AppDialog -->
        <template v-else-if="activeKey === 'AppDialog'">
          <el-button type="primary" @click="dialogVisible = true">開啟 Dialog</el-button>
          <AppDialog
            v-model="dialogVisible"
            title="確認操作"
            confirm-text="送出"
            :confirm-action="confirmDialog"
          >
            <p>這是 Dialog 的內容區（slot）。</p>
          </AppDialog>
        </template>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;

  &__aside {
    border-right: 1px solid var(--el-border-color-light);

    .el-menu {
      border-right: none;
    }
  }

  &__brand {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-weight: 600;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  &__main {
    background-color: var(--el-bg-color-page);
  }
}

.showcase {
  &__card {
    max-width: 720px;
  }

  &__name {
    font-weight: 600;
    margin-right: 8px;
  }

  &__desc {
    color: #909399;
    font-size: 13px;
  }

  &__hint {
    margin-top: 8px;
    color: #909399;
    font-size: 13px;
    word-break: break-all;
  }
}
</style>
