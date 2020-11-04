<template>
  <div class="this">
    <div>
      <div style="">
        <el-container class="input">
          <el-input placeholder="请输入" v-model="searchContent" />
          <el-button type="primary" @click="searchMethod">搜索</el-button>
        </el-container>
      </div>
      <div>
        <index />
      </div>
      <div>
        <cont v-bind:info="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Index from '@/components/Index'
import cont from '@/components/index/contentArticle'

export default {
  name: 'HelloWorld',
  created() {
    this.$axios({
      url: '/article/allArticle',
      method: 'get'
    }).then(res => {
      this.list = res.data
    })
  },
  data() {
    return {
      searchContent: '',
      list: []
    }
  },
  computed: {
    ...mapState(['userId', 'userName']),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations(['getUser']),
    searchMethod() {
      let that = this
      that
        .$axios({
          baseURL: 'http://localhost:8090',
          url: '',
          method: 'get',
          params: { search: that.searchContent }
        })
        .then(res => {
          res.data = that.list
        })
    }
  },
  components: {
    index: Index,
    cont: cont
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input {
  width: 600px;
  padding: {
    left: 200px;
    top: 20px;
  }
}

.this {
  overflow: hidden;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}
</style>
