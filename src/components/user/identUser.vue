<template>
  <div>
    <div>
      <div>
        <el-container style="background: #b6beb2">
          <el-header height="100px">
            <el-container></el-container>
          </el-header>
        </el-container>
      </div>
      <div>
        <el-container>
          <el-header height="100px" style="background: #50bfbf"></el-header>
        </el-container>
      </div>
      <div>
        <el-container class="form">
          <el-main>
            <div>
              <el-form :model="company" status-icon label-width="120px">
                <el-form-item :label-width="width" label="公司名称:">
                  <el-input v-model="company.name"></el-input>
                </el-form-item>
                <el-form-item :label-width="width" label="公司地址:">
                  <el-input v-model="company.location"></el-input>
                </el-form-item>
                <el-form-item label="上传附件:" :label-width="width">
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
              </el-form>
              <div slot="footer" class="footer">
                <el-button>取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'identUser',
  data() {
    return {
      company: {
        name: '',
        location: ''
      },
      fileList: [],
      imageURL: '',
      width: '120px'
    }
  },
  methods: {
    success(res) {
      if (res.state === 'SUCCESS') {
        this.$message.success('上传成功')
        let url = res.url
        this.imageURL = url.toString()
      }
    },
    submit() {
      let that = this
      that.$axios({ method: 'get', params: { id: '' } })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  background: #b6beb2;
  width: 500px;
  height: 500px;
  margin: {
    left: auto;
    right: auto;
  }
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.footer {
  padding: {
    top: 70px;
    left: 150px;
  }
}
</style>
