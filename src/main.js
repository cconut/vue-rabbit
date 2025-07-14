import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ElMessage } from "element-plus";
import "element-plus/dist/index.css"; // 必须引入样式文件

//引入初始化的样式文件

import "@/styles/common.scss"

import App from './App.vue'
import router from './router'

//引入懒加载指令插件并注册
import { lazyPlugin } from './directives'

import { componentPlugin } from "@/components/index"

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElMessage)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


