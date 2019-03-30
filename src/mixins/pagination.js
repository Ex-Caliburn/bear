/*
 * 分页抽离出公共方法
 * */
export default {
  data () {
    return {
      page: {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        pageNum: 1,
        offset: 0
      },
      totalCount: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.pageSize = val
      this.page.pageNum = 1
      this.page.offset = 0
      this.jumpPage()
    },
    handleCurrentChange (val) {
      this.page.pageNum = val
      this.page.offset = (val - 1) * this.page.pageSize
      this.jumpPage(val)
    }
  }
}
