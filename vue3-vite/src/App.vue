<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store';
import { ElConfigProvider } from 'element-plus'; // 切換語言
import zhTw from 'element-plus/es/locale/lang/zh-tw' // 指定語言

const store = useAuthStore();

// 組件掛載時初始化
onMounted(() => {
    store.initFromLocalStorage();
});

// // 監聽 localStorage 變化（跨 tab 或同頁面）
// window.addEventListener('storage', (event) => {
//     if (event.key === 'jwtToken' || event.key === 'userData') {
//         store.initFromLocalStorage();
//     }
// });
</script>

<template>
    <el-config-provider :locale="zhTw">
        <router-view></router-view>
    </el-config-provider>
</template>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
}


.register,
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(./assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
}

.login a {
    text-decoration: none;
    color: #2b8dd2;
    font-weight: bold;
}

.form-container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
}

.form-container .manage-tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}

.registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 40px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}
</style>
