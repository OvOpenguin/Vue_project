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
                        v-if="previewImage || store.user?.avatar"
                        :src="previewImage || store.user?.avatar"
                        alt="avatar"
                        class="avatar"
                    >
                    <img
                        v-else
                        :src="avatarDefault"
                        alt="avatar"
                        class="avatar"
                    >
                    <el-button @click="triggerFileInput">選擇頭貼</el-button>
                    <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        style="display:none"
                        @change="handleFileChange"
                    />
                    <!-- 確認上傳按鈕 -->
                    <el-button
                        type="primary"
                        :disabled="!selectedFile"
                        @click="confirmUpload"
                    >確定上傳</el-button>

                </div>

            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">使用者：<span>{{ store.user?.username }}</span></div>
                    <div class="user-item">信箱：<span>{{ store.user?.email }}</span></div>
                    <div class="user-item">權限：<span>{{ identityLabel }}</span></div>
                </div>

            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '../store';
import avatarDefault from '../assets/avatarDefault.png?url';
import axios from "../utils/api";


const store = useAuthStore();
const identityLabel = computed(() => {
    switch (store.user?.identity) {
        case 'employee':
            return '一般職員'
        case 'manager':
            return '管理員'
        default:
            return '未知'
    }
})

// 選擇檔案後的預覽
const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

// 觸發inputfile
const fileInput = ref<HTMLInputElement | null>(null); // 取得 input DOM
const triggerFileInput = () => {
    fileInput.value?.click();  // 點擊按鈕觸發 fileInput
};

// 選擇檔案後
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target.files?.length) return;

    const file = target.files[0];
    selectedFile.value = file;

    // if (!file.type.startsWith('image/')) return alert('只能上傳圖片');
    // if (file.size > 2 * 1024 * 1024) return alert('檔案過大，請小於 2MB');

    // 生成預覽
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
};



// 確認上傳
const confirmUpload = async () => {
    if (!selectedFile.value || !store.user?.id) return;

    const formData = new FormData();
    formData.append('files', selectedFile.value); // Strapi upload API 需要 key = files

    try {
        // 上傳圖片到 Strapi /api/upload
        const uploadRes = await axios.post('/api/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            }
        );
        // console.log(uploadRes);
        // console.log(uploadRes.data);
        console.log(uploadRes.data[0]);
        // console.log(uploadRes.data[0].id);

        // 上傳成功後取得檔案 ID
        const uploadedFile = uploadRes.data[0]; // Strapi 回傳陣列
        const fileId = uploadedFile.id;
        // const filedoId = uploadedFile.documentId;


        // PUT 更新使用者 avatar
        await axios.put(
            '/api/users/me',
            {
                data: {
                    avatar: fileId, // avatar 欄位是 Media
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            }
        );

        // 更新 store avatar，立即更新畫面
        store.user.avatar = uploadedFile.url;

        // 清空選檔和預覽
        selectedFile.value = null;
        previewImage.value = null;

        console.log('上傳成功！');
    } catch (error) {
        console.error('上傳失敗', error);
    }
};




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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;
    top: 30%;

}

.user img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
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