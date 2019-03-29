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
        <el-input v-model="form.coupon_money"></el-input>
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
          <el-date-picker type="datetime" :picker-options="{
              disabledDate: time => time < new Date()
            }" value-format="yyyy-MM-ddTHH:mm:ss+08:00" placeholder="选择日期" v-model="form.coupon_start_period"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" :picker-options="{
              disabledDate: time => time < new Date()
            }" value-format="yyyy-MM-ddTHH:mm:ss+08:00" placeholder="选择时间" v-model="form.coupon_end_period"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
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
        searchName: '',
        form: {
          coupon_type: 1,
          coupon_money: '',
          coupon_number: 1,
          coupon_name: '',
          coupon_remarks: '',
          coupon_start_period: '',
          coupon_end_period: '',
        }
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        request.post('addCouponInfo', this.form)
          .then(res => {
          }).catch(err => {
          console.log(err)
        })
      },
      submit() {
        request.post('addCouponInfo', this.form)
          .then(res => {
          }).catch(err => {
          console.log(err)
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
