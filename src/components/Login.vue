<template>
  <div>
    <el-container>
      <el-header>header</el-header>
      <el-main
        style="background: #c0cee9;height: 300px;width: 300px;margin-left: auto;margin-right: auto"
      >
        <el-form>
          <el-form-item>
            <el-input
              placeholder="用户名"
              auto-complete="on"
              v-model="user.userName"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              auto-complete="on"
              type="password"
              show-password
              placeholder="密码"
              v-model="user.password"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="check">一周内自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="logining"
              @click="submit"
              :style="{ background: 'rgb(190, 200, 200)' }"
              style="margin-left: 20px"
              >提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import http from '@/data/http'

export default {
  name: 'Login',
  data() {
    return {
      logining: false,
      // form 表单的input 数据
      user: {
        userName: '',
        password: ''
      },
      check: false,
      rules: {}
    }
  },
  mounted() {
    const that = this
    that.account()
  },
  methods: {
    /**
     * 获取cookie
     */
    getCookie: () => {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'userName') {
            //  console.log(arr2[1])
            this.user.userName = arr2[1] //保存到保存数据的地方
          } else if (arr2[0] === 'password') {
            // console.log(arr2[1])
            this.user.password = arr2[1]
          }
        }
        this.check = true
      }
    },
    /**
     * 清除 cookie
     */
    clearCookie: () => {
      this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
    },

    /**
     * 设置cookie
     * @param c_name 账号
     * @param c_pwd 密码
     * @param c_day 更新时间
     */
    setCookie: (c_name, c_pwd, c_day) => {
      const exdate = new Date() //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * c_day) //保存的天数
      document.cookie =
        'userName=' + c_name + ';path=/;expires=' + exdate.toLocaleString()
      document.cookie =
        'password=' + c_pwd + ';path=/;expires=' + exdate.toLocaleString()
    },
    /**
     * 登录
     */
    submit: () => {
      const that = this
      that.$ref.user.validate(valid => {
        if (valid) {
          that.logining = true
          if (that.check === true) {
            that.setCookie(that.user.userName, that.user.password, 7)
          } else {
            that.clearCookie()
          }
          http
            .fetchGet('/user/', {
              userName: that.user.userName,
              password: that.user.password
            })
            .then(res => {
              console.log(res)
            })
        }
      })
    },
    account() {
      if (document.cookie.length <= 0) {
        const that = this
        console.log(that.getCookie('userName'))
        that.user.userName = that.getCookie('userName')
        that.user.password = that.getCookie('password')
      }
    }
  }
}
</script>

<style scoped></style>
