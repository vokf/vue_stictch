import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

import UserLogin from '@/views/login/UserLogin'
import UserRegister from '@/views/register/UserRegister'
import User from '@/views/user/User'

import About from '@/views/About.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/index',
    component: Home,
    meta: {
      title: '首页'
    }
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '',
      login_require: true
    }
  },
  {
    path: '/login',
    component: UserLogin,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: UserRegister,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '用户'
    }
  },
  {
    path: '/test',
    component: About
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  if (
    to.matched.some(item => {
      return item.meta.login_require
    })
  ) {
    next('/login')
  } else {
    next()
  }
})
export default router
