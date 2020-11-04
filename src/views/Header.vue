<template>
  <div>
    <div>
      <el-header class="head">
        <div class="header">
          <el-menu
            background-color="#f2f6f2"
            :default-active="activeIndex"
            router
            mode="horizontal"
            active-text-color="#59b5e5"
          >
            <el-menu-item index="1" route="index">首页</el-menu-item>
            <el-menu-item index="2" route="tt">热点</el-menu-item>
            <el-menu-item index="3">处理</el-menu-item>
            <el-menu-item index="4">发布文章</el-menu-item>
            <el-menu-item>
              <div>嘿嘿</div>
            </el-menu-item>
          </el-menu>
        </div>
        <!--        <div class="btn">-->
        <!--          <el-button>成都</el-button>-->
        <!--        </div>-->
        <div class="userName">
          <span v-if="userName != ''">
            <span class="uu">
              <el-button
                ><el-link href="/user">{{ userName }}</el-link></el-button
              ></span
            >
            <el-button class="btn">退出</el-button>
          </span>
          <span v-else-if="userName === ''">
            <el-button class="btn">登录</el-button>
          </span>

          <!--          <el-button @click="clickUser" v-if="userName != ''"-->
          <!--            >{{ userName }}-->
          <!--          </el-button>-->
        </div>
      </el-header>
      <div style="height: 40px"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState(['userName'])
  },
  methods: {
    clickUser() {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 85%;
  height: 62px;
  background-color: #f2f6f2;
  left: 120px;

  position: fixed;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.menu {
  width: 250px;
  display: flex;
  position: relative;
  background-color: #59b5e5;
}

.dd {
  margin-top: 55px;
}

.userName {
  height: 40px;
  width: 85px;
  position: fixed;
  top: 15px;
  left: 1000px;

  .uu {
    font: {
      weight: bold;
    }
  }

  .btn {
    position: fixed;
    top: 15px;
    left: 1100px;
  }
}

.head {
  position: fixed;
  z-index: 1;
  top: 0;
}
</style>
