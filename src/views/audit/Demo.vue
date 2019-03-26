<template>
  <div>
    <el-table
      :data="tableData"
      header-cell-class-name="table-header-cell"
      cell-class-name="table-cell-class"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="客户名称"
        :show-overflow-tooltip="true"
        width="180">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :width="160"
        label="其他优惠">
        <template slot-scope="scope">
          <span>{{scope.row.name || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        :width="120">
        <template slot-scope="scope">
          <el-button
            type="text">
            通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
  export default {
    name: 'demo',
    components: {},
    filters: {},
    mixins: {},
    props: {},
    data () {
      const item = {
        date: '上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路',
        name: '王小虎',
        time: '2018-08-09 23:21:00',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      return {
        searchKey: '',
        payNum: 123,
        tableData: Array(10).fill(item)
      }
    },

    computed: {},
    watch: {},
    mounted () {

    },

    methods: {
      openPicker () {
        this.$refs.picker.open()
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 私有样式
</style>
