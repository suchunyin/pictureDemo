<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-23 17:43:28
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-27 15:02:48
 * @FilePath: \my-project\src\pages\video\videoPlay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container">
    <image class="bg" :src="data.img"></image>
    <view class="tool-wrap">
      <view @click="muted = !muted">
        <view class="iconfont icon-jingyin" v-if="muted"></view>
        <view class="iconfont icon-shengyin" v-else></view>
      </view>
      <view class="iconfont icon-zhuanfa">
        <button open-type="share" class="btn"></button>
      </view>
    </view>
    <view class="video-wrap">
      <video :src="data.view_video" objectFit="fill" :muted="muted"></video>
    </view>
    <view class="download-wrap" @click="handleDownload">
      <text>下载高清</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      muted: false,
    };
  },
  methods: {
    async handleDownload() {
      const { tempFilePath } = await uni.downloadFile({ url: this.data.video });
      console.log(tempFilePath);

      const res = await wx.getFileSystemManager.saveFile({ tempFilePath });
      console.log(res);
    },
    async handleShare() {
      const { tempFilePath } = await uni.downloadFile({ url: this.data.video });
      console.log(tempFilePath);

      const res = await wx.shareVideoMessage({ videoPath: tempFilePath });
      console.log(res);
    },
  },
  onLoad({ item }) {
    this.data = JSON.parse(decodeURIComponent(item));
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(15rpx);
}
.tool-wrap {
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  .iconfont {
    margin: 20rpx;
    padding: 20rpx;
    font-size: 50rpx;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .icon-zhuanfa {
    position: relative;
    .btn {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
}
.video-wrap {
  height: 1000rpx;
  video {
    height: 100%;
  }
}
.download-wrap {
  padding: 15rpx;
  margin: 20rpx 10rpx;
  width: 300rpx;
  border-radius: 30rpx;
  border: 1rpx solid #fff;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;

  text {
    color: #fff;
    font-size: 30rpx;
    font-weight: 600;
  }
}
</style>
