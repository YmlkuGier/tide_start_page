<script setup lang="ts">
import SearchBar from "../components/searchBar.vue";
import router from "../router";

</script>

<template>
  <div class="main-wrap">
    <search-bar />
  </div>
  <div class="setting-wrap" @click="router.push('/settings')">
    <img src="../assets/setting.svg" alt="">
  </div>
</template>

<style scoped>
.main-wrap {
  width: 100%;
  height: 100vh;
  background-color: var(--color-bg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.setting-wrap {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.setting-wrap:hover {
  background-color: var(--color-button-elevated);
}
img {
  user-select: none;
}
</style>