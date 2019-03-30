<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="类型">
        <el-radio-group v-model="form.coupon_type">
          <el-radio :label="1">折扣券</el-radio>
          <el-radio :label="2">免费体验券</el-radio>
          <el-radio :label="3">现金体验券</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.coupon_name"></el-input>
      </el-form-item>

      <el-form-item label="折扣金额">
        <el-input-number v-model="form.coupon_money" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="数量">
        <el-input-number v-model="form.coupon_number" :min="1"></el-input-number>
        <!--<el-input v-model="form.coupon_number"></el-input>-->
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.coupon_remarks"></el-input>
      </el-form-item>

      <el-form-item label="使用时间">
        <!--<el-date-picker-->
        <!--v-model="value4"-->
        <!--type="datetimerange"-->
        <!--range-separator="至"-->
        <!--start-placeholder="开始日期"-->
        <!--end-placeholder="结束日期">-->
        <!--</el-date-picker>-->


        <el-col :span="11">
          <el-date-picker
            v-model="form.couponTime"
            type="datetimerange"
            value-format="yyyy-MM-ddTHH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            :picker-options="{
              disabledDate: time => time < new Date()
            }"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">{{ id ? '确认修改' : '立即创建' }}</el-button>
      </el-form-item>
    </el-form>

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
    data() {
      return {
        id: parseInt(this.$route.params.id, 10) || 0,
        searchName: '',
        form: {
          coupon_type: 1,
          coupon_money: '',
          coupon_number: 1,
          coupon_name: '',
          coupon_remarks: '',
          coupon_start_period: '',
          coupon_end_period: '',
          couponTime: [],
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.init()
      }
    },

    methods: {
      init() {
      },
      submit() {
        if (!this.form.couponTime.length) {
          this.$message.error('请选择日期')
        }
        this.form.coupon_start_period = this.form.couponTime[0] + '+08:00'
        this.form.coupon_end_period = this.form.couponTime[1] + '+08:00'
        request.post('addCouponInfo', this.form)
          .then(res => {
            this.routePush('coupon')
          }).catch(err => {
          console.log(err)
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    width: 600px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
