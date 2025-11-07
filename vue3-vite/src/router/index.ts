import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Error404 from "../pages/Error404.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";



const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
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

export default router;