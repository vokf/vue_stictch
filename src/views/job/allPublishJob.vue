<template>
  <div>
    <div><Header /></div>
    <div><all-job /></div>
  </div>
</template>

<script>
import allJob from '@/components/job/allJob'
import Header from '@/views/Header'
export default {
  name: 'allPublishJob',
  components: {
    allJob,
    Header
  }
}
</script>

<style scoped></style>
