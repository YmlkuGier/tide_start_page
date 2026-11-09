import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import * as path from "node:path";

export default defineConfig({

  plugins: [
    vue(),
  ],

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
  },

  server: {
    proxy: {
      '/baidu': {
        target: 'https://suggestion.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baidu/, ''),
      },
      '/ico': {
        target: 'https://ico.kucat.cn',
        changeOrigin: true, // 关键：修改请求头中的 Origin，伪装请求来源
        rewrite: (path) => path.replace(/^\/ico/, '') // 路径重写，移除 /api 前缀
      }
    }
  }

})
