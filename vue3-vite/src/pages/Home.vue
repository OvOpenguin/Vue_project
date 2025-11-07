<template>
  <div class="index">初始化頁面</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

// 取得 jwtToken
const jwtToken = localStorage.getItem('jwtToken');

// 取得user資料
onMounted(async () => {
  try {
    const userData = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }
    });
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
})
</script>

<style></style>