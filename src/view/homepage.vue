<script setup lang="ts">
import SearchBar from "../components/searchBar.vue";
import router from "../router";
import Logo from "../components/logo.vue";

</script>

<template>
  <div class="homepage-wrap">
    <div class="background">
      <img src="../assets/images/example.jpg" alt="">
    </div>
    <div class="main-wrap">
      <logo />
      <search-bar />
    </div>
    <div class="setting-wrap" @click="router.push('/settings')">
      <img src="../assets/svg/setting.svg" alt="">
    </div>
  </div>
</template>

<style scoped>
.homepage-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.main-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.background {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-bg);
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
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