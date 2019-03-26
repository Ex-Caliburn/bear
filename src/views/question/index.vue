<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="问题类型"
        width="100"
        prop="content">
        <template slot-scope="scope">
          {{scope.row.questionType === 4 ? '悬赏' : '普通'}}
        </template>
      </el-table-column>
      <el-table-column
        label="问题"
        width="400"
        prop="content">
        <template slot-scope="scope">
          {{scope.row.question && scope.row.question.slice(0, 40)}}
        </template>
      </el-table-column>
      <el-table-column
        width="400"
        label="回答">
        <template slot-scope="scope">
          {{scope.row.answer && scope.row.answer.slice(0, 40) || ''}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="desc" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" class="cur-pointer" @click="goDetail(scope.row.questionId, scope.row.questionType)">详情
          </el-button>
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
  import request from '@/api/request'
  import ImagePreviewer from '@/components/ImagePreviewer'
  import pagination from '@/mixins/pagination'

  export default {
    name: 'question',
    components: {
      ImagePreviewer
    },
    mixins: [pagination],
    directives: {},
    data () {
      return {
        tableData: [],
        cost: 10,
        questionId: '', // 提问id
        questionerId: '', // 提问者id
        questionerName: '', // 提答者姓名
        questionPic: ['https://crm-test.jingdaka.com/pic/1527047890608_23aedf045bc244caa2130f0416e605c7.jpg'],
        questionContent: '',
        answerId: '', // 回答id
        answererId: '', // 回答者id
        answerName: '', // 回答者姓名
        answerPic: ['https://crm-test.jingdaka.com/pic/1527047890608_23aedf045bc244caa2130f0416e605c7.jpg'],
        answerContent: ''
      }
    },
    mounted () {
      this.init()
    },

    methods: {
      init () {
        request.get('getQuestionList', {
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.data
          }).catch(err => {
            console.log(err)
          })
      },
      goDetail (id, questionType) {
        this.routePush('questionDetail', { questionId: id, questionType })
      },
      jumpPage () {
        this.init()
      }
    }
  }
</script>

<style scoped>

</style>
