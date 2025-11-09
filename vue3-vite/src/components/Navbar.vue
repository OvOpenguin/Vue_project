<template>
    <nav class="nav">
        <!-- Element UI -24格布局 -->
        <el-row class="row">
            <el-col
                :span="12"
                class="logo-container"
            >
                <img
                    src="../assets/logo.png"
                    alt="logo"
                    class="logo"
                >
                <span class="title">後台管理系統</span>
            </el-col>
            <el-col
                :span="12"
                class="user"
            >
                <div class="userInfo">
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
                    <div class="welcome-content">
                        <p class="content welcome">歡迎</p>
                        <p class="content username">{{ store.user?.username }}</p>
                    </div>
                    <!-- 下拉選單 -->
                    <span class="dropdown">
                        <!-- trigger @command 使用 -->
                        <el-dropdown
                            trigger="click"
                            @command="handleDropdown"
                        >
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="info">個人資料</el-dropdown-item>
                                    <el-dropdown-item command="logout">登出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </span>

                </div>

            </el-col>
        </el-row>
    </nav>

</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import router from '../router';
import { useAuthStore } from '../store';


const store = useAuthStore()
const handleDropdown = (item: string) => {
    // console.log(item); //回傳選到選單的command值
    switch (item) {
        case "info":
            showUserInfo();
            break;
        case "logout":
            logout();
            break;
    }
};

const showUserInfo = () => {
    console.log('跳轉個人資料頁');
};

const logout = () => {
    // 登出需要刪除 localStorage的內容
    // 需要做全局狀態的更動
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("safeUserData");
    store.setAuth(false);
    store.setUser(null);
    router.push('/login');
};
</script>

<style scoped>
.nav {
    width: 100%;
    height: auto;
    background: #074c62;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
}

.logo-container {
    line-height: 60px;
    min-width: 300px;
}

.logo {
    height: 40px;
    width: 40px;
    margin: 0 10px;
    vertical-align: middle;
    display: inline-block;
}

.title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
}

.user {
    line-height: 60px;
    text-align: right;
    padding-right: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
    background: #ffffff;
}

.welcome-content {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
}

.content {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
}

.welcome {
    font-size: 12px;
}

.username {
    color: #409eff;
    font-weight: bolder;
}

.dropdown {
    cursor: pointer;
    margin-right: 5px;
}

.el-dropdown {
    color: #fff;
}

.dropdown i {
    margin-top: 25px;
}
</style>