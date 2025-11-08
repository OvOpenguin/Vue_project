import { defineStore } from 'pinia'
import type { userType } from '../utils/types';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isAuthenticated: false,
            user: {}
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
        // 這邊還需要改動 user 的 TS 類型(暫時放any)
        setUser(user: userType | null) {
            this.user = user || {};
        },
        // 存放state
        initFromLocalStorage() {
            const token = localStorage.getItem('jwtToken');
            const userData = localStorage.getItem('userData');
            this.setAuth(!!token);
            this.setUser(userData ? JSON.parse(userData) : {});
        }
    },
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    },
});

