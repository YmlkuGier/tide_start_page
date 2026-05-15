<script setup lang="ts">
import MenuItem from "../components/settingPage/leftMenu/menuItem.vue";
import aboutIcon from '@/assets/svg/setting/menu/about.svg'

const menuList = [
  {
    title: "关于Tide",
    icon: aboutIcon,
    pathName: "about"
  }
]
</script>

<template>
  <div class="setting-page-wrap">
    <div id="left-menu">
      <div v-for="item in menuList" :key="item.title">
        <MenuItem :title="item.title" :icon="item.icon" :url="item.pathName"/>
      </div>
    </div>
    <div id="setting-main-wrap">
      <RouterView />
    </div>
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
  min-width: 180px;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-settings-menu-bg);
}
#setting-main-wrap {
  flex: 1;
  padding-right: 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>