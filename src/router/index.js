import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/diet/plans'
  },
  {
    path: '/diet',
    component: Layout,
    meta: {
      title: '健康饮食',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'plans',
        component: () => import('@/views/diet/plans/index'),
        name: 'diet-plans',
        meta: { title: '饮食计划列表' }
      },
      {
        path: 'records',
        component: () => import('@/views/diet/records/index'),
        name: 'diet-records',
        meta: { title: '饮食打卡' }
      },
      {
        path: 'foods',
        component: () => import('@/views/diet/foods/index'),
        name: 'diet-foods',
        meta: { title: '食物库' }
      }
    ]
  },

  {
    path: '/sport',
    component: Layout,
    meta: {
      title: '健身运动',
      icon: 'email'
    },
    children: [
      {
        path: 'plans',
        component: () => import('@/views/sports/plans/index'),
        name: 'sport-plans',
        meta: { title: '运动计划列表' }
      },
      {
        path: 'records',
        component: () => import('@/views/sports/records/index'),
        name: 'sport-records',
        meta: { title: '运动打卡' }
      }
    ]
  },
  {
    path: '/sleep',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '睡眠管理',
      icon: 'email'
    },
    children: [
      {
        path: 'records',
        component: () => import('@/views/sleep/records/index'),
        name: 'sleep-records',
        meta: { title: '睡眠打卡', affix: true }
      }
    ]
  },
  {
    path: '/sports-plan',
    meta: {
      title: '运动计划',
      icon: 'email'
    },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/sports-plans/index'),
        name: 'sport-course',
        meta: { title: '运动计划', icon: 'email' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: false, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '账号权限',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/index'),
        name: 'RolePermission',
        meta: {
          title: '账号权限',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

export const asyncRoutes = [

]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
