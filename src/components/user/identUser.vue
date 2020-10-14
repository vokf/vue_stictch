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
                    :on-preview="handlePreview"
                    :on-success="success"
                    name="upfile"
                    class="avatar-uploader"
                    action="http://localhost:8090/uploadImage"
                    multiple
                    :show-file-list="fileList"
                  >
                    <img :src="imageURL" v-if="imageURL" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
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
    success() {},

    handlePreview(file) {
      this.imageURL = file.url
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

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
