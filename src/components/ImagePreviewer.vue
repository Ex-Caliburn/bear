<template>
  <div class="image-previewer">
    <ul class="flex flex-wrap ul-reset">
      <li v-for="(pictureSrc, pictureIndex) in prePictureList" :key="pictureSrc">
        <img
          :style="{'max-height': height + 'px'}"
          class="small-picture"
          :src="domain + pictureSrc"
          @click="preImg(pictureIndex)">
      </li>
    </ul>
    <div class="img-mask" v-if="preview">
      <div class="img-mask-box" @click.self="hidePreview">
        <div class="img-mask-top flex flex-between flex-align-center MR20">
          <span>{{currentIndex + 1}}/{{prePictureList.length}}</span>
          <div class="flex flex-around flex-align-center" style="min-width: 400px">
            <i :class="(sIndex<5?'':'disabled-big') + ' el-icon-zoom-in'" @click="updatePreview('big')"></i>
            <span class="scale">{{scaleTxt}}%</span>
            <i :class="(sIndex>-4?'':'disabled-small') + ' el-icon-zoom-out'" @click="updatePreview('small')"></i>
            <i class="rotate-right el-icon-refresh" @click="updatePreview('left')"></i>
            <i class="rotate-left el-icon-refresh revert" @click="updatePreview('right')"></i>
            <a :href="domain + prePictureList[currentIndex]" :download="domain + prePictureList[currentIndex]">
              <i class="el-icon-download"></i>
            </a>
            <i class="el-icon-close" @click="hidePreview"></i>
          </div>
        </div>
        <img ref="img" :src="domain + prePictureList[currentIndex]">
        <div v-if="currentIndex > 0" class="left arrow" @click="updatePreview('-')"> <</div>
        <div v-if="currentIndex < prePictureList.length - 1" class="right arrow" @click="updatePreview('+')"> ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'image-previewer',
    filters: {},
    props: {
      prePictureList: {
        type: Array,
        required: true,
        default () {
          return []
        }
      },
      width: {
        type: Number,
        default: 150
      },
      height: {
        type: Number,
        default: 150
      }
    },
    data () {
      return {
        domain: 'https://kyls-test.oss-cn-hangzhou.aliyuncs.com/',
        currentIndex: null,
        preview: false,
        scale: 0.2,
        rotate: 90,
        rIndex: 0,
        sIndex: 0,
        scaleTxt: 100,
        imgW: 0
      }
    },
    watch: {
      preview (val) {
        document.getElementsByTagName('body')[0].style.overflow = val ? 'hidden' : 'auto'
      },
      sIndex (s) {
        this.scaleTxt = 100 + (s * 20)
      }
    },
    methods: {
      preImg (pictureIndex) {
        this.currentIndex = pictureIndex
        this.preview = true
      },
      hidePreview () {
        this.preview = false
      },
      clearStyle () {
        this.$refs.img.style.width = ''
        this.$refs.img.style.transform = ''
        this.rIndex = 0
        this.sIndex = 0
        this.imgW = 0
      },
      zoomStyle (i) {
        if ((i > 0 && this.sIndex) > 4 || (i < 0 && this.sIndex <= -4)) {
          return
        }
        this.sIndex = this.sIndex + i
        if (this.imgW === 0) {
          this.imgW = this.$refs.img.width
        }
        this.$refs.img.style.width = this.imgW * (1 + (this.scale * this.sIndex)) + 'px'
      },
      rotateStyle () {
        this.$refs.img.style.transform = 'rotate(' + this.rIndex * this.rotate + 'deg)'
      },
      updatePreview (s) {
        switch (s) {
          case '+':
            this.currentIndex++
            this.clearStyle()
            break
          case '-':
            this.currentIndex--
            this.clearStyle()
            break
          case 'big':
            this.zoomStyle(1)
            break
          case 'small':
            this.zoomStyle(-1)
            break
          case 'left':
            this.rIndex--
            this.rotateStyle()
            break
          case 'right':
            this.rIndex++
            this.rotateStyle()
            break
          default:
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  .revert {
    transform: scaleY(-1);
  }

  i {
    font-size: 40px;
    color: white;
  }

  .image-previewer {
    .ul-reset {
      padding: 0;
    }
    & > ul {
      display: flex;
      flex-wrap: wrap;
      & > li {
        line-height: 0;
        margin-right: 5px;
        margin-bottom: 5px;
        flex: none;
        overflow: hidden;
      }
    }
    .small-picture {
      cursor: zoom-in;
    }
    .img-mask {
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9998;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
      .img-mask-box {
        width: 100vw;
        height: 100vh;
        text-align: center;
        z-index: 9999;
        display: table-cell;
        vertical-align: middle;
        .img-mask-top {
          padding: 0 20px;
          box-sizing: border-box;
          width: 100%;
          height: 7vh;
          background-color: rgba(0, 0, 0, 0.3);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
          .scale {
            width: 50px;
            text-align: center;
            font-size: 20px;
          }
        }
        img {
          margin: auto;
          opacity: 1;
          z-index: 9999;
          vertical-align: middle;
        }
        .arrow {
          width: 30px;
          height: 64px;
          text-align: center;
          line-height: 64px;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          top: 50%;
          margin-top: -32px;
          z-index: 10000;
          color: #fff;
          cursor: pointer;
        }
        .arrow:hover {
          background-color: rgba(0, 0, 0, 0.6);
        }
        .left {
          left: 0;
          border-radius: 0px 4px 4px 0px;
        }
        .right {
          right: 0;
          border-radius: 4px 0px 0px 4px;
        }
      }
    }
  }

</style>
