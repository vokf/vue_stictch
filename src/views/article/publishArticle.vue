<template>
  <div>
    <div>
      <Header />
    </div>
    <div>
      <Article />
    </div>
  </div>
</template>

<script>
import Article from '@/components/article/Article'
import Header from '@/views/Header'

export default {
  name: 'publishArticle',
  components: {
    Article,
    Header
  }
}
</script>

<style scoped></style>
