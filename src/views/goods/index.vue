<template>
  <div class="app-container">

    <div>
      <router-link :to="{name: 'createGood',params: {id: 0}}">生成优惠券</router-link>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        label="商品名称"
        width="150"
        prop="goods_name">
      </el-table-column>
      <el-table-column
        label="价格"
        width="100"
        prop="goods_price">
      </el-table-column>
      <el-table-column
        label="原价"
        width="100"
        prop="goods_original_price">
      </el-table-column>
      <el-table-column
        label="类型"
        width="100"
        prop="goods_type">
      </el-table-column>
      <el-table-column
        label="商品图片"
        width="100"
        prop="goods_image">
        <template slot-scope="scope">
          <img src="scope.row.goods_image" alt="">
        </template>
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

      <el-table-column
        label="操作"
        width="100"
        prop="create_time">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" class="cur-pointer" @click="deleteGood(scope.row.goods_id)">删除
          </el-button>
          <router-link :to="{name: 'createGood',params: {id: scope.row.goods_id}}">更新</router-link>
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
        request.get('getGoodsList', {
          limit: this.page.pageSize,
          offset: this.page.pageNum,
        })
          .then(res => {
            this.totalCount = res.count
            this.tableData = res.data
          }).catch(err => {
          console.log(err)
        })
      },
      search () {
        this.init()
      },
      jumpPage () {
        this.init()
      },
      deleteGood (goods_id) {
        request.get('delGoodsInfo', {
          goods_id
        })
          .then(res => {
          }).catch(err => {
          console.log(err)
        })
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
