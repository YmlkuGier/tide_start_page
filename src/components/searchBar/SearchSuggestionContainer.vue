<script setup lang="ts">
import {useSearchSuggestion} from "@/composables/useSearchSuggestion.ts";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useViewportHeight} from "@/composables/useViewportHeight.ts";
import {useKeyboardNavigation} from "@/composables/useKeyboardNavigation.ts";
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";

const props = defineProps<{
  searchVal: string
}>()

const emit = defineEmits(["update:searchVal", "search"])

const {suggestList, getSuggest, clearSuggestions} = useSearchSuggestion()
const dropdownContainerRef = ref<HTMLElement | null>(null)
const {adjustHeightToFitViewport, initHeightAdjustment} = useViewportHeight(dropdownContainerRef)

const handleSelect = (item: string) => {
  emit("update:searchVal", item)
  emit("search")
}
const {selectedIndex, isKeyboardNavigating, handleKeyDown, handleMouseMove, resetSelection} = useKeyboardNavigation({
  dataList: suggestList,
  containerRef: dropdownContainerRef,
  onSelect: handleSelect
})

const handleResize = () => {
  adjustHeightToFitViewport()
}

watch(() => props.searchVal, (newVal) => {
  getSuggest(newVal)
  resetSelection()
})
watch(suggestList, (newList) => {
  if (newList.length > 0) {
    initHeightAdjustment()
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  clearSuggestions()
})

defineExpose({
  handleKeyDown
})
</script>

<template>
  <dropdown-block
      ref="dropdownContainerRef"
      :data-list="suggestList"
      :selected-index="selectedIndex"
      :is-keyboard-navigating="isKeyboardNavigating"
      @select="handleSelect"
      @mouse-move="handleMouseMove"
  />
</template>

<style scoped>

</style>