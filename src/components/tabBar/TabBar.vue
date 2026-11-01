<script setup lang="ts">

import TabItem from "@/components/tabBar/TabItem.vue";
</script>

<template>
<div class="tabBar-wrap">
  <tab-item v-for="item in [1, 2, 3]" :key="item"  />
</div>
</template>

<style scoped>
.tabBar-wrap {
  height: 56px;
  width: auto;
  min-width: 200px;
  max-width: 600px;
  padding: 0 16px;
  border-radius: 24px;
  background-color: #fff;

  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  overflow: hidden;
  justify-content: safe center;
}

.tabBar-wrap > * {
  flex-shrink: 0;
}
</style>