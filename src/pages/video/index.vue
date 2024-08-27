<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-14 14:54:45
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-27 15:19:56
 * @FilePath: \my-project\src\pages\video\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="video-tab-title">
      <view class="tab">
        <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="handleTabClick"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
      </view>
    </view>
    <scroll-view
      scroll-y
      class="normal-content"
      @scrolltolower="handleToLower"
      enable-flex
      v-if="current !== 4"
    >
      <navigator
        class="item"
        v-for="item in normalList"
        :key="item.id"
        :url="`/pages/video/videoPlay?item=${encodeURIComponent(JSON.stringify(item))}`"
      >
        <image mode="aspectFill" :src="item.img"></image>
      </navigator>
    </scroll-view>
    <view class="category-content" v-else>
      <navigator
        class="item"
        v-for="item in categoryList"
        :key="item.id"
        :url="`/pages/categoryDetail?id=${item.id}&type=video`"
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
      items: [
        { title: "推荐", type: "featured?first=0&order=hot" },
        { title: "娱乐", type: "featured?category=5930e046e7bce72ce013719c" },
        { title: "影视", type: "featured?category=5930e039e7bce72ce0137190" },
        {
          title: "热门",
          type: "featured?category=5930df00e7bce72c3860daa2&order=new",
        },
        { title: "分类", type: "category" },
      ],
      current: 2,
      normalList: [],
      params: { limit: 30, skip: 0 },
      pageCount: 0,
      more: true,
      categoryList: [],
    };
  },
  methods: {
    getList() {
      if (!this.more) {
        uni.showToast({ title: "没有数据了", icon: "none" });
        return;
      }
      this.params.skip = this.params.limit * this.pageCount;
      this.params.type = this.items[this.current].type;
      this.api.getVideoList(this.params).then((res) => {
        if (res.res.videowp) {
          this.normalList = [...this.normalList, ...res.res.videowp];
          this.pageCount++;
          if (res.res.videowp < this.params.limit) this.more = false;
        }
        if (res.res.category) this.categoryList = res.res.category;
      });
    },
    handleToLower() {
      this.getList();
    },
    handleTabClick(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;

        this.normalList = [];
        this.params.skip = 0;
        this.params.limit = 30;
        this.pageCount = 0;
        this.more = true;
        this.getList();
      }
    },
    handleGoDetail(item) {
      getApp().globalData.video = item;
      uni.navigateTo({ url: `/pages/video/videoPlay` });
    },
  },
  onLoad() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.video-tab-title {
  position: relative;
  .tab {
    width: 70%;
    margin: 0 auto;
  }
}
.normal-content {
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
.category-content {
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
