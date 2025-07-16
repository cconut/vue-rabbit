import { createRouter, createWebHistory } from 'vue-router'

//createWebHistory 创建history模式的路由
const router = createRouter({

  //一般顶级路由才会加 / ，像里面的二级路由三级路由是不需要加的，默认会拼接上去
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
        },
        {
          path: 'cartlist',
          component: () => import("@/views/CartList/index.vue")
        },
        {
          path: 'checkout',
          component: () => import("@/views/Checkout/index.vue")
        },
        {
          path: 'pay',
          component: () => import("@/views/Pay/index.vue")
        },
        {
          path: 'paycallback',
          component: () => import("@/views/Pay/PayBack.vue")
        },
        {
          path: 'member',
          component: () => import("@/views/Member/index.vue"),
          children: [
            {
              path: '',
              component: () => import("@/views/Member/components/UserInfo.vue"),
            },
            {
              path: 'order',
              component: () => import("@/views/Member/components/UserOrder.vue"),
            },
          ]
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
