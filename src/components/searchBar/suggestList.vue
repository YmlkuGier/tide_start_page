<script setup lang="ts">
import _ from "lodash";
import {ref, watch} from "vue";

const props = defineProps<{
  searchVal: string
}>()
const emit = defineEmits(["update:searchVal", "search"])
const search = (item: string) => {
  emit("update:searchVal", item)
  emit("search")
}

const suggestList = ref([])

const getSuggest = _.debounce(async (val: string) => {
  if (!val) {
    suggestList.value = []
    return
  }
  try {
    const res = await fetch(
        `/baidu/su?wd=${encodeURIComponent(val)}`
    )
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
    console.log(text)
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
</script>

<template>
  <div class="suggest-list-wrap frosted-glass-show" v-show="suggestList.length">
    <div class="suggest-list-item-wrap" v-for="item in suggestList" @click="search(item)">
      <div class="suggest-list-item">
        {{item}}
      </div>
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
}
.suggest-list-item-wrap {
  height: 40px;
  width: 100%;
  border-radius: 15px;
  padding: 0 15px;
  box-sizing: border-box;
  color: var(--color-search-suggest-font);
  display: flex;
  align-items: center;
  justify-content: start;
}
.suggest-list-item-wrap:hover {
  cursor: pointer;
  background-color: var(--color-button-elevated);
}
</style>