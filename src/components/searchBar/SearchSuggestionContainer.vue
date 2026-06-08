<script setup lang="ts">
import {useSearchSuggestion} from "@/composables/useSearchSuggestion.ts";
import {onBeforeUnmount, ref, watch} from "vue";
import {useKeyboardNavigation} from "@/composables/useKeyboardNavigation.ts";
import {useMouseNavigation} from "@/composables/useMouseNavigation.ts";
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";

const props = defineProps<{
  searchVal: string
}>()

const emit = defineEmits(["update:searchVal", "search"])

const {suggestList, getSuggest, clearSuggestions} = useSearchSuggestion()
const dropdownContainerRef = ref<HTMLElement | null>(null)

const handleSelect = (item: string) => {
  emit("update:searchVal", item)
  emit("search")
}
const {keyboardSelectedIndex, isKeyboardNavigating, handleKeyDown, setKeyboardSelectedIndex, resetKeyboardSelection} = useKeyboardNavigation({
  dataList: suggestList,
  containerRef: dropdownContainerRef,
  onSelect: handleSelect,
})
const {mouseSelectedIndex, setMouseSelectedIndex, resetMouseSelection} = useMouseNavigation()

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