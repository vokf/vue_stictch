<template>
  <div>
    <div id="quillEditorId">
      <el-upload
        name="upfile"
        class="avatarUploader"
        action="http://localhost:8090/uploadImage"
        :show-file-list="true"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <quill-editor
        id="myQuillEditorId"
        ref="myQuillEditor"
        v-model="ruleForm.editeContent"
        :options="editorOption"
        @change="handelEditorChange($event)"
      >
      </quill-editor>
    </div>
  </div>
</template>
<script>
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
  ['blockquote', 'code-block'], //引用、代码块儿
  [{ header: 1 }, { header: 2 }], //标题，键值对的形式；1、2表示字体大小
  [{ list: 'ordered' }, { list: 'bullet' }], //列表
  [{ script: 'sub' }, { script: 'super' }], //上下标
  [{ indent: '-1' }, { indent: '+1' }], //缩进
  [{ direction: 'rtl' }], //文本方向
  [{ size: ['small', false, 'large', 'huge'] }], //字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], //字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ['clean'], //清除字体样式
  ['image'] //上传图片、上传视频(video)、超链接(link)
]
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['userId'])
  },
  created() {
    this.$axios({ url: 'http://localhost:8090/article/allArticle' }).then(
      res => {
        this.list = res.data
      }
    )
  },

  methods: {
    ...mapMutations(['change']),
    handleAvatarSuccess(res, file) {
      // 图片上传成功后的回调
      console.log(res, file)
    },
    beforeAvatarUpload(res) {
      // 思路：上传图片至服务后，拿到返回的图片地址。直接创建image标签插入光标所在的位置
      // 图片上传服务(本地服务或者阿里云服务)
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 上传服务成功后，按根据光标位置把图片插入编辑器中
      if (res.url) {
        // 获取光标所在位置,data.url表示上传服务后返回的图片地址
        let length = quill.getSelection().index
        // 插入图片，data.url为服务返回的图片链接地址
        quill.insertEmbed(length, 'image', res.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    handelEditorChange(el) {
      console.log(el, 'el')
    },
    HandleCustomMatcher(node, Delta) {
      // 文字、图片等，从别处复制而来，清除自带样式，转为纯文本
      let ops = []
      Delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert
          })
        }
      })
      Delta.ops = ops
      return Delta
    }
  },

  components: {},
  data() {
    return {
      ruleForm: { editeContent: '' },
      imageUrl: '',
      editeContent: '',
      editorOption: {
        modules: {
          clipboard: {
            // 粘贴版，处理粘贴时候的自带样式
            matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]]
          },
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 获取隐藏的上传图片的class，不一定是.el-icon-plus。触发上传图片事件
                  document.querySelector('.el-icon-plus').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        placeholder: ''
      }
    }
  }
}
</script>
<style>
.avatarUploader {
  display: none;
}
</style>
