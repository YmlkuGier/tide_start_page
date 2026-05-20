<script setup lang="ts">
const props = defineProps({
  title: String,
  content: String
})
</script>

<template>
  <div class="setting-form-wrap" style="height: 200px" v-if="content && title">
    <span class="setting-form-title-wrap">{{props.title}}</span>
    <div class="setting-form-content-wrap" style="font-size: 15px">
      <div class="text">
        {{props.content}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.text {
  color: var(--color-settings-form-content);
  text-indent: 2ch;
  font-size: 15px;
}
</style>