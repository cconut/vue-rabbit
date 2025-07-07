import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout/index.vue"
import Login from "@/views/Login/index.vue"
//createWebHistory 创建history模式的路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 输出当前基础路径
  routes: [
    {
      path: '/',
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: '',
          component: () => import("@/views/Home/index.vue")
        },
        {
          path: 'category/:id',
          component: () => import("@/views/Category/index.vue")
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
})

export default router
