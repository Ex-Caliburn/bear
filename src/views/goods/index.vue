<template>
  <div class="app-container">

    <div class="MB20">
      <el-button type="primary">
        <router-link :to="{name: 'createGoods',params: {id: 0}}">新建商品</router-link>
      </el-button>
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
        label="类型"
        width="100"
        prop="goods_type">
        <template slot-scope="scope">
          {{scope.row.goods_type === 1 ? '鞋子' : '包'}}
        </template>

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
        label="清洁类型"
        width="100"
        prop="goods_type">
        <template slot-scope="scope">
          {{scope.row.is_basic_service === 1 ? '基础清洁' : '非基础清洁'}}
        </template>

      </el-table-column>
      <el-table-column
        label="商品图片"
        width="100"
        prop="goods_image">
        <template slot-scope="scope">
          <image-previewer class="img-in-table" :prePictureList="[scope.row.goods_image || '']"></image-previewer>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="150"
        prop="update_at">
        <template slot-scope="scope">
          {{scope.row.update_at | dateFormat('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="150"
        prop="created_at">
        <template slot-scope="scope">
          {{ scope.row.created_at | dateFormat('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
        prop="create_time">
        <template slot-scope="scope">
          <div class="flex flex-between flex-align-center">
            <el-button type="text" @click="deleteGood(scope.row.goods_id)">删除
            </el-button>
            <router-link class="color-link" :to="{name: 'createGoods',params: {id: scope.row.goods_id}}">更新
            </router-link>
          </div>

        </template>
      </el-table-column>
    </el-table>

    <!-- 暂时不需要 -->
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="page.pageNum"-->
      <!--:page-sizes="page.pageSizes"-->
      <!--:page-size="page.pageSize"-->
      <!--layout="->, sizes, prev, pager, next, jumper"-->
      <!--:total="totalCount">-->
    <!--</el-pagination>-->
  </div>

</template>

<script>
  import { dateFormat } from '@/utils/'
  import request from '@/api/request'
  import pagination from '@/mixins/pagination'

  import avatar from '@/components/avatar'
  import ImagePreviewer from '@/components/ImagePreviewer'

  export default {
    name: 'goods',
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
        tableData: [],
        couponType: 1,
        searchName: ''
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.get('getGoodsList', {
          limit: this.page.pageSize,
          offset: this.page.offset,
        })
          .then(res => {
            this.totalCount = res.count
            // this.tableData = res.data
            this.tableData = res
          }).catch(err => {
          console.log(err)
        })
      },
      search() {
        this.init()
      },
      jumpPage() {
        this.init()
      },
      deleteGood(goods_id) {
        request.get('delGoodsInfo', {
          goods_id
        })
          .then(res => {
            this.init()
            this.$message.success('删除成功')
          }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
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
