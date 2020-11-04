import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

import UserLogin from '@/views/login/UserLogin'
import UserRegister from '@/views/register/UserRegister'
import User from '@/components/user/User'

import About from '@/views/About.vue'
import updateUser from '@/components/user/updateUser'
import PublishJob from '@/views/job/PublishJob'
import identification from '@/views/user/identification'
import publishArticle from '@/views/article/publishArticle'
import allPublishJob from '@/views/job/allPublishJob'
import Test from '@/views/Test'
import addArticle from '@/components/article/addArticle'
import Info from '@/components/user/Info'
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
    component: Info,
    meta: {
      title: '用户'
    },
    children: [
      {
        path: 'update',
        component: updateUser,
        meta: {
          title: '修改'
        }
      },
      {
        path: 'info',
        component: User,
        meta: {
          title: '用户信息'
        }
      }
    ]
  },

  {
    path: '/update',
    name: 'updateUser',
    component: updateUser,
    meta: {
      title: '修改'
    }
  },

  {
    path: '/test', //测试
    component: About
  },
  {
    path: '/publishJob',
    component: PublishJob,
    meta: {
      title: '发布求职'
    }
  },
  {
    path: '/identify',
    component: identification,
    meta: {
      title: '企业用户认证'
    }
  },
  {
    path: '/publishArticle',
    component: publishArticle,
    meta: {
      title: '发布文章'
    }
  },
  {
    path: '/allPublishJob',
    component: allPublishJob,
    meta: {
      title: '发布的求职通知'
    }
  },
  {
    path: '/tt', //测试
    component: Test,
    meta: { title: '测试' }
  },
  {
    path: '/addArticle',
    component: addArticle,
    meta: {
      title: '添加文章'
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
