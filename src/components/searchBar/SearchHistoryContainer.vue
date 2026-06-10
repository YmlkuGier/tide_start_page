<script setup lang="ts">
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";
import {ref} from "vue";
import {useKeyboardNavigation} from "@/composables/useKeyboardNavigation.ts";
import {useMouseNavigation} from "@/composables/useMouseNavigation.ts";
import {useSearchHistory} from "@/composables/useSearchHistory.ts";

const emit = defineEmits(["update:searchVal", "search"])

const {searchHistory} = useSearchHistory()

const dropdownContainerRef = ref<HTMLElement | null>(null)

const handleSelect = (item: string) => {
  emit("update:searchVal", item)
  emit("search")
}
const setSelectedIndex = (index: number) => {
  resetKeyboardSelection()
  setMouseSelectedIndex(index)
}
const handleKeyDownSelect = (e: KeyboardEvent) => {
  if (keyboardSelectedIndex.value === -1) {
    setKeyboardSelectedIndex(mouseSelectedIndex.value)
    resetMouseSelection()
  }
  handleKeyDown(e)
}

const {keyboardSelectedIndex, isKeyboardNavigating, setKeyboardSelectedIndex, handleKeyDown, resetKeyboardSelection} = useKeyboardNavigation({
  dataList: searchHistory,
  containerRef: dropdownContainerRef,
  onSelect: handleSelect
})
const {mouseSelectedIndex, setMouseSelectedIndex, resetMouseSelection} = useMouseNavigation()

defineExpose({
  handleKeyDownSelect
})
</script>

<template>
  <dropdown-block
      ref="dropdownContainerRef"
      :data-list="searchHistory"
      :keyboard-selected-index="keyboardSelectedIndex"
      :mouse-selected-index="mouseSelectedIndex"
      :is-keyboard-navigating="isKeyboardNavigating"
      @select="handleSelect"
      @item-hover="setSelectedIndex"
  />
</template>

<style scoped>

</style>