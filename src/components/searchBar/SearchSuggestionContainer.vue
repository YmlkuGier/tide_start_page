<script setup lang="ts">
import {onBeforeUnmount, ref, watch} from "vue";
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";
import {useSearchSuggestion} from "@/composables/useSearchSuggestion.ts";
import {useKeyboardNavigation} from "@/composables/useKeyboardNavigation.ts";
import {useMouseNavigation} from "@/composables/useMouseNavigation.ts";

const props = defineProps<{
  searchVal: string
}>()

const emit = defineEmits(["update:searchVal", "search"])

const dropdownContainerRef = ref<HTMLElement | null>(null)

const handleSelect = (item: string) => {
  // 向上冒泡到SearchBar执行搜索函数
  emit("update:searchVal", item)
  emit("search")
}
// 鼠标移入选项时触发函数
const setSelectedIndex = (index: number) => {
  resetKeyboardSelection()
  setMouseSelectedIndex(index)
}
// 按键监听, 向外暴露
const handleKeyDownSelect = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    // 不处于键盘监听的状态下, 直接搜索
    if (!isKeyboardNavigating.value && keyboardSelectedIndex.value === -1) {
      return
    }
  }
  // 鼠标的悬停选中索引同步给键盘导航
  if (keyboardSelectedIndex.value === -1 && mouseSelectedIndex.value !== -1) {
    setKeyboardSelectedIndex(mouseSelectedIndex.value)
    resetMouseSelection()
  }
  handleKeyDown(e)
}

const {suggestList, getSuggest, clearSuggestions} = useSearchSuggestion()
const {keyboardSelectedIndex, isKeyboardNavigating, handleKeyDown, setKeyboardSelectedIndex, resetKeyboardSelection} = useKeyboardNavigation({
  dataList: suggestList,
  containerRef: dropdownContainerRef,
  onSelect: handleSelect,
})
const {mouseSelectedIndex, setMouseSelectedIndex, resetMouseSelection} = useMouseNavigation()

// 监听搜索词, 获取搜索联想列表
watch(() => props.searchVal, (newVal) => {
  getSuggest(newVal)
})
onBeforeUnmount(() => {
  clearSuggestions()
})

defineExpose({
  handleKeyDownSelect
})
</script>

<template>
  <dropdown-block
      ref="dropdownContainerRef"
      :data-list="suggestList"
      :keyboard-selected-index="keyboardSelectedIndex"
      :mouse-selected-index="mouseSelectedIndex"
      :is-keyboard-navigating="isKeyboardNavigating"
      @select="handleSelect"
      @item-hover="setSelectedIndex"
  />
</template>

<style scoped>

</style>