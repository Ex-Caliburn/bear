<template>
  <div class="app-container">

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        label="用户名"
        prop="user_name">
      </el-table-column>
      <el-table-column
        label="邀请人数"
        prop="invite_num">
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
        prop="create_time">
        <template slot-scope="scope">
          <div class="flex flex-between flex-align-center">
            <el-button type="text" @click="getInviteHistory(scope.row.user_id)">查看邀请记录
            </el-button>
          </div>
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

    <!-- 邀请记录 -->
    <el-dialog
      title="邀请记录"
      :visible.sync="dialog.invite"
      :close-on-click-modal="false"
      :append-to-body="true"
      top="10vh"
      width="600px"
    >
      <el-table
        :data="inviteHistoryList"
        style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          label="邀请人"
          prop="user_name">
        </el-table-column>
        <el-table-column
          label="邀请人数"
          prop="invite_num">
        </el-table-column>
        <el-table-column
          label="被邀请人"
          prop="invite_user_name">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="150"
          prop="update_at">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
      </el-table>

      <CustomPagination :page="invitePage" :pageJump="getUserInviteUserInfo"/>
    </el-dialog>

  </div>

</template>

<script>
  import { dateFormat } from '@/utils/'
  import request from '@/api/request'
  import pagination from '@/mixins/pagination'

  import avatar from '@/components/avatar'
  import ImagePreviewer from '@/components/ImagePreviewer'
  import CustomPagination from '@/components/CustomPagination'

  export default {
    name: 'invite',
    components: {
      avatar,
      ImagePreviewer,
      CustomPagination,
    },
    filters: {
      dateFormat
    },
    mixins: [pagination],
    directives: {},
    data() {
      return {
        tableData: [],
        inviteHistoryList: [],
        dialog: {
          invite: false
        },
        couponType: 1,
        searchName: '',
        invitePage: {
          limit: 10,
          offset: 0,
          current: 1,
          totalCount: 0
        },
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.get('getUserInviteRecord', {
          limit: this.page.pageSize,
          offset: this.page.offset,
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.list
          }).catch(err => {
          console.log(err)
        })
      },
      getUserInviteUserInfo() {
        request.get('getUserInviteUserInfo', {
          user_id: this.inviteId,
          limit: this.invitePage.limit,
          offset: this.invitePage.offset,
        })
          .then(res => {
            this.invitePage.totalCount = res.count
            this.inviteHistoryList = res.list
          }).catch(err => {
          console.log(err)
        })
      },
      getInviteHistory(id) {
        this.dialog.invite = true
        this.inviteId = id
        this.getUserInviteUserInfo()
      },
      search() {
        this.init()
      },
      jumpPage() {
        this.init()
      },
    }
  }
</script>

<style scoped>
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
