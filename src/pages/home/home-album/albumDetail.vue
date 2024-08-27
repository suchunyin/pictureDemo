<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-20 14:40:33
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-23 13:47:14
 * @FilePath: \my-project\src\pages\home\home-album\albumDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="cover-wrap">
      <image mode="aspectFill" :src="album.lcover"></image>
      <view class="title">
        <i class="text">{{ album.name }}</i>
        <view class="btn">关注专辑</view>
      </view>
    </view>
    <view class="info-wrap">
      <view class="user">
        <image mode="aspectFill" :src="album.user.avatar"></image>
        <view class="name">{{ album.user.name }}</view>
      </view>
      <view class="desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <view class="list-wrap">
      <view class="item" v-for="item in album.imgs" :key="item.id">
        <image mode="aspectFill" :src="item"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      album: {},
    };
  },
  methods: {
    getAlbum(id) {
      this.api.getHomeAlbumDetail(id).then((res) => {
        this.album = res.res.album_vertical;
      });
      this.api.getHomeAlbumWallPaper(id).then((res) => {
        console.log(res);
      });
    },
  },
  onLoad(option) {
    this.getAlbum(option.id);
  },
};
</script>

<style lang="scss" scoped>
.cover-wrap {
  height: 400rpx;
  padding: 10rpx;
  position: relative;
  image {
    height: 100%;
    width: 100%;
  }
  .title {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 90%;
    bottom: 30rpx;
    left: 30rpx;
    padding: 0 10rpx;
    .text {
      color: #fff;
      font-size: 36rpx;
      font-weight: 600;
    }
    .btn {
      border: 1px solid $color;
      border-radius: 10%;
      color: #fff;
      background-color: $color;
      padding: 10rpx 20rpx;
    }
  }
}

.info-wrap {
  padding: 10rpx;
  .user {
    display: flex;
    image {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }

    .name {
      padding-left: 30rpx;
      font-size: 32rpx;
      font-weight: 600;
    }
  }

  .desc {
    color: #666;
  }
}

.list-wrap {
  padding: 10rpx;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: calc(33.33vw - 3rpx * 3);
    height: calc(33.33vw - 3rpx * 3);
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
