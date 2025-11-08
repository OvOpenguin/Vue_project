import { defineStore } from 'pinia'

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
        setUser(user: any) {
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

