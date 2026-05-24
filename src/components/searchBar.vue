<script setup lang="ts">
import {ref, watch} from "vue";
import baiduIcon from '../assets/svg/searchBar/engine/baidu.svg?url'
import bingIcon from '../assets/svg/searchBar/engine/bing.svg?url'
import googleIcon from '../assets/svg/searchBar/engine/google.svg?url'
import gsap from 'gsap';
import _ from "lodash";
import {useClickOutside} from "@/utils/util.ts";

const searchBarWrapRef = ref<HTMLElement | null>(null)
const isSearchOption = ref(false)
const searchVal = ref('')
const searchOptionID = ref('bing')
const searchURL = ref('https://www.bing.com/search?q=')
const searchItem = ref([
  {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    icon: baiduIcon
  },
  {
    id: 'bing',
    name: '必应',
    url: 'https://www.bing.com/search?q=',
    icon: bingIcon
  },
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: googleIcon
  }
])
const suggestList = ref([])

const mobileComponents = (direction : boolean) => {
  // true是向上移动,false是向下移动
  gsap.to(".main-wrap", {
    y: direction ? -150 : 0,
    duration: 0.5,
    ease: "power2.out",
  });
  gsap.to(".suggest-list-wrap",{
    opacity: direction ? 1 : 0,
    pointerEvents: direction ? "auto" : "none",
    y: direction ? -20 : 0,
    duration: 0.5,
    ease: "power2.out"
  });
}

const openSearchOptions = () => {
  isSearchOption.value = !isSearchOption.value
}
const settingSearchOptions = (id: string) => {
  searchOptionID.value = id
  searchURL.value = searchItem.value.find(item => item.id === id)?.url || ''
  isSearchOption.value = false
}
const search = () => {
  if (!searchVal.value.trim()) return
  if (searchURL.value) {
    window.location.href = searchURL.value + encodeURIComponent(searchVal.value)
  }
}
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

useClickOutside(searchBarWrapRef, () => {
  mobileComponents(false)
  isSearchOption.value = false
})
watch(searchVal, getSuggest)
</script>

<template>
  <div class="searchBar_wrap" ref="searchBarWrapRef">
    <div class="searchBar frosted-glass-show">
      <div class="icon_wrap" @click="openSearchOptions">
        <img :src="searchItem.find(item => item.id === searchOptionID)?.icon" alt="">
      </div>
      <input
          id="input"
          v-model="searchVal"
          placeholder="输入搜索内容"
          @keyup.enter="search"
          autocomplete="off"
          @focus="mobileComponents(true);"
      >
      <div id="search" @click="search">
        <img src="../assets/svg/searchBar/arrow_right.svg" alt="">
      </div>
    </div>
    <div class="suggest-list-wrap frosted-glass-show" v-show="suggestList.length">
      <div class="suggest-list-item-wrap" v-for="item in suggestList" @click="searchVal = item; search()">
        <div class="suggest-list-item">
          {{item}}
        </div>
      </div>
    </div>
    <div class="option_wrap frosted-glass-show" v-show="isSearchOption">
      <div class="opt" v-for="item in searchItem" :key="item.id" @click="settingSearchOptions(item.id)">
        <img :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.searchBar_wrap {
  position: relative;
  width: auto;
  height: auto;
  border-radius: 25px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.searchBar {
  height: 50px;
  width: 600px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  background-color: rgba(17, 25, 40, 0.23);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  img {
    width: 24px;
    margin-left: 10px;
    margin-right: 5px;
  }
}
.searchBar:hover {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
}
.searchBar:focus-within {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
}
#input {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: var(--color-search-font);
}
#input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.icon_wrap {
  width: 50px;
  height: 50px;
  border-radius: 25px 0 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon_wrap:hover {
  background-color: var(--color-button-elevated);
}
#input {
  height: 100%;
  flex: 1;
  padding-top: 3px;
  font-size: 16px;
  font-weight: normal;
  -webkit-text-stroke: 0.5px transparent;
  border: none;
  outline: none;
  box-shadow: none;
  box-sizing: border-box;
}
#search {
  width: 60px;
  height: 50px;
  border-radius: 0 25px 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 24px;
    margin-left: 5px;
    margin-right: 10px;
  }
}
#search:hover {
  background-color: var(--color-button-elevated);
}
.option_wrap {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 10;
  min-width: 150px;
  max-width: 200px;
  width: fit-content;
  height: auto;
  border-radius: 15px;
  background-color: rgba(17, 25, 40, 0.23);
  padding: 0 5px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.opt {
  border-radius: 15px;
  width: 100%;
  white-space: nowrap;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  img {
    width: 30px;
    height: 30px;
  }
  span {
    color: rgba(255, 255, 255, 0.92);
    font-size: 16px;
    max-width: calc(100% - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
  }
}
.opt:hover {
  background-color: var(--color-button-elevated);
}
img {
  user-select: none;
}
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