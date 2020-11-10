<template>
  <div>
    <div>
      <div class="head">
        <div class="header">
          <el-menu
            background-color=" #c6c6f3"
            mode="horizontal"
            active-text-color="#c6c6f3"
            router
            :default-active="activeIndex"
          >
            <el-menu-item index="/index"><span>首页</span></el-menu-item>
            <el-menu-item><span>热点</span></el-menu-item>
            <el-menu-item index="/publishArticle"
              ><span>发布文章</span></el-menu-item
            >
          </el-menu>
        </div>

        <div class="userName">
          <span v-if="userName != ''">
            <el-button class="btn" @click="logout">退出</el-button>
          </span>
          <span v-else-if="userName === ''">
            <el-button class="btn" @click="clickUser">登录</el-button>
          </span>
          <span>
            <el-button
              class="register"
              @click="toRegister"
              v-show="registerShow"
              >注册</el-button
            >
          </span>

          <el-image
            :src="userPicture"
            @click="clickImage"
            v-show="boolShow"
          ></el-image>
        </div>
      </div>
      <div style="height:90px"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',

  data() {
    return {
      registerShow: false,
      boolShow: false,
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState(['userName', 'userPicture'])
  },
  methods: {
    clickUser() {
      this.$router.push('/login')
    },
    clickImage() {
      this.$router.push('/user/info')
    },
    logout() {
      window.localStorage.clear()
      this.$router.push('/index')
    },
    toRegister() {
      this.$router.push('/register')
    }
  },
  created() {
    if (this.userPicture != '') {
      this.boolShow = true
    } else {
      this.boolShow = false
    }
    if (this.userName == '') {
      this.registerShow = true
    } else {
      this.registerShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #c6c6f3;
  width: 97%;
  padding: {
    right: 10px;
  }
  top: 0px;
  height: 100px;

  position: fixed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-menu {
    padding: {
      left: 15px;
    }
    width: 100%;
    border: 1px solid red;
    position: relative;
    height: 100px;
  }

  .el-menu-item {
    position: relative;
    top: 20px;
    left: 170px;
    width: 120px;

    text-align: center;

    span {
      letter-spacing: 2px;
      font: {
        weight: bold;
      }
      position: relative;
      //
    }
  }

  .el-menu-item > span:nth-child(2) {
    position: relative;
    left: 5px;
  }
}

.userName {
  height: 40px;
  width: 85px;
  position: fixed;
  top: 15px;
  left: 1000px;

  .register {
    position: fixed;
    top: 15px;
    left: 1200px;
  }
}

.head {
  position: fixed;
  z-index: 4000;
  top: 0;

  .btn {
    position: fixed;
    top: 35px;
    left: 1100px;
  }

  .el-image {
    height: 50px;
    width: 50px;
    position: fixed;
    left: 1000px;
    top: 30px;
    border-radius: 70%;
  }
}
</style>
