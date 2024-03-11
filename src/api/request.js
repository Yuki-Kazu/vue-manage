import axios from "axios";
// import { ElMessage } from "element-plus";

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: "https://e3256f43-56cf-452c-a339-733182c9254c.mock.pstmn.io", //测试用
    baseURL: "http://6a2bc4b7.r3.cpolar.cn",
    timeout: 5000,
});

//请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.token = localStorage.getItem('token')
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

// service.interceptors.response.use(
//     (response) => {
//         const { data, meta } = response.data
//         if (meta.status === 200 || meta.status === 201) {
//             return data
//         } else {
//             ElMessage.error(meta.msg)
//             return Promise.reject(new Error(meta.msg))
//         }
//     },
//     (error) => {
//         console.log(error.response)
//         error.response && ElMessage.error(error.response.data)
//         return Promise.reject(new Error(error.response.data))
//     }
// )

export default service;
