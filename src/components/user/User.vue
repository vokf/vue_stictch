<template>
  <div>
    <div>
      <div>
        <div class="entire">
          <el-header height="100px" style="background: #b6beb2">
            <div class="right">欢迎{{}}</div>
          </el-header>
          <el-main style="background: #50bfbf"> gg</el-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      // 用户信息
      user: {
        userName: '',
        password: '',
        age: 0,
        gender: '',
        phone: '',
        companyName: '',
        companyLocation: '',
        email: '',
        special: '',
        roleName: ''
      },
      userList: []
    }
  },
  created() {
    let that = this
    that.$axios({
      url: '',
      params: that.$router.query,
      method: 'GET'
    })
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
</style>
