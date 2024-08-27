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
      color: #b6b5b5;
    }
  }
}
</style>
