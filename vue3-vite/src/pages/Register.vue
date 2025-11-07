<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { registerType, registerRulesType } from '../utils/types'; //導入 types.ts 設置
import type { FormInstance } from 'element-plus'; // element-plus
import axios from "axios";

// 獲取表單的DOM
const ruleFormRef = ref<FormInstance>();

// 註冊資料(registerType 限定type)
const registerUser = ref<registerType>({
    name: "test",
    email: "test@test.com",
    password: "test",
    password2: "test",
    identity: "manager",
});

// 密碼驗證
const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請重新輸入密碼'))
    } else if (value !== registerUser.value.password) {
        callback(new Error("兩次密碼不一致"))
    } else {
        callback()
    }
}

// 校驗規則 (element 預設)：和表單內的 props 綁定
const rules = reactive<registerRulesType>({
    name: [
        { required: true, message: "使用者名稱不能為空", trigger: 'change' },
        { min: 2, max: 30, message: "長度在2-30個字符之間", trigger: "blur" }
    ],
    email: [
        { type: "email", required: true, message: "格式不正確", trigger: 'blur' }],
    password: [
        { required: true, message: "密碼不能為空", trigger: 'blur' },
        { min: 6, max: 30, message: "長度在6-30個字符之間", trigger: "blur" }],
    password2: [
        { min: 6, max: 30, message: "長度在6-30個字符之間", trigger: "blur" },
        { validator: validatePass2, trigger: 'blur' }
    ],
})

// 註冊 (element)
const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            // 依照strapi 要求，重新建構傳送資料
            const registerData = {
                username: registerUser.value.name,
                email: registerUser.value.email,
                password: registerUser.value.password,
            };
            // POST api 請求
            const { data } = await axios.post(
                "/api/auth/local/register",
                registerData
            );

            console.log(data);
        } else {
            console.log('error submit!')
        }
    });
};


</script>

<template>
    <div class="register">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">後臺管理系統</span>
                <!-- 表單 -->
                <el-form
                    ref="ruleFormRef"
                    :rules="rules"
                    :model="registerUser"
                    class="registerForm"
                    label-width="100px"
                >
                    <el-form-item
                        label="使用者名稱"
                        prop="name"
                    >
                        <el-input
                            v-model="registerUser.name"
                            placeholder="請輸入使用者名稱"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="電子郵件"
                        prop="email"
                    >
                        <el-input
                            v-model="registerUser.email"
                            placeholder="請輸入郵件"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="密碼"
                        prop="password"
                    >
                        <el-input
                            v-model="registerUser.password"
                            placeholder="請輸入密碼"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="確認密碼"
                        prop="password2"
                    >
                        <el-input
                            v-model="registerUser.password2"
                            placeholder="再次確認密碼"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="選擇身分">
                        <el-select
                            v-model="registerUser.identity"
                            placeholder="選擇身分"
                        >
                            <el-option
                                label="管理員"
                                value="manager"
                            ></el-option>
                            <el-option
                                label="一般員工"
                                value="employee"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 註冊 -->
                    <el-form-item>
                        <el-button @click="handleSubmit(ruleFormRef)">註冊</el-button>
                    </el-form-item>


                </el-form>

            </div>
        </section>
    </div>
</template>

<style scoped>
.register {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
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