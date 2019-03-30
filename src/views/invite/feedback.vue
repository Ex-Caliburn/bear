<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="投诉的问题类型">
        <template slot-scope="scope">
          {{complainTypeArr[scope.row.complain_type-1]}}
        </template>
      </el-table-column>
      <el-table-column
        label="投诉内容"
        prop="content">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column
        label="投诉图片">
        <template slot-scope="scope">
          <image-previewer :prePictureList="scope.row.pictures"></image-previewer>
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          {{ scope.row.created_at | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="->, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>

  </div>
</template>

<script>
  import ImagePreviewer from '@/components/ImagePreviewer'

  import { dateFormat } from '@/utils/'
  import request from '@/api/request'
  import pagination from '@/mixins/pagination'

  const complainTypeArr = ['功能异常', '产品建议', '其它问题', '', '该研究生回答内容', '该研究生沟通态度问题', '其它问题']

  export default {
    components: {
      ImagePreviewer
    },
    mixins: [pagination],
    filters: {
      dateFormat
    },
    props: {},
    data() {
      return {
        tableData: [
          // {
          //   "complain_id": 3,
          //   "user_id": 2,
          //   "user_name": "夏壮",
          //   "complain_type": 5,
          //   "created_at": 1527091439000,
          //   "content": "213123123",
          //   "pictures": "",
          //   "status": 1
          // }
        ],
        complainTypeArr
      }
    },

    computed: {},
    watch: {},
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.get('getFeedbackList', {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        })
          .then(res => {
            res.data.map(item => {
              item.pictures = item.pictures ? item.pictures.split(',') : []
            })
            this.totalCount = res.count
            this.tableData = res.data
          }).catch(err => {
          console.log(err)
        })
      },
      jumpPage() {
        this.init()
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 私有样式
</style>
