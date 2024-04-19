/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-13 17:43:17
 * @LastEditTime: 2024-04-19 15:11:01
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\my-vue\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': '/src',
    },
  },
})
