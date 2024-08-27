<template>
  <scroll-view
    scroll-y
    class="content"
    @scrolltolower="handleToLower"
    v-if="recommendList.length > 0"
  >
    <!-- 推荐 -->
    <view class="recommend-wrap">
      <navigator
        class="item"
        v-for="item in recommendList"
        :key="item.id"
        :url="`/pages/home/home-album/albumDetail?id=${item.id}`"
      >
        <image mode="aspectFill" :src="item.cover"></image>
      </navigator>
    </view>

    <!-- 月份 -->
    <view class="month-wrap">
      <view class="month-header">
        <view class="month-header-left">
          <view class="left-info">
            <text class="day">{{ monthList.DD }}</text>
            /{{ monthList.MM }} 月
          </view>
          <view class="left-text">{{ monthList.title }}</view>
        </view>
        <view class="month-header-right">更多 ></view>
      </view>
      <view class="month-content">
        <view class="item" v-for="item in monthList.items" :key="item.id">
          <image mode="aspectFill" :src="item.thumb"></image>
        </view>
      </view>
    </view>

    <!-- 热门 -->
    <view class="hot-wrap">
      <view class="hot-header">
        <text>热门</text>
      </view>
      <view class="hot-content">
        <view class="item" v-for="(item, index) in hotList" :key="item.id">
          <go-detail :list="hotList" :index="index">
            <image mode="aspectFill" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail";
export default {
  components: { goDetail },
  data() {
    return {
      recommendList: [],
      monthList: {},
      hotList: [],
      hotPageCount: 0,
      hotMore: true,
    };
  },
  methods: {
    init() {
      this.api.getHomepage().then((res) => {
        this.recommendList = res.data.homepage.rec;

        this.monthList = res.data.homepage.monthObj;
        this.monthList.MM = moment(this.monthList.stime).format("MM");
        this.monthList.DD = moment(this.monthList.stime).format("DD");
      });
      this.api.getHomeHotList({ limit: 10, skip: 0 }).then((res) => {
        this.hotList = res.res.vertical;
        this.hotPageCount += 1;
      });
    },

    handleToLower() {
      if (!this.hotMore) {
        uni.showToast({ title: "没有内容了", icon: "none" });
        return;
      }
      this.api
        .getHomeHotList({ limit: 10, skip: this.hotPageCount * 10 })
        .then((res) => {
          this.hotList = [...this.hotList, ...res.res.vertical];
          this.hotPageCount += 1;
          if (res.res.vertical.length < 30) this.hotMore = false;
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 60px);
}
.recommend-wrap {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: calc(50% - 5rpx * 2);
    // border: 5rpx solid #fff;
    border: 5rpx solid #fff;

    image {
      width: 100%;
      height: 200rpx;
    }
  }
}
.month-wrap {
  .month-header {
    display: flex;
    justify-content: space-between;
    padding-inline: 20rpx;
    .month-header-left {
      display: flex;
      .left-info {
        color: $color;
        font-size: 30rpx;
        font-weight: 600;
        .day {
          font-size: 34rpx;
        }
      }

      .left-text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .month-header-right {
      color: $color;
      font-size: 30rpx;
    }
  }

  .month-content {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: calc(33.33% - 3rpx * 2);
      border: 3rpx solid #fff;

      image {
        width: 100%;
        height: 360rpx;
      }
    }
  }
}
.hot-wrap {
  .hot-header {
    padding-inline: 20rpx;
    text {
      font-size: 34rpx;
      font-weight: 600;
      border-left: 15rpx solid $color;
    }
  }
  .hot-content {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: calc(33.33% - 3rpx * 2);
      border: 3rpx solid #fff;

      image {
        width: 100%;
        height: 360rpx;
      }
    }
  }
}
</style>
