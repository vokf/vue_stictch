import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'

import('./assets/scss/style.scss')

import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'

Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce) // 安装vue的tinymce组件
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8090'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
