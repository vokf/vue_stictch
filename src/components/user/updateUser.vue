<template>
  <div>
    <div>
      <div>
        <el-header height="100px " style="background: #45be09">
          header
        </el-header>
      </div>
      <div class="update_user">
        <el-container>
          <el-main>
            <el-form
              class=""
              :rules="rules"
              :model="user"
              ref="user"
              status-icon
            >
              <el-form-item label="用户名" :label-width="width" prop="userName">
                <el-input v-model="user.userName" />
              </el-form-item>
              <el-form-item label="年龄" :label-width="width" prop="age">
                <el-input
                  type="age"
                  v-model="user.age"
                  placeholder="请输入您的年龄"
                />
              </el-form-item>
              <el-form-item label="性别" :label-width="width" prop="gender">
                <el-select v-model="user.gender">
                  <el-option value="男" label="男" />
                  <el-option value="女" label="女" />
                </el-select>
              </el-form-item>
              <el-form-item label="爱好" :label-width="width" prop="special">
                <el-input v-model="user.special" type="textarea" />
              </el-form-item>
            </el-form>
            <el-button @click="change()">提交</el-button>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updateUser',
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.parseInt(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    let checkUseName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('  请输入用户名 '))
      } else if (value.length < 6) {
        callback(new Error('字符必须大于6位'))
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
      user: {
        userName: '',
        gender: '',
        special: '',
        age: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUseName, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        special: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        age: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          },
          {
            validator: checkAge,
            trigger: 'blur'
          }
        ]
      },
      width: '120px'
    }
  },
  methods: {
    change() {
      let that = this
      let uData = {}
      uData['userId'] = that.$store.state.userId
      uData['userName'] = that.user.userName
      uData['gender'] = that.user.gender
      uData['age'] = that.user.age
      uData['special'] = that.user.special
      console.log(uData)
      that.$refs.user.uData['phone'] = that.publish.contact(async valid => {
        if (!valid) return new Error('无法通过验证')
        else {
          await that
            .$axios({
              url: 'http://localhost:8090/user/updateUser',
              method: 'post',
              data: JSON.stringify(uData),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                dataType: 'json'
              }
            })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                console.log('出问题')
              } else if (res.status === 500) {
                console.log('难道你')
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.update_user {
  height: 500px;
  width: 400px;
}
</style>
