<template>
  <div>
    <div>
      <div>
        <div class="entire">
          <el-header height="100px" style="background: #b6beb2">
            <div class="right">欢迎</div>
          </el-header>
          <el-main style="background: #50bfbf"></el-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'User',
  data() {
    return {
      userList: []
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
        // params: { id: Number(that.$store.state.userId) },
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          dataType: 'json'
        }
      })
      .then(res => {
        let newVar = (that.userList = res.data)
        console.log(newVar)
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
  methods: {}
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
