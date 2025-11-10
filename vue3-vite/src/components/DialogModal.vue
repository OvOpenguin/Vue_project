<template>
    <el-dialog
        :model-value="show"
        title="添加收支項目"
        @update:model-value="$emit('update:show', $event)"
    >
        <el-form
            :model="fundData"
            ref="form"
            :rules="formRules"
            label-width="120px"
            style="margin: 10px; width: auto;"
        >

            <el-form-item label="收支類型">
                <el-select
                    v-model="fundData.type"
                    placeholder="收支類型"
                >
                    <el-option
                        v-for="(formType, index) in typeList"
                        :key="index"
                        :label="formType"
                        :value="formType"
                    >{{ formType }}</el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                prop="describe"
                label="收支描述"
            >
                <el-input
                    v-model="fundData.describe"
                    type="describe"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="income"
                label="收入"
            >
                <el-input
                    v-model="fundData.income"
                    type="income"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="expend"
                label="支出"
            >
                <el-input
                    v-model="fundData.expend"
                    type="expend"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="cash"
                label="帳戶現金"
            >
                <el-input
                    v-model="fundData.cash"
                    type="cash"
                ></el-input>
            </el-form-item>

            <el-form-item label="備註">
                <el-input
                    v-model="fundData.remark"
                    type="textarea"
                ></el-input>
            </el-form-item>

            <el-form-item class="text-right">
                <el-button @click="handleClose">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleSubmit(form)"
                >提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { ElMessage, type FormInstance } from 'element-plus';  // element-plus
import type { formRulesType, fundDateType } from "../utils/types"
import axios from "axios";



const typeList = ref(["現金", "信用卡", "LinePay", "悠遊付"]);

const fundData = ref<fundDateType>({
    type: "現金",
    describe: "購買課程",
    income: "1500",
    expend: "500",
    cash: "2000",
    remark: "提升技能"
});

// 校驗規則 (element 預設)：和表單內的 props 綁定
const formRules: formRulesType = {
    describe: [{ required: true, message: "收支描述不能為空", trigger: "blur" }],
    income: [{ required: true, message: "收入不能為空", trigger: "blur" }],
    expend: [{ required: true, message: "支出不能為空", trigger: "blur" }],
    cash: [{ required: true, message: "現今不能為空", trigger: "blur" }],
};

const form = ref<FormInstance>();

// const handleSubmit = () => {
//     //@ts-ignore
//     form.value.validate((valid) => {
//         console.log(fundData.value);
//     })
// };

const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            // strapi 需回傳 data:{} 開頭的物件資料中
            const payload = {
                data: fundData.value
            };
            try {
                await axios.post('/api/profiles', payload);
                ElMessage.success('添加成功');

                // 子組件告至父組件，關閉彈窗。
                emit('update:show', false);
                emit('submitSuccess');

            } catch (error) {
                console.error('Post 失敗', error);
                ElMessage.error('添加失敗，請檢查後台或連線');
            }
        }
        else {
            console.log('表單驗證失敗')
        }
    });
};


// 處理表單的開關
// 1. 聲明 prop
const props = defineProps({
    show: {
        type: Boolean,
    },
});

// 2. 聲明 emits，發出 update:show 事件
const emit = defineEmits<{
    (event: 'update:show', value: boolean): void,
    (event: 'submitSuccess'): void;
}>()


const handleClose = () => {
    // console.log("取消");
    emit('update:show', false);
};

</script>