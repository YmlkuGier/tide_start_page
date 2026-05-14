<script setup lang="ts">

</script>

<template>
  <div class="setting-page-wrap">
    <div id="left-menu"></div>
    <div id="setting-main-wrap"></div>
  </div>
</template>

<style scoped>
.setting-page-wrap {
  width: 100%;
  height: 100vh;
  background-color: var(--color-settings-bg);
  display: flex;
}
#left-menu {
  width: 250px;
  height: 100%;
  background-color: var(--color-settings-menu-bg);
}
#setting-main-wrap {
  flex: 1;
}
</style>