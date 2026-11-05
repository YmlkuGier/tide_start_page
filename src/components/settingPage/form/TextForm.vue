<script setup lang="ts">
defineProps<{ title: string; content: string }>()
</script>

<template>
  <section v-if="content && title" class="setting-form-wrap">
    <h2 class="setting-form-title-wrap">{{ title }}</h2>
    <div class="setting-form-content-wrap"><p class="text">{{ content }}</p></div>
  </section>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--color-settings-form-content);
  font-size: 14px;
  line-height: 1.95;
}
</style>