<template>
  <div class="custom-pagination" v-show="page.totalCount > 0">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :background="page.background"
      :page-sizes="limitRange"
      :page-size="page.limit"
      :layout="layout"
      :total="page.totalCount"
    >
      <slot name="slotRight"></slot>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      limit: {
        type: Number,
        default: 10
      },
      offset: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 1
      },
      totalCount: {
        type: Number,
        default: 0
      },
      search_name: {
        type: String,
        default: ''
      }
    },
    pageJump: {
      type: Function,
      default: null
    },
    layout: {
      type: String,
      default: '->, total, sizes, prev, pager, next, jumper, slot'
    },
    limitRange: {
      type: Array,
      default: () => [10, 20, 50]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.limit = val
      this.page.current = 1
      this.page.offset = 0
      this.pageJump()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.page.offset = (val - 1) * this.page.limit
      this.pageJump()
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-pagination {
  text-align: right;
}
</style>
