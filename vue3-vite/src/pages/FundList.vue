<template>
    <div class="fillcontain">

        <div>
            <el-form :inline="true">
                <!-- 時間篩選 -->
                <el-form-item label="時間篩選">
                    <el-date-picker
                        v-model="startTime"
                        type="datetime"
                        placeholder="選擇開始時間"
                    ></el-date-picker>
                    --
                    <el-date-picker
                        v-model="endTime"
                        type="datetime"
                        placeholder="選擇結束時間"
                    ></el-date-picker>
                </el-form-item>
                <!-- 篩選按鈕 -->
                <el-form-item>
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleSort"
                    >篩選</el-button>
                </el-form-item>

                <!-- 添加項目 -->
                <el-form-item class="btn-right">
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
            style="width: 100%"
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
                        @click="handleDelete(scope.row)"
                    >刪除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分頁 -->
        <el-row>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                        v-if="total > 0"
                        v-model:current-page="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes="page_sizes"
                        :layout="layout"
                        :total="total"
                        size="small"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </el-col>
        </el-row>

        <!-- 彈窗 -->
        <DialogModal
            v-model:show="show"
            @submit-success="getProfiles"
            :editData="editData"
        />
    </div>

</template>

<script setup lang="ts">
import axios from '../utils/api';
import { ref, onMounted } from 'vue';
import { Timer } from "@element-plus/icons-vue";
import DialogModal from '../components/DialogModal.vue';
import type { fundDateType } from "../utils/types";
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../store';

const store = useAuthStore();
const identity = store.user?.identity;

const tableData = ref<fundDateType[]>([]);
const show = ref<boolean>(false);
const editData = ref<fundDateType>();

const allTableData = ref<fundDateType[]>([]);
const currentPage = ref(1); // 當前頁面
const pageSize = ref(5); // 一頁顯示多少條 
const total = ref(20); //總共多少條
const page_sizes = ref([5, 10, 15, 20]); // 每頁顯示?條
const layout = "total, sizes, prev, pager, next, jumper"; // 翻頁屬性

const startTime = ref<Date>();
const endTime = ref<Date>();
const filterTableData = ref<fundDateType[]>([]);

const getProfiles = async () => {
    const { data } = await axios("/api/profiles?populate=*"); //{data} 可解構出 response.data
    // console.log(data.data); // 直接取data陣列
    tableData.value = data.data; //渲染用

    allTableData.value = data.data; // 分頁用
    filterTableData.value = data.data; // 時間篩選用
    setPagination();
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
// 刪除項目至後端 (DELETE)
// row: fundDateType
const handleDelete = async (row: fundDateType) => {

    try {
        await axios.delete(`/api/profiles/${row.documentId}`);
        ElMessage.success("刪除成功");
        getProfiles();
    } catch (err) {
        console.error("刪除失敗", err);
    }
};

// 添加：顯示彈窗
const handleAdd = () => {
    show.value = true;
    editData.value = undefined; //清空內容
};

// 預設：第 1 頁顯示 5 條項目
const setPagination = () => {
    total.value = allTableData.value.length; // 需要先取得遠端資料的總項目數量 (共 n 條)
    currentPage.value = 1; // 目前第 1 頁
    pageSize.value = 5; // 預設展示 5 條

    // 分頁：使用 filter 回傳幾條
    tableData.value = allTableData.value.filter((item: any, index: number) => {
        return index < pageSize.value;
    });

}
// 切換每頁展示 n 條 
const handleSizeChange = (pages: number) => {
    // console.log(pages); // 回傳選定的顯示條數 ex. [5條/頁] => 5
    currentPage.value = 1; // 第 1 頁
    pageSize.value = pages; // 展示 ? 條：賦予回傳選定的顯示條數

    tableData.value = allTableData.value.filter((item: any, index: number) => {
        return index < pageSize.value;
    });
};

// 切換第 n 頁 (重點!!)
const handleCurrentChange = (pages: number) => {
    // console.log(pages); // 點擊某個頁數，回傳第 n 頁
    // 假設第 2 頁 => currenPage = 5
    let currentPage = pageSize.value * (pages - 1);
    // 回傳所有大於 5 的項目資料
    let pageData = allTableData.value.filter((item: any, index: number) => {
        return index >= currentPage;
    });
    // 因為表單綁定的為 tableData，須重構顯示的項目資料
    // 又每頁僅展示 5 條
    // 只要少於 5 條就會展示，剩餘往第 3 頁展示。
    tableData.value = pageData.filter((item: any, index: number) => {
        return index < pageSize.value;
    });
};

const handleSort = () => {
    if (!startTime.value || !endTime.value) {
        ElMessage({
            type: "warning",
            message: "請選擇時間區間"
        });
        getProfiles();
        return;
    }

    const stime = startTime.value.getTime();
    const etime = endTime.value.getTime();
    // console.log(stime, etime);

    // 篩選過濾時間
    allTableData.value = filterTableData.value.filter((item: any) => {
        console.log(item); // 顯示所有項目的 Proxy
        // console.log(item.updatedAt); // 更新時間
        let date = new Date(item.updatedAt);
        let time = date.getTime();
        return time >= stime && time <= etime;
    });

    // 調用分頁功能
    setPagination();
};



</script>

<style scoped>
.fillcontain {
    width: 85%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
}


.btn-right {
    float: right;
    margin-top: 10px;
}

.pagination {
    /* width: 85%; */
    float: right;
    margin-top: 10px;
}
</style>
