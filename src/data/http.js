import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

//响应时间
axios.defaults.timeout = 5000
//配置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// let baseUrl="http://localhost:8081/api";
let baseUrl = 'http://localhost:8090'

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Toast('错误的传参')
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (!res.data.success) {
      return Promise.resolve(res)
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

//返回一个Promise(发送get请求)
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

export function fetchPut(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(baseUrl + url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
export function fetchDelete(url) {
  return new Promise((resolve, reject) => {
    axios
      .delete(baseUrl + url)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  fetchPost,
  fetchGet,
  fetchPut,
  fetchDelete
}
