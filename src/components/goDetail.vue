<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-21 11:06:27
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-21 11:45:57
 * @FilePath: \my-project\src\components\goDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number,
  },
  methods: {
    handleClick() {
      getApp().globalData.list = this.list;
      getApp().globalData.index = this.index;
      uni.navigateTo({ url: "/pages/picDetail" });
    },
  },
  mounted() {},
};
</script>

<style></style>
