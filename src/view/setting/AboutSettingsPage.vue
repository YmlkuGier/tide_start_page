<script setup lang="ts">
import TextForm from "@/components/settingPage/form/TextForm.vue";
import VersionCard from "@/components/settingPage/card/versionCard.vue";
import SettingsHeading from "@/components/settingPage/settingsHeading.vue";

</script>

<template>
  <div class="setting-content-wrap">
    <settings-heading
        settingsEyebrow="ABOUT TIDE"
        title="关于 Tide"
        content="从这里, 开始了解汐式起始页"
    />
    <version-card/>
    <TextForm
        title="关于此软件"
        :content="'汐式起始页（潮汐起始页）是一款支持高度自定义的浏览器起始页扩展。简洁或丰富，由你定义。后续功能正在持续制作中，敬请期待'"
    />
  </div>
</template>

<style scoped>
</style>
