<template>
  <div>
    <!--header-->
    <div>
      <el-container>
        <Header />
      </el-container>
    </div>
    <!--main-->
    <div
      style="background: #45be09 ;width: 600px;height: 650px;margin-left: auto;margin-right: auto"
    >
      <el-container>
        <el-main>
          <el-form status-icon :model="publish" :rules="rules" ref="publish">
            <el-form-item :label-width="width" label="标题" prop="title">
              <el-input v-model="publish.title"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="category" :label-width="width">
              <el-select
                v-model="publish.category"
                placeholder="请选择"
                filterable
              >
                <el-option
                  :label="item.positionName"
                  :disabled="item.disabled"
                  :value="item.positionName"
                  :key="item.positionName"
                  v-for="item in positionList"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="基本要求"
              prop="base_require"
              :label-width="width"
            >
              <el-input
                type="textarea"
                rows="3"
                v-model="publish.base_require"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="专业要求"
              prop="special_require"
              :label-width="width"
            >
              <el-input
                v-model="publish.special_require"
                type="textarea"
                rows="5"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="工作职责"
              prop="publishDuty"
              :label-width="width"
            >
              <el-input v-model="publish.publishDuty" />
            </el-form-item>
            <el-form-item label="薪资" prop="salary" :label-width="width">
              <el-input v-model="publish.salary" />
            </el-form-item>
            <el-form-item label="截止时间" prop="date" :label-width="width">
              <el-date-picker
                v-model="publish.date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
              <el-time-picker
                v-model="publish.time"
                format="hh:mm"
                value-format="hh:mm"
              />
            </el-form-item>
            <el-form-item prop="contact" :label-width="width" label="联系方式">
              <el-input v-model="publish.contact"></el-input>
            </el-form-item>
            <el-form-item :label-width="width" label="公司地址" prop="address">
              <el-input v-model="publish.address"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="submit">提交</el-button>
        </el-main>
      </el-container>
    </div>
    <!--footer-->
  </div>
</template>

<script>
import Header from '@/views/Header'
import { mapMutations } from 'vuex'

export default {
  name: 'publishJob',
  data() {
    let checkNum = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入手机号')
      } else {
        if (value.match(/0?(13|14|15|17|18|19)[0-9]{9}/)) {
          callback()
        } else {
          return new Error('目前只支持中国大陆的手机号码')
        }
      }
    }
    return {
      positionList: [],
      width: '100px',
      publish: {
        salary: '',
        publishDuty: '',
        title: '',
        category: '',
        date: '',
        time: '',
        base_require: '',
        special_require: '',
        address: '',
        contact: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        publishDuty: [
          { required: true, message: '请输入工作职责', trigger: 'blur' }
        ],
        salary: [
          { required: true, message: '请输入薪资要求', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择所属分类', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请确定截止时间', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请确定截止时间', trigger: 'change' }
        ],
        base_require: [
          { required: true, message: '请输入基本要求', trigger: 'blur' }
        ],
        special_require: [
          { required: true, message: '请输入对面试者技能要求', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写您的地址', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请确认您的联系方式', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Header
  },
  created() {
    let that = this
    that.$axios.get('http://localhost:8090/position/allPosition').then(res => {
      that.positionList = res.data
    })
  },
  methods: {
    ...mapMutations(['changePublishId']),
    submit() {
      let that = this
      let uData = {}
      let date = that.publish.date.toString()
      let time = that.publish.time.toString()
      let now = date + time
      uData['publishTitle'] = that.publish.title
      uData['publishUser'] = that.$store.state.userName
      uData['publishTime'] = now
      uData['publishRequiredBasic'] = that.publish.base_require
      uData['publishRequiredSpecial'] = that.publish.special_require
      uData['publishDuty'] = that.publish.publishDuty
      uData['publishPhone'] = that.publish.contact
      uData['publishAddress'] = that.publish.address
      uData['category'] = that.publish.category
      uData['salary'] = that.publish.salary

      that.$refs.publish.validate(async valid => {
        if (!valid) return new Error('填写有误')
        else {
          console.log(uData)
          await that
            .$axios({
              baseURL: 'http://localhost:8090',
              url: '/job/addJobPublish',
              method: 'post',
              data: JSON.stringify(uData),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                dataType: 'json'
              }
            })
            .then(res => {
              if (res.data === 'ok') {
                that.$message.success('发布成功')
                that.changePublishId({ publishId: res.data.obj })
              }
              if (res.status === 500) {
                that.message.error('发布失败')
              }
            })
            .catch()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
