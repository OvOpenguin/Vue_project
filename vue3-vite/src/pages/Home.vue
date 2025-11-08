<template>
  <div class="index">
    <Navbar/>
  </div>
</template>

<script setup lang="ts">

import axios from '../utils/api';
import { onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';



// 取得user資料
onMounted(async () => {
  try {
    await axios.get("/api/users/me?populate=*");
  } catch (error) {
    console.log(error);
  }
})
</script>

<style>

</style>