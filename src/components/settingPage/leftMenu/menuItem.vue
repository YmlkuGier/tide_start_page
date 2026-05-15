<script setup lang="ts">
const props = defineProps({
  title: String,
  icon: String,
  url: String
})
</script>

<template>
  <div class="menu-item-wrap" @click="$router.push(props.url ? props.url : '/')">
    <img class="menu-item-icon" :src="props.icon" alt="">
    <div class="menu-item-title">{{ props.title }}</div>
  </div>
</template>

<style scoped>
.menu-item-wrap {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 0 25px 25px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.menu-item-wrap:hover {
  background-color: var(--color-settings-menu-elevated);
}
.menu-item-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.menu-item-title {
  color: var(--color-settings-menu-font);
}
</style>