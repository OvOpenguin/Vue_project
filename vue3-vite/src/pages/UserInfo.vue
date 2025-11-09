<template>
    <div class="info-container">
        <el-row
            class="content"
            type="flex"
            justify="center"
        >
            <el-col :span="8">
                <div class="user">
                    <img
                        v-if="store.user?.avatar"
                        :src="String(store.user?.avatar)"
                        alt="avatar"
                        class="avatar"
                    >
                    <img
                        v-else
                        src="../assets/avatarDefault.png"
                        alt="avatar"
                        class="avatar"
                    >
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">使用者：<span>{{ store.user?.username }}</span></div>
                    <div class="user-item">信箱：<span>{{ store.user?.email }}</span></div>
                </div>

            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">
import { useAuthStore } from '../store';


const store = useAuthStore();


</script>

<style scoped>
.info-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* padding: 16px; */
}

.content {
    width: 100%;
    height: 100%;
}

.user {
    text-align: center;
    position: relative;
    top: 30%;
}

.user img {
    width: 150px;
    border-radius: 50%;
}

.user span {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
}

.userinfo {
    height: 100%;
    background-color: #eee;
}

.user-item {
    position: relative;
    top: 30%;
    padding: 1.5rem;
    font-size: 1.5rem;
    color: #333;
}
</style>