import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 解决扩展空白/路径错误
  base: './',
  build: {
    outDir: 'dist',
    cssMinify: 'esbuild'
  }
})
