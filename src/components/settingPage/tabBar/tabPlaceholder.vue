<script setup lang="ts">
import tabIcon from '@/assets/svg/setting/menu/tab.svg';

const emit = defineEmits<{
  showTabFrom: []
}>();

</script>

<template>
  <section class="bookmark-placeholder">
    <div class="placeholder-icon"><img :src="tabIcon" alt=""></div>
    <h2>目前没有书签</h2>
    <p>添加书签, 可以在起始页使用热键进行跳转</p>
    <button type="button" @click="emit('showTabFrom')">添加书签</button>
  </section>
</template>

<style scoped>
.bookmark-placeholder {
  padding: 64px 24px;
  border: 1px solid var(--color-settings-border);
  border-radius: 18px;
  background: var(--color-settings-form-bg);
  text-align: center;
}

.placeholder-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  margin: 0 auto 24px;
  border-radius: 16px;
  background: #b9e8dd0d;
}

.placeholder-icon img {
  width: 26px;
  height: 26px;
  opacity: .65;
}
h2 {
  font-size: 17px;
  font-weight: 500;
}

p {
  margin: 12px 0 24px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--color-settings-muted);
}

.bookmark-placeholder > button {
  display: inline-block;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #b9e8dd0d;
  color: var(--color-settings-accent);
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: background-color .2s, transform .2s;
}

.bookmark-placeholder > button:hover {
  background: #b9e8dd20;
}

.bookmark-placeholder > button:active {
  transform: scale(.96);
}
</style>
