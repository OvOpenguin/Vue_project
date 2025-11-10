<template>
    <div class="fillcontain">

        <div class="btn-right">
            <el-form :inline="true">
                <el-form-item>
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleAdd"
                    >添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- table 綁定 tableData -->
        <el-table
            :data="tableData"
            style="width: 85%"
            max-height="450"
            table-layout="auto"
            show-overflow-tooltip
            border
            v-if="tableData.length > 0"
        >
            <el-table-column
                type="index"
                label="序號"
                width="70"
            />
            <el-table-column
                prop="createdAt"
                label="時間"
            >
                <template #default="scope">
                    <el-icon>
                        <Timer />
                    </el-icon>
                    <span>{{ scope.row.createdAt.slice(0, 10) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="收支類型"
            />
            <el-table-column
                prop="describe"
                label="收支描述"
            />
            <el-table-column
                prop="income"
                label="收入"
            >
                <template #default="scope">
                    <span style="color: #00d053;">+{{ scope.row.income }}</span>
                </template>

            </el-table-column>
            <el-table-column
                prop="expend"
                label="支出"
            >
                <template #default="scope">
                    <span style="color: #f56767;">-{{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="expend"
                label="現金"
            >
                <template #default="scope">
                    <span style="color: #4db3ff;">{{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="備註"
            >
                <template #default="scope">
                    <span style="color: #f56767;">{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                min-width="100"
            >
                <template #default="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEdit(scope.row)"
                    >編輯</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >刪除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <DialogModal
            v-model:show="show"
            @submit-success="getProfiles"
            :editData="editData"
        />
    </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Timer } from "@element-plus/icons-vue";
import DialogModal from '../components/DialogModal.vue';
import type { fundDateType } from "../utils/types";

const tableData = ref<never[]>([]);
const show = ref<boolean>(false);
const editData = ref<fundDateType>();

const getProfiles = async () => {
    const { data } = await axios("/api/profiles?populate=*"); //{data} 可解構出 response.data
    // console.log(data.data); // 直接取data陣列
    tableData.value = data.data;
};

// watchEffect(() => getProfiles());

onMounted(() => {
    getProfiles();
});

// 編輯 (抓取表單內的值，並賦值給 editData )
const handleEdit = (row: fundDateType) => {
    editData.value = row;  
    show.value = true;
    // console.log(row);
};
// 刪除
const handleDelete = (row: fundDateType, index: number) => {
    console.log('刪除');
};

// 添加：顯示彈窗
const handleAdd = () => {
    show.value = true;
    editData.value = undefined; //清空內容
};

</script>

<style scoped>
.fillcontain {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
}

.btn-right {
    width: 85%;
    display: flex;
    justify-content: end;
}
</style>
