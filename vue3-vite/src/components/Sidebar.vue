<template>
    <el-row class="menu-container">
        <el-col :sapn="12">
            <el-menu
                active-text-color="#32eee1"
                background-color="#074c62"
                class="el-menu-vertical-demo"
                default-active="1"
                text-color="#fff"
            >
                <!-- 首頁 -->
                <el-menu-item index="1">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首頁</span>
                </el-menu-item>

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
                            <el-menu-item
                                v-for="(item, index) in menu.children"
                                :key="index"
                                :index="item.path"
                            >{{ item.name }}</el-menu-item>
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
import { ref } from "vue";

// 讓 sidebar 動態顯示
const menus = ref([
    {
        icon: Money,
        name: "資金管理",
        path: "fund",
        children: [
            { path: '/fundList1', name: "資金流向1" },
            { path: '/fundList2', name: "資金流向2" },
        ]
    },
    {
        icon: Setting,
        name: "基礎設定",
        path: "info",
        children: [{ path: '/infoshow', name: "個人資料" }]
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