<script setup lang="ts">
const props = defineProps({
  settingsEyebrow: String,
  title: String,
  content: String
})
</script>

<template>
  <header class="settings-heading">
    <span class="settings-eyebrow">{{props.settingsEyebrow}}</span>
    <h1>{{props.title}}</h1>
    <p>{{props.content}}</p>
  </header>
</template>

<style scoped>
.settings-heading {
  margin-bottom: 4px;
}

.settings-eyebrow {
  color: var(--color-settings-accent);
  font-size: 10px;
  letter-spacing: 2.5px;
}

.settings-heading h1 {
  margin: 12px 0 10px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.4;
}

.settings-heading p {
  margin: 0;
  color: var(--color-settings-muted);
  font-size: 13px;
  line-height: 1.8;
}
</style>