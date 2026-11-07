<script setup lang="ts">
import SettingsHeading from "@/components/settingPage/settingsHeading.vue";
import TabPlaceholder from "@/components/settingPage/tabBar/tabPlaceholder.vue";
import TabForm from "@/components/settingPage/form/tabForm.vue";
import {ref} from "vue";

const isTabForm = ref(false);

const showTabForm = () => {
  isTabForm.value = true;
}
</script>

<template>
  <div class="setting-content-wrap">
    <settings-heading
        settingsEyebrow="BOOKMARKS"
        title="书签栏"
        content="把常用的网站，放在触手可及的地方。"
    />
    <Transition name="tab-form" mode="out-in">
      <tab-placeholder
          v-if="!isTabForm"
          @show-tab-from="showTabForm()"
      />
      <tab-form v-else />
    </Transition>
  </div>
</template>

<style scoped>
.tab-form-enter-active,
.tab-form-leave-active {
  transition: opacity .2s ease;
}

.tab-form-enter-from,
.tab-form-leave-to {
  opacity: 0;
}
</style>
