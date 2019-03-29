<template>
  <div class="app-container">
    <div>
      <el-radio-group v-model="couponType" @change="init" class="MB20">
        <el-radio-button  :label="1">折扣券</el-radio-button>
        <el-radio-button  :label="2">免费体验券</el-radio-button>
        <el-radio-button  :label="3">现金体验券</el-radio-button>
      </el-radio-group>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        label="名称"
        width="150"
        prop="coupon_name">
      </el-table-column>
      <el-table-column
        label="优惠码"
        width="100"
        prop="promotion_code">
      </el-table-column>
      <el-table-column
        label="优惠券密码"
        width="100"
        prop="promotion_pwd">
      </el-table-column>
      <!--<el-table-column-->
        <!--label="优惠券类型"-->
        <!--width="100"-->
        <!--prop="coupon_setting_type">-->
      <!--</el-table-column>-->
      <el-table-column
        label="优惠金额"
        width="100"
        prop="coupon_money">
      </el-table-column>
      <el-table-column
        label="开始时间"
        width="150"
        prop="invite_code">
        <template slot-scope="scope">
          {{scope.row.coupon_start_period | dateFormat("yyyy-MM-dd hh:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        width="150"
        prop="coupon_status">
        <template slot-scope="scope">
          {{  scope.row.coupon_end_period | dateFormat("yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="备注"
        width="150"
        prop="coupon_remarks">
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="150"
        prop="create_time">
        <template slot-scope="scope">
          {{  scope.row.create_time | dateFormat("yyyy-MM-dd hh:mm:ss") }}
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
  import avatar from '@/components/avatar'

  import request from '@/api/request'
  import pagination from '@/mixins/pagination'

  import { dateFormat } from '@/utils/'

  export default {
    name: 'invite',
    components: {
      avatar
    },
    filters: {
      dateFormat
    },
    mixins: [pagination],
    directives: {},
    data () {
      return {
        tableData: [],
        couponType: 1,
        searchName: ''
      }
    },
    mounted () {
      this.init()
    },

    methods: {
      init () {
        request.get('getCouponList', {
          limit: this.page.pageSize,
          offset: this.page.pageNum,
          coupon_type: this.couponType,
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.coupon_list
          }).catch(err => {
          console.log(err)
        })
      },
      search () {
        this.init()
      },
      jumpPage () {
        this.init()
      }
    }
  }
</script>

<style scoped>
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
