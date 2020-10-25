<template style="height: 500px;width: 600px ">
  <div>
    <el-container>
      <el-form>
        <el-form-item>
          <el-input
            icon="el-icon-search"
            v-model="search"
            placeholder="请输入要搜索的内容"
            prefix-icon="el-icon-search"
          />
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-main>
        <el-table
          fit
          :data="jobList"
          max-height="700px"
          height="400px"
          border
          highlight-current-row
        >
          <el-table-column
            prop="publishTitle"
            label="标题"
            :width="width"
            type="index"
          />
          <el-table-column prop="publishTime" label="截至日期" width="140px" />
          <el-table-column
            show-overflow-tooltip
            prop="publishRequiredBasic"
            label="基本要求"
            width="200"
          />
          <el-table-column
            id="one"
            show-overflow-tooltip
            prop="publishRequiredSpecial"
            label="专业要求"
            width="278"
          />
          <el-table-column
            prop="publishDuty"
            label="工作职责"
            width="100px"
            show-overflow-tooltip
          />
          <el-table-column prop="salary" label="薪水" width="100px" />
          <el-table-column
            label="联系电话"
            prop="publishPhone"
            :width="width"
          />
          <el-table-column prop="publishAddress" label="公司地址" width="180" />
          <el-table-column prop="category" label="分类" :width="width" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="">
              <el-button @click.native.prevent="" type="danger" size="small"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <template>
          <div class="block">
            <span class="demonstration"></span>
            <!--分   页-->
            <el-pagination
              :current-page="currentPage"
              :page-size="pagesize"
              :page-sizes="[5, 10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.page.total"
            >
            </el-pagination>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'allPublishJob',
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据

      width: '110px',
      jobList: [],
      search: '',
      page: {
        total: 0
      },
      publish: {
        publishTitle: '',
        publishTime: '',
        publishRequiredBasic: '',
        publishRequiredSpecial: '',
        publishPhone: '',
        publishAddress: '',
        publishDuty: '',
        category: ''
      }
    }
  },
  created() {
    let that = this
    that
      .$axios({
        baseURL: 'http://localhost:8090',
        url: '/job/allJobPublish',
        method: 'get'
      })
      .then(res => {
        that.jobList = res.data
      })
      .catch(err => {
        console.log(err)
        that.$message.error('服务器出问题了')
      })
    that.$axios.get('http://localhost:8090/job/total').then(res => {
      that.page.total = res.data
    })
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped></style>
