<script setup lang="ts">
import {ref} from "vue";
import baiduIcon from '@/assets/svg/searchBar/engine/baidu.svg?url'
import bingIcon from '@/assets/svg/searchBar/engine/bing.svg?url'
import googleIcon from '@/assets/svg/searchBar/engine/google.svg?url'
import SearchSuggestionContainer from "@/components/searchBar/SearchSuggestionContainer.vue";
import gsap from 'gsap';
import {useClickOutside} from "@/utils/util.ts";

const searchBarWrapRef = ref<HTMLElement | null>(null)
const suggestListRef = ref<InstanceType<typeof SearchSuggestionContainer> | null>(null)
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

const animateSearchBar = (isOpen: boolean) => {
  gsap.to(".main-wrap", {
    y: isOpen ? '-20%' : 0,
    duration: 0.5,
    ease: "power2.out",
  })
  gsap.to(".data-list-wrap",{
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    y: isOpen ? -20 : 0,
    duration: 0.5,
    ease: "power2.out"
  })
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
const handleKeyDown = (e: KeyboardEvent) => {
  if (suggestListRef.value) {
    suggestListRef.value.handleKeyDownSelect(e)
  }
}
const handleInputFocus = () => {
  animateSearchBar(true)
}
useClickOutside(searchBarWrapRef, () => {
  animateSearchBar(false)
  isSearchOption.value = false
})
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
          @keydown="handleKeyDown"
          autocomplete="off"
          @focus="handleInputFocus"
      >
      <div id="search" @click="search">
        <img src="@/assets/svg/searchBar/arrow_right.svg" alt="">
      </div>
    </div>
    <search-suggestion-container
        ref="suggestListRef"
        v-model:search-val="searchVal"
        @search="search"
    />
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
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
</style>