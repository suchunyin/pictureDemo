<template>
  <view>
    <view class="home-tab-title">
      <view class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          @clickItem="handleTabClick"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
      </view>
      <i class="iconfont icon-search"></i>
    </view>
    <view class="home-tab-content">
      <home-recommend v-if="current === 0"></home-recommend>
      <home-category v-if="current === 1"></home-category>
      <home-new v-if="current === 2"></home-new>
      <home-album v-if="current === 3"></home-album>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album";
import homeCategory from "./home-category";
import homeNew from "./home-new";
import homeRecommend from "./home-recommend";

export default {
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
  },
  data() {
    return {
      items: ["推荐", "分类", "最新", "专辑"],
      current: 2,
    };
  },
  methods: {
    handleTabClick(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  onLoad() {
  },
};
</script>

<style lang="scss" scoped>
.home-tab-title {
  position: relative;
  .tab {
    width: 60%;
    margin: 0 auto;
  }
  .icon-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
}
</style>
