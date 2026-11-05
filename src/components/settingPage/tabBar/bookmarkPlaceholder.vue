<script setup lang="ts">
import tabIcon from '@/assets/svg/setting/menu/tab.svg';

</script>

<template>
  <section class="bookmark-placeholder">
    <div class="placeholder-icon"><img :src="tabIcon" alt=""></div>
    <h2>你的常用网站，即将就位</h2>
    <p>书签栏设置正在开发中，后续将在这里提供自定义管理。</p>
    <span>敬请期待</span>
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

.bookmark-placeholder > span {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  background: #b9e8dd0d;
  color: var(--color-settings-accent);
  font-size: 11px;
}
</style>