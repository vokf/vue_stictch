<template>
  <div class="">
    <div>
      <div>
        <el-container style="background: #3f4041">
          <el-header height="50px">
            <el-breadcrumb separator="/" class="bread">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href=""></a>用户</el-breadcrumb-item>
              <el-breadcrumb-item>修改用户 </el-breadcrumb-item>
              <el-breadcrumb-item>用户</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <el-main></el-main>
        </el-container>
      </div>
      <div style="background: #ff6c6c">
        <el-container>
          <el-header height="50px"> </el-header>
        </el-container>
      </div>
      <div style="background: #e6a23c;height: 100px">
        <el-container class="input">
          <el-input placeholder="请输入" v-model="search" />
          <el-button type="primary">搜索</el-button>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      search: '',
      user: {
        userId: 0,
        userName: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bread {
  position: fixed;
  right: 200px;
  top: 20px;
  padding: {
    top: 20px;
  }
}
.input {
  width: 600px;
  padding: {
    left: 200px;
    top: 20px;
  }
}
</style>
