<template>
  <div class="app-container">
    <div class="flex flex-between MB20">
      <el-date-picker
        v-model="time"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

        <el-button :disabled="time.length < 2" type="success" @click="exports">导出</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        label="微信名"
        width="150"
        fixed
        prop="user_name">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="真实名字"
        width="150"
        prop="real_name">
      </el-table-column>
      <el-table-column
        label="手机号码"
        width="120"
        prop="mobile">
      </el-table-column>
      <el-table-column
        label="取件地址"
        width="150"
        prop="user_address">
      </el-table-column>
      <el-table-column
        label="回寄地址"
        width="100"
        prop="user_rtn_address">
      </el-table-column>
      <el-table-column
        label="快递类型"
        width="100"
        prop="connect_type">
        <template slot-scope="scope">
          {{scope.row.connect_type === 1 ? '上门收取': '客户快递'}}
        </template>
      </el-table-column>
      <el-table-column
        label="订单状态"
        width="100"
        prop="state">
        <template slot-scope="scope">
          {{stateArr[scope.row.state-1]}}
        </template>
      </el-table-column>
      <el-table-column
        label="订单id"
        width="100"
        prop="order_id">
      </el-table-column>
      <el-table-column
        label="订单金额"
        width="100"
        prop="total_fee">
        <template slot-scope="scope">
          {{ divide(scope.row.total_fee, 100) }}
        </template>
      </el-table-column>
      <el-table-column
        label="实际支付金额"
        width="110"
        prop="pay_fee">
        <template slot-scope="scope">
         {{  divide(scope.row.pay_fee, 100) }}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠金额"
        width="100"
        prop="discount_fee">
        <template slot-scope="scope">
          {{ divide(scope.row.discount_fee, 100) }}
        </template>
      </el-table-column>
      <el-table-column
        label="差价金额"
        width="100"
        prop="spread_fee">
        <template slot-scope="scope">
          {{ divide(scope.row.spread_fee, 100) }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否删除"
        width="100"
        prop="spread_fee">
        <template slot-scope="scope">
          {{scope.row.is_delete === 1? '正常': '删除'}}
        </template>
      </el-table-column>
      <el-table-column
        label="邮费"
        width="100"
        prop="postage_fee">
        <template slot-scope="scope">
          {{ divide(scope.row.postage_fee, 100) }}
        </template>
      </el-table-column>
      <el-table-column
        label="订单图"
        width="100"
        prop="image_url">
        <template slot-scope="scope">
          <img :src="scope.row.image_url | getMediaPath('picture')" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="取件时间"
        width="180"
        prop="pickup_time">
      </el-table-column>
      <el-table-column
        label="支付时间"
        width="180"
        prop="pay_at">
        <template slot-scope="scope">
          {{scope.row.pay_at | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180"
        prop="created_at">
        <template slot-scope="scope">
          {{scope.row.created_at | dateFormat('yyyy-MM-dd hh:mm:ss')}}
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
  import { dateFormat } from '@/utils/'
  import {ENV_URL} from '@/utils/const'
  import request from '@/api/request'
  import pagination from '@/mixins/pagination'
  import precision from 'number-precision'

  import avatar from '@/components/avatar'
  import userInfo from '@/views/userInfo/index'

  export default {
    name: 'consume',
    components: {
      avatar,
      userInfo,
    },
    filters: {
      dateFormat
    },
    mixins: [pagination],
    directives: {},
    data() {
      return {
        tableData: [],
        time: [],
        stateArr: ['待支付', '已支付', '已收件',  '服务中',  '服务完成', '用户确认完成'],
        dialog: {
          distribute: false
        },
        searchName: ''
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      divide: precision.divide,
      init() {
        request.get('getOrderList', {
          limit: this.page.pageSize,
          offset: this.page.offset,
          start_time: this.time[0] || '',
          end_time: this.time[1] || '',
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.order_info
          }).catch(err => {
          console.log(err)
        })
      },
      search() {
        this.init()
      },
      exports() {
        window.location.href = `${ENV_URL.exportOrderInfo}?start_time=${this.time[0]}&end_time=${this.time[1]}`
      },
      jumpPage() {
        this.init()
      }
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
