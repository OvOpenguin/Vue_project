<template>
  <div class="home">
    <Navbar />
    <Sidebar />
    <div class="container-right"><router-view></router-view></div>
  </div>
</template>

<script setup lang="ts">

import axios from '../utils/api';
import { onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useAuthStore } from '../store';
import type { userType } from '../utils/types';
import { RouterView } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';


const store = useAuthStore();
const API_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"; //後端回傳的 avatar url 需在前面加上來源網址

// 取得user資料
onMounted(async () => {
  try {
    const res = await axios.get("/api/users/me?populate=*");
    // console.log(res.data);
    const user = res.data;

    // 取用 user 存放的資料
    const safeUserData: userType = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: `${API_URL}${user.avatar.url}`, // avatar 前方加上後端來源網址
      identity: user.identity,
    };
    localStorage.setItem('safeUserData', JSON.stringify(safeUserData));

    // 存放 store 狀態
    store.setUser(safeUserData);


  } catch (error) {
    console.log('取得使用者資料失敗', error);
  }
})
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container-right {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100%-180px);
  height: 100%;
  overflow: auto;
}
</style>