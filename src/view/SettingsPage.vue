<script setup lang="ts">
import MenuItem from "@/components/settingPage/leftMenu/MenuItem.vue";
import aboutIcon from '@/assets/svg/setting/menu/about.svg';
import homeIcon from '@/assets/svg/setting/menu/home.svg';
import tabIcon from '@/assets/svg/setting/menu/tab.svg';

const menuList = [
  {title: "关于 Tide", icon: aboutIcon, pathName: "about"},
  {title: "书签栏", icon: tabIcon, pathName: "tab-bar"}
]
</script>

<template>
  <div class="setting-page-wrap">
    <aside class="settings-sidebar">
      <RouterLink class="settings-brand" :to="{ name: 'Homepage' }" aria-label="Tide 主页">
        <span class="brand-symbol">T</span>
        <span>Tide <small>起始页</small></span>
      </RouterLink>
      <div class="nav-label">偏好设置</div>
      <nav class="settings-nav" aria-label="设置导航">
        <MenuItem v-for="item in menuList" :key="item.pathName" v-bind="item"/>
      </nav>
      <div class="sidebar-bottom">
        <MenuItem title="返回主页" :icon="homeIcon" pathName="Homepage"/>
      </div>
    </aside>
    <main class="settings-main">
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
.setting-page-wrap {
  min-height: 100vh;
  background: var(--color-settings-bg);
  color: var(--color-settings-form-title);
  display: flex;
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}

.settings-sidebar {
  width: 248px;
  flex-shrink: 0;
  padding: 36px 18px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--color-settings-menu-bg);
  border-right: 1px solid var(--color-settings-border);
}

.settings-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  color: inherit;
  text-decoration: none;
  font-size: 23px;
  font-weight: 600;
}

.brand-symbol {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #b9e8dd;
  color: #183c34;
  font-family: Georgia, serif;
  font-style: italic;
}

.settings-brand small {
  display: block;
  margin-top: 3px;
  color: var(--color-settings-muted);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 2px;
}

.nav-label {
  padding: 0 14px;
  margin: 48px 0 14px;
  font-size: 11px;
  color: var(--color-settings-muted);
  letter-spacing: 2px;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-bottom {
  margin-top: auto;
  padding-top: 64px;
}

.sidebar-bottom p {
  margin: 20px 14px 0;
  font-size: 10px;
  line-height: 1.8;
  color: var(--color-settings-muted);
}

.settings-main {
  flex: 1;
  min-width: 0;
  padding: 30px clamp(24px, 6vw, 100px) 64px;
}

.settings-topbar span {
  margin: 0 12px;
  opacity: .5;
}

@media (max-width: 700px) {
  .setting-page-wrap {
    flex-direction: column;
  }

  .settings-sidebar {
    width: 100%;
    padding: 20px;
    border-right: 0;
    border-bottom: 1px solid var(--color-settings-border);
  }

  .settings-brand {
    padding: 0;
  }

  .nav-label, .sidebar-bottom p {
    display: none;
  }

  .settings-nav {
    flex-direction: row;
    margin-top: 24px;
  }

  .settings-nav > * {
    flex: 1;
  }

  .sidebar-bottom {
    padding: 0;
    margin: 12px 0 0;
  }

  .settings-main {
    padding: 24px 20px 40px;
  }
}
</style>
