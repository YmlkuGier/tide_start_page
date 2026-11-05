<script setup lang="ts">
defineProps<{ title: string; icon: string; pathName: string }>()
</script>

<template>
  <RouterLink class="menu-item-wrap" active-class="is-active" :to="{ name: pathName }">
    <img class="menu-item-icon" :src="icon" alt="">
    <span>{{ title }}</span>
    <span class="active-dot" aria-hidden="true"></span>
  </RouterLink>
</template>

<style scoped>
.menu-item-wrap {
  min-height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-settings-menu-font);
  text-decoration: none;
  font-size: 13px;
  transition: background .2s, color .2s;
}

.menu-item-wrap:hover {
  background: var(--color-settings-menu-elevated);
  color: #fff;
}

.menu-item-wrap:focus-visible {
  outline: 2px solid var(--color-settings-accent);
  outline-offset: 3px;
}

.menu-item-wrap.is-active {
  background: #b9e8dd12;
  color: var(--color-settings-accent);
}

.menu-item-icon {
  width: 19px;
  height: 19px;
  opacity: .7;
}

.active-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-left: auto;
  background: currentColor;
  visibility: hidden;
}

.is-active .active-dot {
  visibility: visible;
}
</style>
