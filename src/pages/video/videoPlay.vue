<template>
  <view class="container">
    <image class="bg" :src="data.img"></image>
    <view class="tool-wrap">
      <view @click="muted = !muted">
        <view class="iconfont icon-jingyin" v-if="muted"></view>
        <view class="iconfont icon-shengyin" v-else></view>
      </view>
      <view class="iconfont icon-zhuanfa" @click="handleShare">
        <!-- <button open-type="share" class="btn"></button> -->
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
      await uni.showLoading({ title: "下载中" });
      const { tempFilePath } = await uni.downloadFile({ url: this.data.video });

      wx.getFileSystemManager().saveFile({
        tempFilePath,
        success: async (res) => {
          uni.hideLoading();
          await uni.showToast({ title: "下载成功" });
        },
      });
    },
    async handleShare() {
      const { tempFilePath } = await uni.downloadFile({ url: this.data.video });
      const res = await wx.shareVideoMessage({ videoPath: tempFilePath });
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
