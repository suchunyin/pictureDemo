<template>
  <scroll-view
    scroll-y
    class="new-content"
    @scrolltolower="handleToLower"
    enable-flex
  >
    <view class="item" v-for="(item, index) in newList" :key="item.id">
      <go-detail :list="newList" :index="index">
        <image mode="aspectFill" :src="item.thumb"></image>
      </go-detail>
    </view>
  </scroll-view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components: { goDetail },
  data() {
    return {
      recommendList: [],
      monthList: {},
      newList: [],
      params: { limit: 30, skip: 0 },
      pageCount: 0,
      more: true,
    };
  },
  methods: {
    getList() {
      if (!this.more) {
        uni.showToast({ title: "没有数据了", icon: "none" });
        return;
      }
      this.params.skip = this.params.limit * this.pageCount;
      this.api.getHomeNewList(this.params).then((res) => {
        this.newList = [...this.newList, ...res.res.vertical];
        this.pageCount++;
        if (res.res.vertical < this.params.limit) this.more = false;
      });
    },

    handleToLower() {
      this.getList();
    },
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "最新" });
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.new-content {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 60px);
  .item {
    width: calc(33.33% - 3rpx * 2);
    border: 3rpx solid #fff;

    image {
      width: 100%;
      height: 360rpx;
    }
  }
}
</style>
