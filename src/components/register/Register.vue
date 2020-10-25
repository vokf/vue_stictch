<template>
  <div>
    <div>
      <div>
        <el-form ref="user" :model="user" status-icon :rules="rules">
          <el-form-item
            prop="userName"
            :label-width="labelWidth"
            label="用户名:"
          >
            <el-input
              prefix-icon="el-icon-user"
              @paste.native.capture.prevent="handlePaste"
              v-model="user.userName"
              ref="userName"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item prop="password" :label-width="labelWidth" label="密码:">
            <el-input
              prefix-icon="el-icon-key"
              type="password"
              show-password
              @paste.native.capture.prevent="handlePaste"
              v-model="user.password"
              ref="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item
            prop="confirmPass"
            :label-width="labelWidth"
            label="确认密码:"
          >
            <el-input
              prefix-icon="el-icon-key"
              show-password
              type="password"
              @paste.native.capture.prevent="handlePaste"
              v-model="user.confirmPass"
              placeholder="确认密码"
            />
          </el-form-item>
          <el-form-item
            prop="phoneNum"
            :label-width="labelWidth"
            label="电话号码:"
          >
            <el-input
              v-model="user.phoneNum"
              @paste.native.capture.prevent="handlePaste"
              placeholder="电话号码"
            />
          </el-form-item>
          <el-form-item prop="email" :label-width="labelWidth" label="邮箱:">
            <el-input
              @paste.native.capture.prevent="handlePaste"
              placeholder="邮箱"
              v-model="user.email"
            />
          </el-form-item>
          <el-button @click="register('user')">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    // 验证密码
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else {
        if (
          value.match(
            /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
          )
        ) {
          this.$refs.user.validateField('confirmPass')
          callback()
        } else {
          return new Error('密码格式不正确')
        }
      }
    } // 验证确认密码
    let checkConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    // 匹配电话号码
    let checkNum = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入手机号')
      } else {
        if (value.match(/0?(13|14|15|17|18|19)[0-9]{9}/)) {
          callback()
        } else {
          return new Error('目前只支持中国大陆的手机号码')
        }
      }
    }
    // 匹配邮箱
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(Error('请输入邮箱'))
      } else {
        if (
          value.match(
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
          )
        ) {
          callback()
        } else {
          return new Error('邮箱格式不正确')
        }
      }
    }
    let checkUseName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 6) {
        callback(new Error(' 字符必须大于6位 '))
      } else {
        this.$axios
          .get('http://localhost:8090/user/findUserByName', {
            params: {
              userName: value
            }
          })
          .then(res => {
            if (res.status === 200) {
              callback()
            }
            if (res.status === 500) {
              callback(new Error('该用户名已存在'))
            }
          })
      }
    }

    return {
      labelWidth: '120px',
      user: {
        userName: '', //用户名
        password: '', //密码
        confirmPass: '', //确认密码
        phoneNum: '', // 电话号码
        email: '' // 邮箱
      }, // 规则
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUseName, trigger: 'blur' },
          { min: 6, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码最少8位', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, message: '请确认您的密码', trigger: 'blur' },
          { validator: checkConfirmPass, trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' },
          { max: 11, min: 11, message: '电话号码是11位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱账户', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register(form) {
      let _this = this
      let userData = {}
      userData['userName'] = _this.user.userName
      userData['passWord'] = _this.user.password
      userData['phone'] = _this.user.phoneNum
      userData['email'] = _this.user.email
      const registerData = JSON.stringify(userData)
      console.log(registerData)
      _this.$refs[form].validate(async valid => {
        if (!valid) return new Error('无法通过验证')
        else {
          await _this
            .$axios({
              method: 'post',
              url: 'http://localhost:8090/user/register',
              data: registerData,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                dataType: 'json'
              }
            })
            .then(res => {
              console.log(res)
            })
            .catch()
        }
      })
      // _this
      //   .$axios({
      //     method: 'post',
      //     // 请求url
      //     url: 'http://localhost:8090/user/userLogin',
      //     // 请求参数
      //     data: loginData,
      //     // 在请求头中添加一下内容
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //       dataType: 'json'
      //     }
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    handlePaste() {},
    checkUser() {}
  }
}
</script>

<style scoped lang="scss">
.el-form {
  height: 500px;
  width: 300px;
}
</style>
