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
              placeholder="账户名"
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
              :style="{ background: 'rgb(190, 200, 200)' }"
              style="margin-left: 20px"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // form 表单的input 数据
      user: {
        userName: '',
        password: ''
      },
      check: false
    }
  },
  mounted() {},
  methods: {
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
    clearCookie: () => {
      this.setCookie('', '', -1) //修改2值都为空，天数为负1天就好了
    },
    setCookie: (c_name, c_pwd, c_day) => {
      const exdate = new Date() //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * c_day) //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        'userName' +
        '=' +
        c_name +
        ';path=/;expires=' +
        exdate.toLocaleDateString()
      window.document.cookie =
        'password' +
        '=' +
        c_pwd +
        ';path=/;expires=' +
        exdate.toLocaleDateString()
    }
  }
}
</script>

<style scoped></style>
