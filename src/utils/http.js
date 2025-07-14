import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/User";
import router from "@/router";
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => {
    return Promise.reject(e)
})

//axios响应拦截器
httpInstance.interceptors.response.use((res) => {
    return res.data
}, (e) => {
    ElMessage.warning(e.response.data.msg)
    //401token失效处理
    if (e.response.status === 401) {
        const userStore = useUserStore()
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})
export default httpInstance