<script setup lang="ts">
import _ from "lodash";
import {ref, watch} from "vue";
import DropdownBlock from "@/components/searchBar/DropdownBlock.vue";

const props = defineProps<{
  searchVal: string
}>()
const emit = defineEmits(["update:searchVal", "search"])
const search = (item: string) => {
  emit("update:searchVal", item)
  emit("search")
}

const suggestList = ref([])
const dropdownContainerRef = ref<InstanceType<typeof DropdownBlock> | null>(null)

const getSuggest = _.debounce(async (val: string) => {
  if (!val) {
    suggestList.value = []
    return
  }
  try {
    const isExtension = window.location.protocol === 'chrome-extension:' ||
        window.location.protocol === 'moz-extension:' ||
        window.location.protocol === 'safari-extension:'
    const apiUrl = isExtension
        ? `https://suggestion.baidu.com/su?wd=${encodeURIComponent(val)}`
        : `/baidu/su?wd=${encodeURIComponent(val)}`
    const res = await fetch(apiUrl)
    // 手动解码来处理 GBK 编码
    const buffer = await res.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let text: string
    try {
      const decoder = new TextDecoder('gbk')
      text = decoder.decode(bytes)
    } catch (e) {
      // 如果浏览器不支持 GBK 解码器，使用默认方式
      const blob = new Blob([bytes])
      text = await blob.text()
    }
    const start = text.indexOf('[')
    const end = text.lastIndexOf(']') + 1
    suggestList.value = JSON.parse(text.slice(start, end))
  } catch (error) {
    console.error('获取搜索建议失败:', error)
    suggestList.value = []
  }
}, 200)

watch(() => props.searchVal, (newVal) => {
  getSuggest(newVal)
})

// 转发 handleKeyDown
const handleKeyDown = (e: KeyboardEvent) => {
  if (dropdownContainerRef.value) {
    dropdownContainerRef.value.handleKeyDown(e)
  }
}
defineExpose({
  handleKeyDown
})
</script>

<template>
  <dropdown-block
      ref="dropdownContainerRef"
      v-model:data-list="suggestList"
      @search="search"
  />
</template>

<style scoped>

</style>