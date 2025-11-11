<template>
    <div class="not-found">

        <p>404 Not Found</p>
        <button @click="$router.push('/')">返回首頁</button>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #074c62 0%, rgba(87, 199, 133, 1) 50%, #edbc53 100%);
}

p {
    color: #fff;
    text-shadow: 5px 5px 2px #616161;
    font: 6em sans-serif;
}

button {
    background: transparent;
    margin-top: 20px;
    border: 1px solid #074c62;
    color: #074c62;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

button:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    color: #fff;
    background: #074c62;
}
</style>
