<template>
  <div>
    <div>
      <div>
        <div>
          <Login />
          <div><el-button></el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/login/Login'

export default {
  components: {
    Login
  },
  name: 'UserLogin',
  methods: {
    login() {
      console.log('login能打印吗')
    }
  }
}
</script>

<style scoped></style>
