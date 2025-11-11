<template>
    <el-row class="menu-container">
        <el-col :sapn="12">
            <el-menu
                active-text-color="#edbc53"
                background-color="#074c62"
                class="el-menu-vertical-demo"
                default-active="1"
                text-color="#fff"
            >
                <!-- 首頁 -->
                <router-link to="/">
                    <el-menu-item index="1">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首頁</span>
                    </el-menu-item>
                </router-link>

                <template
                    v-for="menu in menus"
                    :key="menu.path"
                >
                    <el-sub-menu
                        v-if="menu.children"
                        :index="menu.path"
                    >

                        <template #title>
                            <el-icon>
                                <component :is="menu.icon"></component>
                            </el-icon>
                            <span>{{ menu.name }}</span>
                        </template>

                        <el-menu-item-group>

                            <router-link
                                v-for="(item, index) in menu.children"
                                :key="index"
                                :to="item.path"
                            >
                                <el-menu-item :index="item.path">
                                    {{ item.name }}
                                </el-menu-item>

                            </router-link>

                        </el-menu-item-group>

                    </el-sub-menu>



                </template>

                <!-- 資金管理 submenu-->
                <!-- <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Money />
                        </el-icon>
                        <span>資金管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">資金流向</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu> -->
                <!-- 基礎設定 -->
                <!-- <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>基礎設定</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">個人資料</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu> -->

            </el-menu>
        </el-col>
    </el-row>




</template>

<script setup lang="ts">
import { Money, House, Setting } from "@element-plus/icons-vue";
import { ref, markRaw } from "vue";

// 讓 sidebar 動態顯示 (使用 v-for 抓取對應資料)
const menus = ref([
    {
        icon: markRaw(Money),
        name: "資金管理",
        path: "fund",
        children: [
            { path: '/fundList', name: "資金流向" },
        ]
    },
    {
        icon:  markRaw(Setting),
        name: "基礎設定",
        path: "info",
        children: [{ path: '/userInfo', name: "個人資料" }]
    },
]);

</script>


<style scoped>
.menu-container {
    position: fixed;
    left: 0;
    min-height: 100%;
    background-color: #074c62;
    z-index: 99;
}

.el-menu {
    border: none;
}

.fa-margin {
    margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 100vh;
}

.el-menu-vertical-demo {
    width: 35px;
}

.el-sub-menu .el-menu-item {
    min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
    display: none;
}

a {
    text-decoration: none;
}
</style>