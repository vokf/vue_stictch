<template>
  <div>
    <div>
      <div></div>
    </div>
    <div>
      <el-container
        style="height: 700px ;width: 700px;background: #f1ebeb;margin-left: auto;margin-right: auto"
      >
        <el-main>
          <el-form :model="article" :rules="rules" ref="article">
            <el-form-item label="分类" prop="category" label-width="100px">
              <el-select v-model="article.category">
                <el-option
                  :label="item.positionName"
                  :disabled="item.disabled"
                  :value="item.positionName"
                  :key="item.positionName"
                  v-for="item in positionList"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="大标题:" label-width="100px">
              <el-input v-model="article.big_title"></el-input>
            </el-form-item>
            <el-form-item label="小标题:" label-width="100px">
              <el-input v-model="article.small_title"></el-input>
            </el-form-item>
            <el-form-item label="内容:" label-width="100px">
              <el-input
                v-model="article.content"
                type="textarea"
                rows="10"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片:" label-width="100px">
              <el-upload
                list-type="picture"
                :show-file-list="true"
                :before-upload="beforeAvatarUpload"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-success="success"
                name="upfile"
                class="avatar-uploader"
                action="http://localhost:8090/uploadImage"
                multiple
                :on-error="uploadFileError"
                :limit="3"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过2MB
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button @click="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Article',
  created() {
    let that = this
    that.$axios.get('http://localhost:8090/position/allPosition').then(res => {
      that.positionList = res.data
    })
  },
  data() {
    return {
      ...mapState(['userId', 'userName']),
      content: '',
      positionList: [],
      article: {
        category: '',
        big_title: '',
        small_title: '',
        content: this.value,
        image: '',
        video: ''
      },
      rules: {},
      serverUrl: 'http://localhost:8090/uploadImage'
    }
  },
  methods: {
    success(res) {
      if (res.state === 'SUCCESS') {
        this.$message.success('上传成功')
        let url = res.url
        this.article.image = url.toString()
      }
    },
    uploadFileError() {
      this.$message.error('上传失败！')
    },
    handlePreview(file) {
      // for (let i = 0; i < this.fileList.length; i++) {}
      this.imageURL = file.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    submit() {
      let that = this
      let aData = {}
      aData['articleCategory'] = that.article.category
      aData['articleBigTitle'] = that.article.big_title
      aData['articleSmallTitle'] = that.article.small_title
      aData['articleContent'] = that.article.content
      aData['articleImage'] = that.article.image
      aData['articleUploadUserId'] = that.userId
      aData['userName'] = that.userName

      that
        .$axios({
          url: 'http://localhost:8090/article/addArticle',
          method: 'post',
          data: JSON.stringify(aData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            dataType: 'json'
          }
        })
        .then(res => {
          if (res.data.msg === '添加成功') {
            that.$message.success('成功')
          }
        })
    }
  },
  mounted() {},
  components: {}
}
</script>

<style lang="scss"></style>
