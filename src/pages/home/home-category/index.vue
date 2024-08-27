<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-15 13:39:18
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-27 15:23:26
 * @FilePath: \my-project\src\pages\home\home-recommend\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="category-wrap">
      <navigator
        class="item"
        v-for="item in list"
        :key="item.id"
        :url="`/pages/categoryDetail?id=${item.id}&type=vertical`"
      >
        <image mode="aspectFill" src="item.cover"> </image>
        <text class="name">{{ item.name }}</text>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getList() {
      this.api.getHomeCategory().then((res) => {
        this.list = res.res.category;
      });
    },
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "分类" });
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.category-wrap {
  padding: 10rpx;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: calc(33.33vw - 3rpx * 3);
    height: calc(33.33vw - 3rpx * 3);
    position: relative;
    image {
      width: 100%;
      height: 100%;
    }

    .name {
      position: absolute;
      width: 90%;
      bottom: 30rpx;
      left: 30rpx;
      padding: 0 10rpx;
      font-size: 36rpx;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>
