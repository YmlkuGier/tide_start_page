<script setup lang="ts">
import SearchBar from "../components/searchBar.vue";

</script>

<template>
  <div class="main-wrap">
    <search-bar />
  </div>
</template>

<style scoped>
.main-wrap {
  width: 100%;
  height: 100vh;
  background-color: var(--color-bg);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>