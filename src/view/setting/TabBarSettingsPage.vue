<script setup lang="ts">
import SettingsHeading from "@/components/settingPage/settingsHeading.vue";
import TabPlaceholder from "@/components/settingPage/tabBar/tabPlaceholder.vue";
import TabForm from "@/components/settingPage/form/tabForm.vue";
import {onMounted, ref} from "vue";
import {TabRepository} from "@/database/tab.ts";

const isTabForm = ref(false)
const tabList = ref()

const showTabForm = () => {
  isTabForm.value = true
}

onMounted(async () => {
  tabList.value = await TabRepository.getAll()
  if (tabList.value.length > 0) {
    isTabForm.value = true
  }
})
</script>

<template>
  <div class="setting-content-wrap">
    <settings-heading
        settingsEyebrow="BOOKMARKS"
        title="书签栏"
        content="把常用的网站，放在触手可及的地方。"
    />
    <Transition name="tab-form" mode="out-in">
      <tab-placeholder
          v-if="!isTabForm"
          @show-tab-from="showTabForm()"
      />
      <div v-else class="tab-form-list">
        <tab-form mode="add" />
        <tab-form
            v-for="item in tabList"
            :key="item.id"
            :tab-hotkey="item.tabHotkey"
            :icon="item.tabIcon"
            :name="item.tabName"
            :url="item.tabUrl"
            mode="update"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tab-form-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tab-form-enter-active,
.tab-form-leave-active {
  transition: opacity .2s ease;
}

.tab-form-enter-from,
.tab-form-leave-to {
  opacity: 0;
}
</style>
