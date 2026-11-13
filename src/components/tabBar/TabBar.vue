<script setup lang="ts">
import TabItem from "@/components/tabBar/TabItem.vue";
import {TabRepository} from "@/database/tab.ts";
import {onMounted, ref} from "vue";

const tabItemList = ref()

onMounted(() => {
  TabRepository.getAll().then((res) => {
    tabItemList.value = res;
    console.log(tabItemList.value);
  })
})
</script>

<template>
<div v-if="tabItemList?.length" class="tabBar-wrap">
  <tab-item
      v-for="item in tabItemList"
      :key="item.id"
      :tab-hotkey="item.tabHotkey"
      :tab-icon="item.tabIcon"
      :tab-name="item.tabName"
      :tab-url="item.tabUrl"
  />
</div>
</template>

<style scoped>
.tabBar-wrap {
  box-sizing: border-box;
  min-width: 100px;
  max-width: min(600px, calc(100vw - 24px));
  padding: 8px 16px;

  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 23px;
  background: rgba(17, 25, 40, 0.46);
  box-shadow: 0 12px 32px rgba(12, 25, 40, 0.28), inset 0 1px rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: translate .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.tabBar-wrap:hover {
  translate: 0 -3px;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(17, 25, 40, 0.58);
  box-shadow: 0 16px 38px rgba(12, 25, 40, 0.36), inset 0 1px rgba(255, 255, 255, 0.18);
}

.tabBar-wrap::-webkit-scrollbar {
  display: none;
}

.tabBar-wrap > * {
  flex-shrink: 0;
}

@media (prefers-reduced-motion: reduce) {
  .tabBar-wrap {
    transition: none;
  }

  .tabBar-wrap:hover {
    translate: none;
  }
}
</style>
