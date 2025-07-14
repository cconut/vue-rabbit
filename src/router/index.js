import { createRouter, createWebHistory } from 'vue-router'

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
        {
          path: 'category/sub/:id',
          component: () => import("@/views/SubCategory/index.vue")
        },
        {
          path: 'detail/:id',
          component: () => import("@/views/Detail/index.vue")
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
  //路由滚动行为定制
  //每次切换路由，都从顶部开始显示
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
