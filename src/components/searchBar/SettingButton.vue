<script setup lang="ts">
import router from "@/router";

</script>

<template>
  <button
      class="setting-wrap"
      type="button"
      aria-label="打开设置"
      title="设置"
      @click="router.push('/settings')"
  >
    <img src="@/assets/svg/setting.svg" alt="">
  </button>
</template>

<style scoped>
.setting-wrap {
  position: fixed;
  bottom: 16px;
  left: 24px;
  z-index: 100;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid var(--color-setting-button-border);
  border-radius: 45%;
  background: var(--color-setting-button-bg);
  box-shadow: var(--color-setting-button-shadow);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  color: inherit;
  cursor: pointer;
  transition: transform .2s ease, border-color .2s ease, background-color .2s ease, box-shadow .2s ease;

  img {
    width: 30px;
    height: 30px;
    transition: transform .2s ease;
  }
}
.setting-wrap:hover {
  transform: translateY(-3px);
  border-color: var(--color-setting-button-hover-border);
  background-color: var(--color-setting-button-hover-bg);
  box-shadow: var(--color-setting-button-hover-shadow);

  img {
    transform: rotate(28deg);
  }
}
.setting-wrap:active {
  transform: translateY(-1px) scale(.96);
}
.setting-wrap:focus-visible {
  outline: 2px solid var(--color-setting-button-focus-outline);
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  .setting-wrap,
  .setting-wrap img {
    transition: none;
  }

  .setting-wrap:hover,
  .setting-wrap:active {
    transform: none;
  }

  .setting-wrap:hover img {
    transform: none;
  }
}
</style>
