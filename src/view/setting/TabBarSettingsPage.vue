<script setup lang="ts">
import SettingsHeading from "@/components/settingPage/settingsHeading.vue";
// import BookmarkPlaceholder from "@/components/settingPage/tabBar/bookmarkPlaceholder.vue";
import TabForm from "@/components/settingPage/form/tabForm.vue";

</script>

<template>
  <div class="setting-content-wrap">
    <settings-heading
        settingsEyebrow="BOOKMARKS"
        title="书签栏"
        content="把常用的网站，放在触手可及的地方。"
    />
<!--    <bookmark-placeholder/>-->
    <tab-form/>
  </div>
</template>

<style scoped>

</style>
