<script setup lang="ts">
import SettingsSidebar from "@/components/settingPage/leftMenu/SettingsSidebar.vue";

</script>

<template>
  <div class="setting-page-wrap">
    <SettingsSidebar />
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

.settings-main {
  flex: 1;
  min-width: 0;
  padding: 30px clamp(24px, 6vw, 100px) 64px;
}

@media (max-width: 700px) {

  .setting-page-wrap {
    flex-direction: column;
  }

  .settings-main {
    padding: 24px 20px 40px;
  }

}
</style>
