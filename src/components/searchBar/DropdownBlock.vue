<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useViewportHeight} from "@/composables/useViewportHeight.ts";

const props = defineProps<{
  // 选项列表
  dataList: string[] | { id: number; keyword: string }[]
  // 高亮的选项索引
  keyboardSelectedIndex: number
  // 通过鼠标选择的选项索引
  mouseSelectedIndex: number
  // 是否是键盘导航
  isKeyboardNavigating: boolean
  // 显示删除按钮
  showDelete?: boolean
}>()

const emit = defineEmits<{
  // 选择选项
  (e: 'select', item: string): void
  // 鼠标移入选项
  (e: 'itemHover', index: number): void
  // 删除选项
  (e: 'delete', id: number): void
}>()

const dropdownContainerRef = ref<HTMLElement | null>(null)

// 点击选项函数
const handleItemClick = (item: string | { id: number; keyword: string }) => {
  const value = typeof item === 'string' ? item : item.keyword
  // 向上冒泡到SearchBar执行搜索函数
  emit('select', value)
}

const {adjustHeightToFitViewport, initHeightAdjustment} = useViewportHeight(dropdownContainerRef)

watch(props.dataList, (newList) => {
  if (newList.length > 0) {
    initHeightAdjustment()
  }
})
onMounted(() => {
  // 监听窗口大小,修改下拉框高度
  window.addEventListener('resize', adjustHeightToFitViewport)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustHeightToFitViewport)
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
          @mouseleave="emit('itemHover', -1)"
      >
        <div class="suggest-list-item">
          {{typeof item === 'string' ? item : item.keyword}}
        </div>
        <img src="@/assets/svg/searchBar/search.svg" alt="" v-show="index === keyboardSelectedIndex">
        <div
            class="delete-button"
            @click.stop="emit('delete', typeof item === 'string' ? -1 : item.id)"
            v-show="props.showDelete && mouseSelectedIndex === index"
        >
          <img src="@/assets/svg/searchBar/delete.svg" alt="">
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