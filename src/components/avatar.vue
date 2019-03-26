<template>
  <img :src="src">
</template>

<script>
  export default {
    name: 'avatar',
    filters: {},
    props: {
      pictureSrc: {
        type: '',
        required: true
      }
    },
    data () {
      return {
        domain: 'https://kyls-test.oss-cn-hangzhou.aliyuncs.com/',
        src: ''
      }
    },
    mounted () {
      let url = this.pictureSrc
      this.src =  (url && url.indexOf('//wx') < 0 && url.indexOf('kyls-test') < 0) ? (this.domain + url) : url
      }
  }
</script>
