import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Error404 from "../pages/Error404.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Index from "../pages/index.vue";
import UserInfo from "../pages/UserInfo.vue";
import FundList from "../pages/FundList.vue";



const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // 子路由
        children: [
            { path: "", name: "Index", component: Index },
            { path: "/userInfo", name: "userInfo", component: UserInfo },
            { path: "/fundList", name: "fundList", component: FundList },
        ]
    },
    {
        path: "/:catchAll(.*)",
        name: "Error",
        component: Error404,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

// 路由守衛
router.beforeEach((to) => {
    // 如果有token才能前往首頁，否則只能前往 登入/註冊 頁面
    // const isLogin: boolean = localStorage.jwtToken ? true : false;
    const isLogin: boolean = !!localStorage.jwtToken;

    if (to.path === '/login' || to.path === '/register') {
        return true;
    }
    if (isLogin) {
        return true;
    }
    return '/login';
})

export default router;