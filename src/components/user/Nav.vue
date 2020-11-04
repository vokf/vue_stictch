<template>
  <div>
    <el-container class="nav">
      <el-aside width="500">
        <el-menu default-active="/user/info" router mode="vertical">
          <el-menu-item index="/user/info">个人资料</el-menu-item>
          <el-menu-item index="/index">我的收藏</el-menu-item>
          <el-menu-item>我的标签</el-menu-item>
          <el-menu-item>我的发布</el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style lang="scss" scoped>
.nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  border: 0.1px solid #c0cee9;
  background: #c0cee9;
  top: 150px;
  left: 120px;
  display: flex;
  position: fixed;
  .el-menu-item {
    letter-spacing: 3px;
    display: block;
    margin: {
      right: auto;
      left: auto;
    }
    padding: {
      top: 15px;
    }
    text-align: center;
    height: 90px;
    width: 150px;
    font: {
      size: 14px;
    }
  }
  .el-menu-item:hover {
    background: #c0cee9;
  }
}
</style>
