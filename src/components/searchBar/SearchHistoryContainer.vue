<script setup lang="ts">
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";
import {type Ref, ref} from "vue";
import {useKeyboardNavigation} from "@/composables/useKeyboardNavigation.ts";
import {useMouseNavigation} from "@/composables/useMouseNavigation.ts";

const emit = defineEmits(["update:searchVal", "search"])

const dropdownContainerRef = ref<HTMLElement | null>(null)

const history: Ref<string[]> = ref([
    "模拟数据1",
    "模拟数据2",
    "模拟数据3"
])

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
  dataList: history,
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
      :data-list="history"
      :keyboard-selected-index="keyboardSelectedIndex"
      :mouse-selected-index="mouseSelectedIndex"
      :is-keyboard-navigating="isKeyboardNavigating"
      @select="handleSelect"
      @item-hover="setSelectedIndex"
  />
</template>

<style scoped>

</style>