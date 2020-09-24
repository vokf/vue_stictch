<template>
  <div>
    <el-container>
      <!--      <el-aside width="200px" style="background: #27d2d2;height: 700px">-->
      <!--        <el-menu> </el-menu>-->
      <!--      </el-aside>-->
      <el-container>
        <el-header style="background: white;height: 100px">
          <el-menu mode="horizontal" style="background: #b6beb2">
            <el-submenu index="1">
              <el-menu-item index="1">刚刚</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main style="background: aquamarine;height: 400px"></el-main>
        <el-footer style="background: antiquewhite ;height: 100px"> </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
