<template>
  <div>
    <el-container>
      <el-header></el-header>
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
              prefix-icon="fa fa-user-o"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              prefix-icon="fa fa-key"
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
import { mapMutations } from 'vuex'
export function login() {}
export default {
  name: 'Login',

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
  created() {},

  mounted() {},
  methods: {
    ...mapMutations(['updateUserId']),

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
            url: '/user/userLogin',
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
            if (res.data.msg === 'success') {
              // let h = that.$createElement
              that.$message.success('登录成功')

              that.$router.push({
                path: '/index',
                query: {
                  userId: res.data.obj
                }
              })

              that.updateUserId({
                id: res.data.userId,
                username: res.data.userName
              })
            }
            if (res.data.msg === 'error') {
              that.$message.error('密码错误,请重新登录')
            }
          })
          .catch(() => {
            that.$message.error('服务器错误，请联系管理员')
          })
      })
    }
  }
}
</script>

<style scoped></style>
