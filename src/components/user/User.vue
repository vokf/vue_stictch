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
      user: {
        userName: '',
        age: 0,
        phone: '',
        gender: '',
        companyName: '',
        companyLocation: '',
        email: ''
      },
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
</style>
