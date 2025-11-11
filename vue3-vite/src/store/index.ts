import { defineStore } from 'pinia'
import type { userType } from '../utils/types';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isAuthenticated: false,
            user: null as userType | null,
        }
    },
    actions: {
        setAuth(isAuth: boolean) {
            if (isAuth) {
                this.isAuthenticated = isAuth;
            } else {
                this.isAuthenticated = false;
            }
        },
        setUser(user: userType | null) {
            this.user = user;
        },
        // 初始化localStorage 存放state
        initFromLocalStorage() {
            const token = localStorage.getItem('jwtToken');
            const userSafeData = localStorage.getItem('userSafeData');
            this.setAuth(!!token);
            this.setUser(userSafeData ? JSON.parse(userSafeData) : {});
        }
    },
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    },
});

