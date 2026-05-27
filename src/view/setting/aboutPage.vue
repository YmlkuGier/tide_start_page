<script setup lang="ts">
import TextForm from "@/components/settingPage/form/textForm.vue";

let content = '汐式起始页(潮汐起始页)是支持高度自定义的浏览器起始页扩展插件, 可简洁, 可复杂. 后续功能正持续制作中, 敬请期待'
</script>

<template>
  <div class="setting-content-wrap">
    <text-form title="关于此软件" :content="content" />
  </div>
</template>

<style scoped>

</style>