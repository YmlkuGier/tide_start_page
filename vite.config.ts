import { defineConfig } from 'vite'

// element-plus插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import * as path from "node:path";

export default defineConfig({

  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
      }
    }
  }

})
