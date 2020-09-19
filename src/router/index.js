import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import App from '@/App'
import UserLogin from '@/views/UserLogin'
import UserRegister from '@/views/UserRegister'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    meta: { title: '首页' }
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '' }
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
