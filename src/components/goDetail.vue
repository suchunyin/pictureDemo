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
