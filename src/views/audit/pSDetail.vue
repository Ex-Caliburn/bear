<template>
  <div class="audit app-container">
    <div>
      <span class="title">姓名</span>
      <span>{{info.user_name}}</span>
    </div>
    <div>
      <span class="title">状态</span>
      <span>{{info.user_type === 3 ? '待审核' : '研究生'}}</span>
    </div>
    <div>
      <span class="title">电话</span>
      <span>{{info.phone_number}}</span>
    </div>
    <div>
      <span class="title">本科学校</span>
      <span>{{info.school_name}}</span>
    </div>
    <div>
      <span class="title">本科专业</span>
      <span>{{info.major_name}}</span>
    </div>
    <!--<div>-->
      <!--<span class="title">研究生学校</span>-->
      <!--<span>{{userName}}</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<span class="title">研究生专业</span>-->
      <!--<span>{{userName}}</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<span class="title">专业大类</span>-->
      <!--<span>{{majorTypesArr[info.postgraduateMajorTypeId - 1]}}</span>-->
    <!--</div>-->
    <div>
      <span class="title">学位性质</span>
      <span>{{degreesArr[(info.degree_nature + '').slice(0, 1) - 1]}}</span>
    </div>
    <div>
      <span class="title">就读学习方式</span>
      <span>{{studyModesArr[info.study_mode - 1]}}</span>
    </div>
    <div>
      <span class="title">年级</span>
      <span>{{gradesArr[info.grade - 1]}}</span>
    </div>
    <div>
      <span class="title">初试公共科目</span>
      <span class="MR20" v-for=" item in info.public_subject_first">{{item && publicSubjectFirstArr[item - 14].txt}}</span>
    </div>
    <div>
      <span class="title">初试专业科目</span>
      <span>{{info.professional_subject_first}}</span>
    </div>
    <div>
      <span class="title">星级</span>
      <span>{{info.credit_score_status}}</span>
    </div>
    <!--<div>-->
      <!--<span class="title">回答意愿</span>-->
      <!--<span>{{info.answerWill}}</span>-->
    <!--</div>-->
    <div>
      <span class="title">邀请码</span>
      <span>{{info.invite_code}}</span>
    </div>
    <div>
      <span class="title">注册时间</span>
      <span>{{info.created_at | dateFormat("yyyy-MM-dd hh:mm:ss")}}</span>
    </div>
    <div>
      <span class="title">回答耗时</span>
      <span>{{info.avg_answer_time}}</span>
    </div>
    <div>
      <span class="title">信誉分</span>
      <span>{{info.credit_score}}</span>
    </div>
    <div>
      <span class="title">余额</span>
      <span>{{info.amount_count}}</span>
    </div>
    <div>
      <span class="title">拟录取证明图片</span>
      <image-previewer :prePictureList="info.educationPicture"></image-previewer>
    </div>

    <div>
      <span class="title">个性介绍</span>
      <span>{{info.silence}}</span>
    </div>
    <div>
      <span class="title">指导意见</span>
      <span>{{info.opinion}}</span>
    </div>
    <div>
      <span class="title">吸晴问题</span>
      <span>{{info.questionContent}}</span>
    </div>
    <div>
      <span class="title">吸晴回答</span>
      <span>{{info.answerContent}}</span>
    </div>

    <div>
      <el-button v-if="info.user_type === 3" @click="updatePostgraduateStatus" type="primary">通过审核</el-button>
    </div>

  </div>
</template>

<script>
  import ImagePreviewer from '@/components/ImagePreviewer'

  import { dateFormat } from '@/utils/'

  const degreesArr = ['学术型', '专业型']
  const studyModesArr = ['全日制', '非全日制']
  const gradesArr = ['准研究生', '研一', '研二', '研三']
  const publicSubjectFirstArr = [
    {
      'id': 14,
      txt: '政治'
    },
    {
      'id': 15,
      txt: '数学一'
    },
    {
      'id': 16,
      txt: '数学二'
    },
    {
      'id': 17,
      txt: '数学三'
    },
    {
      'id': 18,
      txt: '英语一'
    },
    {
      'id': 19,
      txt: '英语二'
    },
    {
      'id': 20,
      txt: '公共日语'
    },
    {
      'id': 21,
      txt: '管理类联考'
    },
    {
      'id': 22,
      txt: '西医综合'
    }
  ]
  const majorTypesArr = ['哲学', '经济学', '法学', '教育学', '文学', '历史学',
    '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学']
  const willTypes = [
    {
      txt: '院校及专业咨询',
      value: '5',
      choose: false
    },
    {
      txt: '13大学科',
      value: '1',
      choose: false
    },
    {
      txt: '复试科目类问题咨询',
      value: '3',
      choose: false
    },
    {
      txt: '公共科目类',
      value: '2',
      choose: false
    },
    {
      txt: '考研四大选择题与考研规划问题',
      value: '4',
      choose: false
    },
    {
      txt: '专业科目类',
      value: '6',
      choose: false
    }
  ]
  import request from '@/api/request'

  export default {
    name: 'audit',
    components: {
      ImagePreviewer
    },
    filters: {
      dateFormat
    },
    data () {
      return {
        pgUserId: this.$route.query.pgUserId,
        info: {},
        degreesArr,
        studyModesArr,
        gradesArr,
        publicSubjectFirstArr,
        majorTypesArr,
        willTypes
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        request.get('getPostgraduateDetailInfoByUserId', {
          pgUserId: this.pgUserId
        })
          .then(res => {
            res.educationPicture = res.education_pictures ? res.education_pictures.split(',') : []
            res.public_subject_first = res.public_subject_first ? res.public_subject_first.split(',') : []
            this.info = res
          }).catch(err => {
            console.log(err)
          })
      },
      updatePostgraduateStatus () {
        request.get('updatePostgraduateStatus', {
          pgUserId: this.pgUserId
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
  .audit{
    div{
      margin: 20px 0;
      .title{
        color: #3c4856;
        display: inline-block;
        min-width:150px ;
        margin-right: 50px;
        text-align: right;
      }
      span{
        color: #8b97a4;
      }
    }
  }

</style>
