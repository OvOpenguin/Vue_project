import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      // 伺服器代理
      // 前端：http://localhost:5173
      // 後端：http://localhost:1337
      "/api":"http://localhost:1337"
    }
  }
})

