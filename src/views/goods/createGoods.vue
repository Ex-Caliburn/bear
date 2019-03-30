<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="80px" class="form">

      <el-form-item label="	名称">
        <el-input v-model="form.goods_name"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.goods_type" :disabled="Boolean(id)">
          <el-radio :label="1">鞋子</el-radio>
          <el-radio :label="2">包</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="价格">
        <el-input-number v-model="form.goods_price" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="原价">
        <el-input-number v-model="form.goods_original_price" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.goods_image" :src="form.goods_image" class="uploader-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
          goods_type: 1,
          goods_name: '',
          goods_price: 0,
          goods_original_price: 0,
          goods_image: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        // todo
        // this.init()
      }
    },

    methods: {
      init() {
        request.post('getGoodsInfo', this.id)
          .then(res => {
            this.form = res
          }).catch(err => {
          console.log(err)
          this.$message.error(err)
        })
      },
      submit() {
        if (this.id) {
          request.post('updateGoodsInfo', { ...this.form, goods_id: this.id })
            .then(res => {
              this.$message.success('更新成功')
              this.routePush('goods')
            }).catch(err => {
            console.log(err)
            this.$message.error(err)
          })
        } else {
          request.post('addGoodsInfo', this.form)
            .then(res => {
              this.$message.success('新建成功')
              this.routePush('goods')
            }).catch(err => {
            console.log(err)
            this.$message.error(err)
          })
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
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
