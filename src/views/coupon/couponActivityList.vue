<template>
  <div class="app-container">
    <div class="flex flex-between MB20">
      <el-button type="primary">
        <router-link :to="{name: 'createCouponActivity', params: {id:0}}">添加优惠券活动</router-link>
      </el-button>
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
      <!--<el-table-column-->
        <!--label="优惠码"-->
        <!--width="100"-->
        <!--prop="promotion_code">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="优惠券密码"-->
        <!--width="100"-->
        <!--prop="promotion_pwd">-->
      <!--</el-table-column>-->
      <el-table-column
        label="优惠券类型"
        width="100"
        prop="coupon_type">
        <template slot-scope="scope">
          {{ couponTypeArr[scope.row.coupon_type-1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠金额"
        width="100"
        prop="coupon_money">
      </el-table-column>

      <el-table-column
        label="邀请人数限制"
        width="110"
        prop="invite_num">
      </el-table-column>

      <el-table-column
        label="受邀请人优惠券金额"
        width="140"
        prop="invite_user_money">
        <template slot-scope="scope">
          {{ scope.row.invite_user_money ? '冻结' : '正常'  }}
        </template>
      </el-table-column>

      <el-table-column
        label="商品图片"
        width="100"
        prop="activity_image">
        <template slot-scope="scope">
          <image-previewer class="img-in-table" :prePictureList="[scope.row.activity_image || '']"></image-previewer>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="100"
        prop="coupon_status">
        <template slot-scope="scope">
          {{ scope.row.coupon_status ? '冻结' : '正常'  }}
        </template>
      </el-table-column>

      <el-table-column
        label="活动类型"
        width="100"
        prop="coupon_status">
        <template slot-scope="scope">
          {{ ['', '特定活动', '系统活动', '红包瓜分活动', '支付完成后的活动'][scope.row.activity_type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="优惠券活动开始时间"
        width="150"
        prop="invite_code">
        <template slot-scope="scope">
          {{scope.row.activity_start_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠券活动结束时间"
        width="150"
        prop="coupon_status">
        <template slot-scope="scope">
          {{ scope.row.activity_end_time | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠券开始时间"
        width="150"
        prop="invite_code">
        <template slot-scope="scope">
          {{scope.row.coupon_start_period | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="优惠券结束时间"
        width="150"
        prop="coupon_status">
        <template slot-scope="scope">
          {{ scope.row.coupon_end_period | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="150"
        prop="create_time">
        <template slot-scope="scope">
          {{ scope.row.created_at | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="150"
        prop="create_time">
        <template slot-scope="scope">
          {{ scope.row.update_at | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="备注"
        width="150"
        prop="coupon_remarks">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        fixed="right"
        prop="create_time">
        <template slot-scope="scope">
          <router-link class="color-link" :to="{name: 'createCouponActivity', params: {id:scope.row.id}}">修改</router-link>

          <a v-if="scope.row.activity_type===2" :href="qRCodePrefix + scope.row.id " download="二维码" class="color-link" target="_blank">二维码</a>
          <!--<el-popover v-if="scope.row.activity_type=2" placement="bottom" trigger="hover">-->
            <!--<img style="width: 200px" :src="qRCodePrefix + scope.row.id " alt="" />-->
            <!--<el-button type="text" slot="reference">二维码</el-button>-->
          <!--</el-popover>-->

          <a v-if="scope.row.activity_type===2" :href="ExportActivityInfo + + scope.row.id" target="_blank" class="color-link">导出活动详情</a>
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
  import pagination from '@/mixins/pagination'
  import { dateFormat } from '@/utils/'

  import avatar from '@/components/avatar'
  import ImagePreviewer from '@/components/ImagePreviewer'

  export default {
    name: 'invite',
    components: {
      avatar,
      ImagePreviewer,
    },
    filters: {
      dateFormat
    },
    mixins: [pagination],
    directives: {},
    data() {
      return {
        couponTypeArr: ['折扣券', '免费体验券', '现金体验券'],
        tableData: [],
        couponType: 1,
        qRCodePrefix: window.location.origin + '/api/Image/GetMiniAppQRCode?scene=b',
        ExportActivityInfo: window.location.origin + '/api/CouponActivity/ExportActivityInfo?activity_id=',
        searchName: ''
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.get('getCouponActivityList', {
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
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
