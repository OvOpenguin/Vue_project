import axios from "axios";
import router from "../router";


// 請求攔截
axios.interceptors.request.use((config) => {
    // 取得 jwtToken
    const jwtToken = localStorage.getItem('jwtToken');
    if (!!jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 響應攔截(Response)
axios.interceptors.response.use((response) => {
    // console.log(response.data);
    // localStorage.setItem('userData', JSON.stringify(response.data));  //暫時看回傳結構(之後刪除)
    return response;
}, (error) => {
    const { status } = error.response;
    if (status === 401) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("safeUserData");
        router.push("/login");
    };
    return Promise.reject(error);
})


export default axios;