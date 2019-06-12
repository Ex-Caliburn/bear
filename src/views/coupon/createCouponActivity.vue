<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px" class="form">
      <el-form-item label="类型">
        <el-radio-group v-model="form.coupon_type" :disabled="Boolean(id)">
          <el-radio :label="1">折扣券</el-radio>
          <el-radio :label="2">免费体验券</el-radio>
          <el-radio :label="3">现金体验券</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动类型">
        <el-radio-group v-model="form.activity_type">
          <el-radio :label="1">系统活动</el-radio>
          <el-radio :label="2">特定活动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.coupon_name"></el-input>
      </el-form-item>

      <el-form-item label="折扣金额">
        <el-input-number :disabled="Boolean(id)" v-model="form.coupon_money" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="活动图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.activity_image" :src="form.activity_image | getMediaPath('picture')" class="uploader-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.coupon_remarks"></el-input>
      </el-form-item>

      <el-form-item label="优惠券有效时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.couponTime"
            type="datetimerange"
            value-format="yyyy-MM-ddTHH:mm:ss+08:00"
            range-separator="至"
            start-placeholder="开始日期"
            :picker-options="{
              disabledDate: time => time < new Date()
            }"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="活动有效时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.activityTime"
            type="datetimerange"
            value-format="yyyy-MM-ddTHH:mm:ss+08:00"
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
  import request from '@/api/request'
  import {ENV_URL} from '@/utils/const'
  import pagination from '@/mixins/pagination'
  import { dateFormat } from '@/utils/'

  import avatar from '@/components/avatar'

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
        uploadImage: window.location.origin +  ENV_URL.uploadImage,
        searchName: '',
        form: {
          coupon_type: 1,
          activity_type: 2,
          coupon_money: '',
          coupon_name: '',
          coupon_remarks: '',
          coupon_start_period: '',
          coupon_end_period: '',
          activity_end_time: '',
          activity_start_time: '',
          activity_image: '',
          couponTime: [],
          activityTime: [],
        }
      }
    },
    mounted() {
      if (this.id) {
        this.init()
      }
    },

    methods: {
      init() {
        request.get('getCouponActivityInfoById', {activity_id: this.id})
          .then(res => {
            this.form = Object.assign(this.form, res)
            this.form.couponTime = [res.coupon_start_period, res.coupon_end_period]
            this.form.activityTime = [res.activity_start_time, res.activity_end_time]
          }).catch(err => {
          console.log(err)
          this.$message.error(err)
        })
      },
      submit() {
        if (!this.form.couponTime.length || !this.form.activityTime.length) {
          this.$message.error('请设置日期')
        }
        this.form.coupon_start_period = this.form.couponTime[0]
        this.form.coupon_end_period = this.form.couponTime[1]
        this.form.activity_start_time = this.form.activityTime[0]
        this.form.activity_end_time = this.form.activityTime[1]

        if (this.id) {
          let params = Object.assign({ id: this.id }, this.form)
          delete params.coupon_money
          request.post('updCouponActivity', params)
            .then(res => {
              this.$message.success('更新成功')
              this.routePush('couponActivityList')
            }).catch(err => {
            console.log(err)
            this.$message.error(err)
          })
        } else {
          request.post('addCouponActivity', this.form)
            .then(res => {
              this.$message.success('创建成功')
              this.routePush('couponActivityList')
            }).catch(err => {
            console.log(err)
            this.$message.error(err)
          })
        }
      },
      handleAvatarSuccess(res, file) {
        this.form.activity_image = res.data.image_url
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
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

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .uploader-img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
