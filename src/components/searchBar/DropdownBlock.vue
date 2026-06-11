<script setup lang="ts">
import {useViewportHeight} from "@/composables/useViewportHeight.ts";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";

const props = defineProps<{
  dataList: string[]
  keyboardSelectedIndex: number
  mouseSelectedIndex: number
  isKeyboardNavigating: boolean
  showDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', item: string): void
  (e: 'itemHover', index: number): void
  (e: 'delete', id: number): void
}>()

const dropdownContainerRef = ref<HTMLElement | null>(null)

const handleItemClick = (item: string) => {
  emit('select', item)
}

const {adjustHeightToFitViewport, initHeightAdjustment} = useViewportHeight(dropdownContainerRef)

onMounted(() => {
  window.addEventListener('resize', adjustHeightToFitViewport)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustHeightToFitViewport)
})
watch(props.dataList, (newList) => {
  if (newList.length > 0) {
    initHeightAdjustment()
  }
})
</script>

<template>
  <div>
    <div
        ref="dropdownContainerRef"
        class="data-list-wrap frosted-glass-show scrollbar-style-1"
        v-show="props.dataList.length"
        :class="{ 'keyboard-navigating': props.isKeyboardNavigating }"
    >
      <div
          class="suggest-list-item-wrap"
          v-for="(item, index) in props.dataList"
          :key="index"
          :class="{ 'selected': index === mouseSelectedIndex || index === keyboardSelectedIndex}"
          @click="handleItemClick(item)"
          @mouseenter="emit('itemHover', index)"
      >
        <div class="suggest-list-item">
          {{item}}
        </div>
        <img src="@/assets/svg/searchBar/search.svg" alt="" v-show="index === keyboardSelectedIndex">
        <div class="delete-button" @click.stop="emit('delete', index)">
          <img src="@/assets/svg/searchBar/delete.svg" alt="" v-show="props.showDelete && mouseSelectedIndex === index">
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.data-list-wrap {
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
  .delete-button {
    width: 20px;
    height: 20px;
    padding: 3px;
    border-radius: 10px;
    img {
      width: 100%;
    }
  }
  .delete-button:hover {
    cursor: pointer;
    background-color: var(--color-button-elevated);
  }
}
.data-list-wrap:not(.keyboard-navigating) .suggest-list-item-wrap:hover {
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