<script setup lang="ts">
import {nextTick, ref, watch} from "vue";

const props = defineProps<{
  dataList: string[]
}>()
const emit = defineEmits(["update:dataList", "search"])
const search = (item: string) => {
  emit("search", item)
}

const selectedIndex = ref(-1)
const isKeyboardNavigating = ref(false)
const dataListRef = ref<HTMLElement | null>(null)

const adjustHeightToFitViewport = () => {
  if (!dataListRef.value) return
  const viewportHeight = window.innerHeight
  const rect = dataListRef.value.getBoundingClientRect()
  const bottomSpace = viewportHeight - rect.top
  const maxHeight = Math.max(bottomSpace - 20, 100)
  dataListRef.value.style.maxHeight = `${maxHeight}px`
  dataListRef.value.style.overflowY = 'auto'
}

const scrollToSelected = () => {
  if (!dataListRef.value || selectedIndex.value < 0) return
  nextTick(() => {
    const selectedElement = dataListRef.value?.querySelector('.selected') as HTMLElement
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.dataList.length) return
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      isKeyboardNavigating.value = true
      selectedIndex.value = (selectedIndex.value + 1) % props.dataList.length
      scrollToSelected()
      break
    case 'ArrowUp':
      e.preventDefault();
      isKeyboardNavigating.value = true
      selectedIndex.value = selectedIndex.value <= 0 ? props.dataList.length - 1 : selectedIndex.value - 1
      scrollToSelected()
      break
    case 'Enter':
      if (selectedIndex.value >= 0 && selectedIndex.value < props.dataList.length) {
        e.preventDefault()
        search(props.dataList[selectedIndex.value])
      }
      break
  }
}
const handleMouseMove = () => {
  isKeyboardNavigating.value = false
  selectedIndex.value = -1
}

watch(() => props.dataList, () => {
  if (props.dataList.length > 0) {
    nextTick(() => {
      adjustHeightToFitViewport()
    })
  }
})
window.addEventListener('resize', adjustHeightToFitViewport)
defineExpose({
  handleKeyDown
})
</script>

<template>
  <div
      class="suggest-list-wrap frosted-glass-show scrollbar-style-1"
      v-show="props.dataList.length"
      ref="dataListRef"
      :class="{ 'keyboard-navigating': isKeyboardNavigating }"
      @mousemove="handleMouseMove"
  >
    <div
        class="suggest-list-item-wrap"
        v-for="(item, index) in props.dataList"
        :class="{ 'selected': index === selectedIndex }"
        @click="search(item)"
    >
      <div class="suggest-list-item">
        {{item}}
      </div>
      <img src="@/assets/svg/searchBar/search.svg" alt="" v-show="index === selectedIndex">
    </div>
  </div>
</template>

<style scoped>
.suggest-list-wrap {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 9;
  padding: 10px 3px;
  margin-top: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(17, 25, 40, 0.23);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  border: none;
}
.suggest-list-item-wrap {
  min-height: 40px;
  width: 100%;
  border-radius: 15px;
  padding: 0 15px;
  box-sizing: border-box;
  color: var(--color-search-suggest-font);
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 20px;
  }
}
.suggest-list-wrap:not(.keyboard-navigating) .suggest-list-item-wrap:hover {
  cursor: pointer;
  background-color: var(--color-button-elevated);
}
.suggest-list-item-wrap.selected{
  cursor: pointer;
  background-color: var(--color-button-elevated);
}
.suggest-list-item {
  font-size: 14px;
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}
</style>