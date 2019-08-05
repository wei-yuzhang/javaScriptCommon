<template>
  <!-- 图片预览 -->
  <div>
    测试组件
    <el-button @click="handleClick">图片预览</el-button>
    <imagePreview
      :isShow="isShow"
      :count="count"
      :imageData="imageData"
      @close="handleClose"></imagePreview>
  </div>
</template>

<script>
  import imagePreview from '../components/imagePreview/src/imagePreview.vue'
  export default {
    data () {
      return {
        count: 1,        // 下标
        // 图片数据集合
        imageData: [
          require('../assets/image/001.jpg'),
          require('../assets/image/002.jpg'),
          require('../assets/image/003.jpg'),
          require('../assets/image/004.jpg'),
          require('../assets/image/005.jpg'),
          require('../assets/image/006.jpg'),
          require('../assets/image/007.jpg'),
          require('../assets/image/008.jpg')
        ], 
        isShow: false // 是否显示原图
      }
    },

    created () {
    },

    components: {
      imagePreview
    },

    methods: {
      handleClick: function () {
        this.isShow = true
      },

      // 关闭图片预览的方法
      handleClose: function () {
        this.isShow = false
      }
    }
  }
</script>