<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ userId }}</h2>
    <button>fff</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['userId'])
  },
  created() {
    let item = localStorage.getItem('userId')
    console.log(item)
  },
  methods: {
    ...mapMutations(['change'])
  }
}
</script>
