<template>
  <div class="app-container">
    <div class="flex flex-between MB20">
      <el-radio-group v-model="couponType" @change="init">
        <el-radio-button :label="1">折扣券</el-radio-button>
        <el-radio-button :label="2">免费体验券</el-radio-button>
        <el-radio-button :label="3">现金体验券</el-radio-button>
      </el-radio-group>

      <div>
        <router-link class="fake-btn MR20" :to="{name: 'createCoupon',params: {id: 0}}">新建券</router-link>
        <el-button type="success" @click="exports">导出</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        label="名称"
        width="150"
        fixed
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
          {{scope.row.coupon_start_period | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        width="150"
        prop="coupon_status">
        <template slot-scope="scope">
          {{ scope.row.coupon_end_period | dateFormat('yyyy-MM-dd hh:mm:ss') }}
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
          {{ scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="200"
        prop="create_time">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="medium"  @click="goDetail(scope.row.userId)">修改-->
          <!--</el-button>-->
          <div class="flex flex-between">
            <div class="flex0">
              <el-button v-if="!scope.row.user_id" type="text" @click="toDistribute(scope.row.id)">指定给用户
              </el-button>
            </div>
            <div class="flex0">
              <el-button type="text">
                <router-link class="color-link" :to="{name: 'createCouponActivity', params: {id: scope.row.id}}">
                  添加优惠券活动
                </router-link>
              </el-button>
            </div>
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

    <!-- 优惠券指定给用户 -->
    <el-dialog
      title="优惠券指定给用户"
      class=""
      :visible.sync="dialog.distribute"
      :close-on-click-modal="false"
      :append-to-body="true"
      top="10vh"
      width="600px"
    >
      <userInfo :isDialog="true" @chooseUser="(chooseId) => userId = chooseId"></userInfo>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="distribute"
        >确认
        </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import { dateFormat } from '@/utils/'
  import {ENV_URL} from '@/utils/const'
  import request from '@/api/request'
  import pagination from '@/mixins/pagination'

  import avatar from '@/components/avatar'
  import userInfo from '@/views/userInfo/index'

  export default {
    name: 'coupon',
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
        dialog: {
          distribute: false
        },
        couponType: 1,
        userId: 0,
        distributeCouponId: 0,
        searchName: ''
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.get('getCouponList', {
          limit: this.page.pageSize,
          offset: this.page.offset,
          coupon_type: this.couponType,
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.coupon_list
          }).catch(err => {
          console.log(err)
        })
      },
      search() {
        this.init()
      },
      exports() {
        window.location.href = `${ENV_URL.exportCouponInfoByCouponType}?coupon_type=${this.couponType}`
      },
      distribute() {
        request.get('updCouponToUser', {
          coupon_id: this.distributeCouponId,
          user_id: this.userId
        })
          .then(res => {
            this.$message.success('派发成功')
            this.dialog.distribute = false
          }).catch(err => {
          this.$message.error('派发失败')
          console.log(err)
        })
      },
      toDistribute(distributeCouponId) {
        this.dialog.distribute = true
        this.distributeCouponId = distributeCouponId
      },
      addCouponActivity(distributeCouponId) {
        this.dialog.distribute = true
        this.distributeCouponId = distributeCouponId
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
