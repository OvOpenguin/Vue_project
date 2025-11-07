import axios from "axios";
import router from "../router";


// 請求攔截
axios.interceptors.request.use((config) => {
    // 取得 jwtToken
    const jwtToken = localStorage.getItem('jwtToken');
    if (localStorage.jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 響應攔截(Response)
axios.interceptors.response.use(res => {
    console.log(res.data);
    return res;
}, (error) => {
    const { status } = error.response;
    if (status === 401) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        router.push("/login");
    };
    return Promise.reject(error);
})


export default axios;