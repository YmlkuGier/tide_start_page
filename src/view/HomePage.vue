<script setup lang="ts">
import SearchBar from "@/components/searchBar/SearchBar.vue";
import Logo from "@/components/logo.vue";
import TabBar from "@/components/tabBar/TabBar.vue";
import SettingButton from "@/components/searchBar/SettingButton.vue";

</script>

<template>
  <div class="homepage-wrap">
    <div class="background">
      <img src="@/assets/images/example.jpg" alt="">
    </div>
    <div class="main-wrap">
      <logo />
      <search-bar />
    </div>
    <setting-button />
    <tab-bar class="tab-bar" />
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
img {
  user-select: none;
}
.tab-bar {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}
</style>