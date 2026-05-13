<script setup lang="ts">
import {ref} from "vue";

const isSearchOption = ref(false)
const item = ref([
  {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    icon: 'https://www.baidu.com/favicon.ico'
  },
  {
    id: 'bing',
    name: '必应',
    url: 'https://www.bing.com/search?q=',
    icon: 'https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-28.ico'
  },
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: 'https://www.google.com/favicon.ico'
  }
])

const openSearchOptions = () => {
  isSearchOption.value = !isSearchOption.value
}
const search = () => {

}

</script>

<template>
  <div class="searchBar_wrap">
    <div class="searchBar">
      <div class="icon_wrap" @click="openSearchOptions">
        <img src="../assets/search.svg" alt="">
      </div>
      <input id="input">
      <div id="search" @click="search">
        <img src="../assets/arrow_right.svg" alt="">
      </div>
    </div>
    <div class="option_wrap" v-show="isSearchOption">
      <div class="opt" v-for="item in item" :key="item.id">
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
  background-color: var(--color-search-bar);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 24px;
    margin-left: 10px;
    margin-right: 5px;
  }
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
  padding: 0;
  font-size: 16px;
  font-weight: normal;
  -webkit-text-stroke: 0.5px transparent;
  border: none;
  outline: none;
  box-shadow: none;
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
  background-color: var(--color-search-option);
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
    flex-shrink: 0;
  }
  span {
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