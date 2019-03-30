<template>
  <div class="app-container">
    <div class="flex flex-between MB20">
      <router-link class="jdk-fake-btn" :to="{name: 'createCoupon',params: {id: 0}}">添加优惠券活动</router-link>
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
      <el-table-column
        label="优惠券类型"
        width="100"
        prop="coupon_type">
      </el-table-column>
      <el-table-column
        label="优惠金额"
        width="100"
        prop="coupon_money">
      </el-table-column>

      <el-table-column
        label="商品图片"
        width="100"
        prop="activity_image">
        <template slot-scope="scope">
          <img src="scope.row.goods_image" alt="">
        </template>
      </el-table-column>

      <el-table-column
        label="商品图片"
        width="100"
        prop="activity_state">
        <template slot-scope="scope">
        </template>
      </el-table-column>

      <el-table-column
        label="优惠券活动开始时间"
        width="150"
        prop="invite_code">
        <template slot-scope="scope">
          {{scope.row.activity_start_time | dateFormat("yyyy-MM-dd hh:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠券活动结束时间"
        width="150"
        prop="coupon_status">
        <template slot-scope="scope">
          {{  scope.row.activity_end_time | dateFormat("yyyy-MM-dd hh:mm:ss") }}
        </template>
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
        label="创建时间"
        width="150"
        prop="create_time">
        <template slot-scope="scope">
          {{  scope.row.create_time | dateFormat("yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
        prop="create_time">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" class="cur-pointer" @click="goDetail(scope.row.userId)">修改
          </el-button>
          <router-link :to="{name: 'createCoupon',params: {id: scope.row.id}}"></router-link>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="备注"
        width="150"
        prop="coupon_remarks">
      </el-table-column>

      <el-table-column
        label="更新时间"
        width="150"
        prop="update_at">
        <template slot-scope="scope">
          {{scope.row.coupon_start_period | dateFormat("yyyy-MM-dd hh:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="150"
        prop="created_at">
        <template slot-scope="scope">
          {{  scope.row.coupon_end_period | dateFormat("yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        prop="create_time">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" class="cur-pointer" @click="goDetail(scope.row.coupon_id)">修改
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
