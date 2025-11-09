<template>
  <div class="index">
    <Navbar />
  </div>
</template>

<script setup lang="ts">

import axios from '../utils/api';
import { onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useAuthStore } from '../store';
import type { userType } from '../utils/types';


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
    };
    localStorage.setItem('safeUserData', JSON.stringify(safeUserData));

    // 存放 store 狀態
    store.setUser(safeUserData);


  } catch (error) {
    console.log('取得使用者資料失敗', error);
  }
})
</script>

<style></style>