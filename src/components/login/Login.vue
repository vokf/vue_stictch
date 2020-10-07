<template>
  <div>
    <el-container>
      <el-header>header</el-header>
      <el-main
        style="background: #c0cee9;height: 300px;width: 300px;margin-left: auto;margin-right: auto"
      >
        <el-form :rules="rule" status-icon :model="user" ref="user">
          <el-form-item prop="userName">
            <el-input
              placeholder="用户名"
              auto-complete="off"
              v-model="user.userName"
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              auto-complete="off"
              type="password"
              show-password
              placeholder="密码"
              v-model="user.password"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="check" :loading="logining"
              >一周内自动登录
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submit('user')"
              :style="{ background: 'rgb(190, 200, 200)' }"
              style="margin-left: 20px"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  props: {
    theUserId: {
      type: Number
    },
    theUserName: {
      type: String
    }
  },
  data() {
    //自定义验证密码
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    //自定义验证用户名
    let checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入您的用户名'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      // form 表单的input 数据
      user: {
        userName: '',
        password: ''
      },
      id: this.userId,

      check: false,
      rule: {
        userName: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { validator: checkUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, message: '长度最小为6', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let that = this
    that.account()
  },
  mounted() {},
  methods: {
    ...mapActions(['upUserId']),
    ...mapMutations(['updateUserId']),
    /**
     * 获取cookie
     */
    getCookie() {
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
    clearCookie() {
      this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
    },

    /**
     * 设置cookie
     * @param c_name 账号
     * @param c_pwd 密码
     * @param c_day 更新时间
     */
    setCookie(c_name, c_pwd, c_day) {
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
    submit() {
      const that = this
      that.$refs.user.validate(async valid => {
        if (!valid) return
        let uData = {}
        uData['userName'] = that.user.userName
        uData['passWord'] = that.user.password
        console.log(uData)
        const loginData = JSON.stringify(uData)
        that.logining = true
        // 向后端请求数据 用$axios
        await that
          .$axios({
            method: 'post',
            // 请求url
            url: 'http://localhost:8090/user/userLogin',
            // 请求参数
            data: loginData,
            // 在请求头中添加一下内容
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              dataType: 'json'
            }
          })
          .then(res => {
            if (res.status === 200) {
              // let h = that.$createElement
              that.$message.success('登录成功')

              that.$router.push({
                path: '/index',
                query: {
                  userId: res.data.obj
                }
              })
              // that.$store.commit('updateUserId', {
              //   id: res.data.obj
              // })
              // that.$store.dispatch('upUserId', {
              //   id: res.data.obj
              // })
              that.updateUserId({ id: res.data.obj })
            }
            if (res.status === 500) {
              that.$message.error('密码错误,请重新登录')
            }
          })
          .catch(() => {
            that.$message.error('服务器错误，请联系管理员')
          })
        if (that.check === true) {
          that.setCookie(that.user.userName, that.user.password)
        } else {
          that.clearCookie()
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
