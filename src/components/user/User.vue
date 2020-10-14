<template>
  <div>
    <div>
      <div>
        <div class="entire">
          <el-header height="100px" style="background: #b6beb2">
            <div class="right">欢迎{{ userName }}</div>
          </el-header>
          <el-main style="background: #50bfbf"></el-main>
        </div>
        <el-main>
          <div class="show">
            <div>用户名:</div>
            <div class="one">gg</div>
            <div>年龄:</div>
            <div class="one">18</div>
            <div>性别:</div>
            <div class="one">hh</div>
            <div>联系电话</div>
            <div class="one">2222</div>
            <div>邮箱</div>
            <div class="one">ll</div>
            <div>爱好</div>
            <div class="one">
              lu试试来到面对昆明昆明聪明的 差点就肯定很精彩的
            </div>
            <el-button @click="dialogFormVisible = true">修改信息</el-button>
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
              <el-form :model="user" :rules="rules" status-icon>
                <el-form-item
                  label="用户名:"
                  :label-width="labelWidth"
                  prop="userName"
                >
                  <el-input
                    v-model="user.userName"
                    autocomplete="off"
                    placeholder="修改您的用户名"
                  />
                </el-form-item>
                <el-form-item
                  label="年龄:"
                  :label-width="labelWidth"
                  prop="age"
                >
                  <el-input
                    v-model="user.age"
                    autocomplete="off"
                    placeholder="您的年龄"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="性别:"
                  :label-width="labelWidth"
                  prop="gender"
                >
                  <el-select v-model="user.gender">
                    <el-option value="男" label="男" />
                    <el-option value="女" label="女" />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="联系电话:"
                  :label-width="labelWidth"
                  prop="phoneNum"
                >
                  <el-input
                    v-model="user.phoneNum"
                    autocomplete="off"
                    placeholder="您的联系电话"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="电子邮箱:"
                  :label-width="labelWidth"
                  prop="email"
                >
                  <el-input
                    v-model="user.email"
                    placeholder="您的电子邮箱"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="上传头像:" :label-width="labelWidth">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                  >
                    <img :src="imageURL" v-if="imageURL" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
        </el-main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'User',
  data() {
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
      if (value.length < 6) {
        callback(new Error('字符必须大于6位'))
      } else if (value === '') {
        callback(new Error('必填'))
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
      userList: [],
      user: {
        userName: '',
        age: '',
        gender: '',
        phoneNum: '',
        email: ''
      },
      imageURL: '',
      dialogFormVisible: false,
      labelWidth: '120px',
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkUseName, trigger: 'blur' },
          { min: 6, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        gender: {
          required: true,
          message: '请选择性别',
          trigger: 'change'
        },
        phoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' },
          { max: 11, min: 11, message: '电话号码是11位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱账户', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    let that = this
    that
      .$axios({
        url: 'http://localhost:8090/user/findById',
        params: {
          userId: that.userId
        },
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          dataType: 'json'
        }
      })
      .then(res => {
        let s = (that.userList = res.data)

        for (let a = 0; a < s.length; a++) {
          that.getUser(
            {
              userName: s[a].userName,
              age: s[a].age,
              phone: s[a].phone,
              gender: s[a].gender,
              companyName: s[a].companyName,
              companyLocation: s[a].companyLocation,
              email: s[a].email
            },
            {}
          )
        }
      })
  },
  computed: {
    ...mapState([
      'userId',
      'userName',
      'age',
      'gender',
      'phone',
      'companyName',
      'companyLocation',
      'email',
      'special'
    ])
  },
  methods: {
    ...mapMutations(['getUser'])
  }
}
</script>

<style scoped lang="scss">
.entire {
  padding: 0;
  margin: 0;
}

.right {
  font: {
    weight: bolder;
    size: 30px;
  }
  padding: {
    top: 20px;
  }
  position: fixed;
  left: 900px;
}

.show {
  letter-spacing: 3px;
  line-height: 40px;
  border: 1px solid silver;
  margin: {
    left: auto;
    right: auto;
  }
  font: {
    family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
  padding: {
    left: 50px;
  }
  height: 500px;
  width: 500px;
}

.one {
  position: relative;
  left: 200px;
  bottom: 40px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
