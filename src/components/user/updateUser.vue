<template>
  <div>
    <div>
      <div>
        <el-header height="100px " style="background: #45be09">
          header
        </el-header>
      </div>
      <div class="update_user">
        <el-container>
          <el-main>
            <el-form class="demo-form-inline">
              <el-form-item label="用户名">
                <el-input v-model="user.userName" />
              </el-form-item>
              <el-form-item label="年龄">
                <el-date-picker v-model="user.date"></el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="user.gender">
                  <el-option value="男" label="男" />
                  <el-option value="女" label="女" />
                </el-select>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updateUser',
  data() {
    return {
      user: {
        userName: '',
        gender: '',
        date: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.update_user {
  height: 500px;
  width: 400px;
}
</style>
