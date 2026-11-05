<script setup lang="ts">
import {version} from '@/../package.json';
</script>

<template>
  <section class="about-hero" aria-label="Tide 版本信息">
    <div class="hero-mark">Tide<span>汐式起始页</span></div>
    <div class="hero-footer"><span>每一次开始，都随心而行</span><span class="version">v{{ version }}</span></div>
  </section>
</template>

<style scoped>
.hero-mark > span {
  display: block;
  margin-top: 8px;
  font: 12px "Microsoft YaHei", sans-serif;
  color: #a3bdb5;
  letter-spacing: 4px;
}

.about-hero {
  padding: 40px 32px 24px;
  border: 1px solid #b9e8dd26;
  border-radius: 18px;
  background: radial-gradient(ellipse at 90% 0%, #8ecaba20, transparent 65%), linear-gradient(120deg, #263b36, #202b2a);
}

.hero-mark {
  font-family: JP_JaoKeShu, Georgia, serif;
  font-size: 56px;
  color: #d5f2e9;
}

.hero-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  color: #a3bdb5;
  font-size: 12px;
}

.version {
  padding: 5px 10px;
  border: 1px solid #b9e8dd26;
  border-radius: 6px;
  font-size: 11px;
}

@media (max-width: 440px) {
  .about-hero {
    padding: 28px 22px 22px;
  }
}
</style>