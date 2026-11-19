<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {keyLabels} from "@/utils/util.ts";

const props = defineProps({
  tabHotkey: String,
  tabIcon: {type: Blob, default: null},
  tabName: String,
  tabUrl: {type: String, default: ""},
})

const iconUrl = ref('')

const openPage = (url: string) => {
  location.assign(url)
}

// 监听快捷键打开书签
const onKeyDown = (e: KeyboardEvent) => {
  if (!props.tabHotkey?.trim() || !props.tabUrl || e.defaultPrevented || e.isComposing || e.repeat) return
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return

  const pressedKeys: string[] = []
  if (e.ctrlKey) pressedKeys.push('ctrl')
  if (e.altKey) pressedKeys.push('alt')
  if (e.shiftKey) pressedKeys.push('shift')
  if (e.metaKey) pressedKeys.push('meta')
  pressedKeys.push((keyLabels[e.key] ?? e.key).toLowerCase())

  const hotkeyKeys = props.tabHotkey.split('+').map(key => key.trim().toLowerCase())
  if (pressedKeys.sort().join('+') !== hotkeyKeys.sort().join('+')) return

  e.preventDefault()
  openPage(props.tabUrl)
}

watch(() => props.tabIcon, (icon) => {
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
  iconUrl.value = icon ? URL.createObjectURL(icon) : ''
}, {immediate: true})

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
})
</script>

<template>
  <div class="tabItem-wrap" @click="openPage(props.tabUrl)">
    <img v-if="iconUrl" :src="iconUrl" alt=""/>
    <img v-else src="@/assets/svg/tabBar/icon.svg" alt="">
    <span class="tabName">{{ props.tabName }}</span>
  </div>
</template>

<style scoped>
.tabItem-wrap {
  position: relative;
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

.tabName {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  z-index: 1;
  max-width: 180px;
  padding: 4px 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(17, 25, 40, 0.9);
  box-shadow: 0 6px 16px rgba(12, 25, 40, 0.28);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  opacity: 1;
  visibility: hidden;
  transform: translate(-50%, -4px);
  transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
}

.tabItem-wrap:hover .tabName {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

@media (prefers-reduced-motion: reduce) {
  .tabItem-wrap {
    transition: none;
  }

  .tabItem-wrap:hover {
    transform: none;
  }

  .tabName {
    transition: none;
  }
}
</style>
