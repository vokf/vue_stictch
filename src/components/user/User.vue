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
    return {
      userList: [],
      user: {}
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
</style>
