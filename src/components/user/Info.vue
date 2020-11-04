<template>
  <div>
    <div><Header /> <Nav /></div>
    <router-view />
  </div>
</template>

<script>
import Header from '@/views/Header'
import Nav from '@/components/user/Nav'
export default {
  name: 'Info',
  components: { Nav, Header }
}
</script>

<style scoped></style>
