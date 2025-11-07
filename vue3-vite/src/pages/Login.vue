<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { registerType, registerRulesType } from '../utils/types'; //導入 types.ts 設置
import type { FormInstance } from 'element-plus';  // element-plus
import { ElMessage } from 'element-plus';
import axios from "axios";
import { useRouter, RouterLink } from 'vue-router';



const router = useRouter();

// 獲取表單的DOM
const ruleFormRef = ref<FormInstance>();

// 登入資料(registerType 限定type)
const loginUser = ref<registerType>({
    email: "test@test.com",
    password: "test123",
});


// 校驗規則 (element 預設)：和表單內的 props 綁定
const rules = reactive<registerRulesType>({
    email: [
        { type: "email", required: true, message: "格式不正確", trigger: 'blur' }],
    password: [
        { required: true, message: "密碼不能為空", trigger: 'blur' },
        { min: 6, max: 30, message: "長度在6-30個字符之間", trigger: "blur" }],
})

// 登入 (element)
const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            // 依照strapi 要求，重新建構傳送資料
            const loginData = {
                identifier: loginUser.value.email,
                password: loginUser.value.password,
            };

            try {
                // POST api 請求
                const { data } = await axios.post(
                    "/api/auth/local",
                    loginData
                );

                console.log(data); //查看response資料

                const jwtToken = data?.jwt;
                const userInfo = data?.user;

                // 儲存 token & userInfo
                if (jwtToken && userInfo) {
                    localStorage.setItem('jwtToken', jwtToken);
                    localStorage.setItem('user', JSON.stringify(userInfo));
                    ElMessage({
                        message: '登入成功！',
                        type: 'success',
                    })
                    router.push('/');
                };

            } catch (error) {
                const errMsg = error.response?.data?.error?.message || '註冊失敗，請檢查網路或後端設定';
                console.error('登入失敗：', error);
                ElMessage.error(errMsg);
            }
        }
        else {
            ElMessage.warning('請檢查表單輸入是否正確');
        }
    });
};


</script>

<template>
    <div class="login">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">後臺管理系統</span>
                <!-- 表單 -->
                <el-form
                    ref="ruleFormRef"
                    :rules="rules"
                    :model="loginUser"
                    class="registerForm"
                    label-width="100px"
                >
                    <el-form-item
                        label="電子郵件"
                        prop="email"
                    >
                        <el-input
                            v-model="loginUser.email"
                            placeholder="請輸入郵件"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="密碼"
                        prop="password"
                    >
                        <el-input
                            v-model="loginUser.password"
                            placeholder="請輸入密碼"
                        ></el-input>
                    </el-form-item>

                    <!-- 登入 -->
                    <el-form-item>
                        <el-button @click="handleSubmit(ruleFormRef)">登入</el-button>
                    </el-form-item>
                    <!-- 前往註冊 -->
                    <el-form-item>
                        <p>還沒有帳號？現在就 <router-link to="/register">註冊</router-link></p>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>
