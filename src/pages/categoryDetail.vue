<template>
  <view>
    <view class="cate-tab-title">
      <view class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          @clickItem="handleTabClick"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
      </view>
    </view>
    <view class="cate-tab-content">
      <scroll-view
        scroll-y
        class="list-wrap vertical"
        @scrolltolower="handleToLower"
        enable-flex
        v-if="type === 'vertical'"
      >
        <view class="item" v-for="(item, index) in list" :key="item.id">
          <go-detail :list="list" :index="index">
            <image mode="aspectFill" :src="item.thumb"></image>
          </go-detail>
        </view>
      </scroll-view>
      <scroll-view
        scroll-y
        class="list-wrap video"
        @scrolltolower="handleToLower"
        enable-flex
        v-if="type === 'video'"
      >
        <navigator
          class="item"
          v-for="item in list"
          :key="item.id"
          :url="`/pages/video/videoPlay?item=${encodeURIComponent(
            JSON.stringify(item)
          )}`"
        >
          <image mode="aspectFill" :src="item.img"></image>
        </navigator>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components: { goDetail },
  data() {
    return {
      type: "",
      items: ["最新", "热门"],
      current: 0,
      list: [],
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
      this.params.order = this.current === 0 ? "new" : "hot";
      switch (this.type) {
        case "vertical":
          this.api.getHomeCategoryWallpaper(this.params).then((res) => {
            this.list = [...this.list, ...res.res.vertical];
            this.pageCount++;
            if (res.res.vertical < this.params.limit) this.more = false;
          });
          break;
        case "video":
          this.api.getVideoCategoryDetail(this.params).then((res) => {
            this.list = [...this.list, ...res.res.videowp];
            this.pageCount++;
            if (res.res.videowp < this.params.limit) this.more = false;
          });
          break;
        default:
          break;
      }
    },
    handleToLower() {
      this.getList();
    },
    handleTabClick(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;

        this.list = [];
        this.params.skip = 0;
        this.params.limit = 30;
        this.pageCount = 0;
        this.more = true;
        this.getList();
      }
    },
  },
  onLoad({ id, type }) {
    this.params.id = id;
    this.type = type;
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.cate-tab-title {
  position: relative;
  .tab {
    width: 60%;
    margin: 0 auto;
  }
}
.vertical {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 60px);
  .item {
    width: calc(33.33vw - 9rpx);
    height: calc(33.33vw - 9rpx);
    padding: 5rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.video {
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
