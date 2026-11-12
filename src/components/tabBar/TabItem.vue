<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";

const props = defineProps({
  tabHotkey: String,
  tabIcon: Blob,
  tabName: String,
  tabUrl: String
})

const iconUrl = ref('')

watch(() => props.tabIcon, (icon) => {
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
  iconUrl.value = icon ? URL.createObjectURL(icon) : ''
}, {immediate: true})

onUnmounted(() => {
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
})
</script>

<template>
  <div class="tabItem-wrap">
    <img v-if="iconUrl" :src="iconUrl" alt=""/>
  </div>
</template>

<style scoped>
.tabItem-wrap {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.13);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  transition: background-color .2s ease, transform .2s ease;
}

.tabItem-wrap:hover {
  background-color: rgb(118 202 255 / 0.12);
  transform: translateY(-2px);
}

.tabItem-wrap img {
  display: block;
  width: 26px;
  height: 26px;
  object-fit: contain;
  object-position: center;
}

@media (prefers-reduced-motion: reduce) {
  .tabItem-wrap {
    transition: none;
  }

  .tabItem-wrap:hover {
    transform: none;
  }
}
</style>
