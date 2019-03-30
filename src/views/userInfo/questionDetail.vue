<template>
  <div class="audit app-container">
    <div>
      <h3>问题</h3>
      <div>
        <span>提问人:{{info.questionerName}}</span>
        <!--<span>{{info.questionCreatedAt}}</span>-->
      </div>
      <div>{{info.questionContent}}</div>
      <image-previewer :prePictureList="info.questionPic"></image-previewer>
    </div>
    <div>
      <h3>答案</h3>
      <div>
        <span>回答者:{{info.answerName}}</span>
      </div>
      <div>{{info.answerContent}}</div>
      <image-previewer :prePictureList="info.answerPic"></image-previewer>
    </div>

    <el-button v-if="questionType === 4" @click="checkRewardQuestion" type="primary">通过审核</el-button>

  </div>
</template>

<script>
  import ImagePreviewer from '@/components/ImagePreviewer'
  import request from '@/api/request'

  export default {
    name: 'questionDetail',
    components: {
      ImagePreviewer
    },
    directives: {},
    data() {
      return {
        questionId: Number(this.$route.query.questionId),
        questionType: Number(this.$route.query.questionType),
        info: {}
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        request.get('getQuestionDetail', {
          questionId: this.questionId
        })
          .then(res => {
            res.answerPic = res.answerPic ? res.answerPic.split(',') : []
            res.questionPic = res.questionPic ? res.questionPic.split(',') : []
            this.info = res
          }).catch(err => {
          console.log(err)
        })
      },
      checkRewardQuestion() {
        request.get('checkRewardQuestion', {
          questionId: this.questionId,
          status: 0
        }).then(res => {
          this.$message.success('审核成功')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .audit {
    padding: 20px;

    div {
      margin: 20px 0;

      .title {
        color: #3c4856;
        display: inline-block;
        min-width: 150px;
        margin-right: 50px;
        text-align: right;
      }

      span:last-child {
        color: #8b97a4;
      }
    }
  }

</style>
