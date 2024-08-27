<template>
  <scroll-view scroll-y class="album-content" @scrolltolower="hanaleToLower">
    <view class="album-swiper">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in bannerList" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="album-list">
      <navigator
        class="item"
        v-for="item in albumList"
        :key="item.id"
        :url="`/pages/home/home-album/albumDetail?id=${item.id}`"
      >
        <image mode="aspectFill" :src="item.cover"></image>
        <view class="item-info">
          <i class="title">{{ item.name }}</i
          ><br />
          <i class="desc">{{ item.desc }}</i
          ><br />
          <view class="btn"> <view class="attention">+ 关注</view> </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      params: { limit: 10, skip: 0 },
      bannerList: [],
      albumList: [],
      pageCount: 0,
      pageMore: true,
    };
  },
  methods: {
    getList() {
      if (this.pageCount === 0)
        this.api.getHomeAlbumBanner().then((res) => {
          this.bannerList = res.data;
        });
      if (!this.pageMore) {
        uni.showLoading({ title: "没有下一页了", icon: "none" });
        return;
      }
      this.params.skip = this.params.limit * this.pageCount;
      this.api.getHomeAlbumList(this.params).then((res) => {
        if (res.res.album.length < this.params.limit) this.pageMore = false;
        this.albumList = [...this.albumList, ...res.res.album];
        this.pageCount += 1;
      });
    },
    hanaleToLower() {
      this.getList();
    },
  },

  mounted() {
    uni.setNavigationBarTitle({ title: "专辑" });
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.album-content {
  height: calc(100vh - 60px);
}
.album-swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.album-list {
  padding: 10rpx;
  .item {
    height: 200rpx;
    display: flex;
    padding: 10rpx 0;
    font-size: 30rpx;
    overflow: hidden;
    border-bottom: 1px solid #999;

    image {
      width: 30%;
      height: 100%;
    }

    .item-info {
      width: 70%;
      padding-inline: 20rpx;

      i.title {
        padding: 10rpx;
      }

      i.desc {
        padding: 10rpx;
        font-size: 20rpx;
        color: #666;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .btn {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .attention {
          padding: 10rpx;
          color: $color;
          font-size: 25rpx;
          border: 1px solid $color;
        }
      }
    }
  }
}
</style>
