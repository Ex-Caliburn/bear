<template>
  <div class="app-container">
    <div class="flex flex-between MB20">
      <el-button type="primary" @click="exportUserInfo">导出</el-button>

      <el-input
        placeholder="微信昵称"
        @keyup.enter.native="search()"
        v-model="searchName"
        style="width: 240px"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>

    <el-table
      :data="tableData"
      :highlight-current-row="isDialog"
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        label="微信昵称"
        width="150"
        prop="user_name">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.user_name">
            <img class="avatar flex0 MR10" :src="scope.row.face_url" alt="头像">
            {{ scope.row.user_name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="手机"
        width="150"
        prop="mobile">
      </el-table-column>
      <el-table-column
        width="150"
        prop="birthday"
        label="生日">
      </el-table-column>

      <el-table-column
        width="80"
        prop="real_name"
        label="真名">
      </el-table-column>
      <el-table-column
        width="80"
        prop="gender"
        label="性别">
        <template slot-scope="scope">
          {{scope.row.gender === 1 ? '男' : '女'}}
        </template>
      </el-table-column>


      <el-table-column
        width="80"
        prop="consume_num"
        label="消费次数">
      </el-table-column>
      <el-table-column
        width="80"
        prop="consume_money"
        label="消费金额">
        <template slot-scope="scope">
          {{divide(scope.row.consume_money, 100)}}
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        prop="user_money"
        label="余额">
        <template slot-scope="scope">
          {{divide(scope.row.user_money, 100)}}
        </template>
      </el-table-column>


      <el-table-column
        width="80"
        prop="is_free_shipping"
        label="是否运费">
        <template slot-scope="scope">
          {{scope.row.is_free_shipping ? '是' : '否'}}
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        prop="vip_status"
        label="会员状态">
        <template slot-scope="scope">
          {{scope.row.vip_status ? '会员' : '普通用户'}}
        </template>
      </el-table-column>

      <el-table-column
        width="150"
        prop="created_at"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.created_at | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>


      <!--<el-table-column-->
      <!--fixed="right"-->
      <!--prop="desc" label="操作" min-width="200">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="primary" size="medium" class="cur-pointer" @click="goDetail(scope.row.questionId, scope.row.questionType)">详情-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
  import { dateFormat } from '@/utils/'
  import {ENV_URL} from '@/utils/const'

  import ImagePreviewer from '@/components/ImagePreviewer'
  import pagination from '@/mixins/pagination'
  import precision from 'number-precision'

  export default {
    name: 'userInfo',
    components: {
      ImagePreviewer
    },
    filters: {
      dateFormat
    },
    mixins: [pagination],
    directives: {},
    props: {
      isDialog: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tableData: [],
        searchName: ''
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      divide: precision.divide,
      exportUserInfo () {
        window.location.href = ENV_URL.exportUserInfo
      },
      init() {
        request.get('userInfoList', {
          limit: this.page.pageSize,
          offset: this.page.offset,
          user_name: this.searchName,
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.user_info
          }).catch(err => {
          console.log(err)
        })
      },
      goDetail(id, questionType) {
        this.routePush('questionDetail', { questionId: id, questionType })
      },
      search() {
        this.init()
      },
      jumpPage() {
        this.init()
      }
    }
  }
</script>

<style scoped>

</style>
