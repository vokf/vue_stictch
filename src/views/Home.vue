<template>
  <div>
    <div>
      <Header />
    </div>

    <div>
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/views/Header'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Header
  }
}
</script>
