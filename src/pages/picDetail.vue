<!--
 * @Author: suchunyin 1831869101@qq.com
 * @Date: 2024-08-21 11:15:38
 * @LastEditors: suchunyin 1831869101@qq.com
 * @LastEditTime: 2024-08-22 18:36:55
 * @FilePath: \my-project\src\pages\picDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container">
    <!-- 作者信息 -->
    <view class="author-wrap" v-if="imageData.user.name">
      <view class="avatar">
        <image :src="imageData.user.avatar"></image>
      </view>
      <view class="info">
        <i class="name">{{ imageData.user.name }}</i>
        <i class="time">{{ imageData.time }}</i>
      </view>
    </view>
    <!-- 图片 -->
    <view class="picture-wrap">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix" :src="imageData.img"></image>
      </swiper-action>
    </view>
    <!-- 点赞收藏操作 -->
    <view class="operate-wrap">
      <view class="item">
        <i class="iconfont icon-dianzan" /><i>{{ imageData.rank }}</i>
      </view>
      <view class="item">
        <i class="iconfont icon-shoucang" /><i>收藏</i>
      </view>
    </view>
    <!-- 评论 -->
    <view class="comment-wrap" v-if="commentList.length > 0">
      <view class="title">
        <i class="iconfont icon-hotfill" /><i>最热评论</i>
      </view>
      <view class="content">
        <view class="item" v-for="item in commentList" :key="item.id">
          <view class="left">
            <image mode="aspectFill" :src="item.user.avatar"></image>
          </view>
          <view class="midle">
            <view class="user">{{ item.user.name }}</view>
            <view class="comment">{{ item.content }}</view>
          </view>
          <view class="right">
            <i class="iconfont icon-dianzan" />
            <i>{{ item.size }}</i>
          </view>
        </view>
      </view>
    </view>
    <!-- 下载 -->
    <view class="download-wrap" @click="handleDownload">
      <text>下载图片</text>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "../components/swiperAction.vue";
moment.locale("zh-cn");

export default {
  components: { swiperAction },
  data() {
    return {
      imageData: {},
      commentList: [],
    };
  },
  methods: {
    getData() {
      this.imageData = getApp().globalData.list[getApp().globalData.index];
      this.imageData.time = moment(this.imageData.atime * 1000).fromNow();

      this.api.getComment(this.imageData.id).then((res) => {
        this.commentList = res.res.comment;
        if (this.commentList.length > 0 && !this.imageData.user)
          this.imageData.user = { ...this.commentList[0].user };
      });
    },

    /**
     * 滑动图片切换上一张/下一张
     * direction:滑动方向
     */
    handleSwiperAction({ direction }) {
      // 判断滑动方向 + 图片是否第一张和最后一张，是：提示，否：切换图片
      let len = getApp().globalData.list.length;
      if (direction === "right" && getApp().globalData.index + 1 !== len) {
        getApp().globalData.index += 1;
        this.getData();
      } else if (direction === "left" && getApp().globalData.index !== 0) {
        getApp().globalData.index -= 1;
        this.getData();
      } else {
        uni.showToast({ title: "没有数据了", icon: "none" });
      }
    },

    /**
     * 下载图片
     */
    async handleDownload() {
      await uni.showLoading({ title: "下载中" });

      const { tempFilePath } = await uni.downloadFile({
        url: this.imageData.img,
      });
      await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });

      uni.hideLoading();
      await uni.showToast({ title: "下载成功" });
    },
  },
  onLoad() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.author-wrap {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  .avatar {
    width: 10vw;
    padding: 10rpx 0;

    image {
      width: 100%;
      height: 10vw;
      border-radius: 50%;
    }
  }

  .info {
    padding-left: 30rpx;
    i.name {
      font-size: 26rpx;
      font-weight: 600;
    }

    i.time {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.picture-wrap {
  width: 100vw;
  image {
    width: 100%;
  }
}

.operate-wrap {
  height: 80rpx;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #cbcbcb;
  .item {
    width: 50%;
    padding: 10rpx 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    i + i {
      padding-left: 10rpx;
    }
  }
}

.comment-wrap {
  .title {
    padding: 20rpx;
    display: flex;

    i + i {
      padding-left: 20rpx;
      color: #666;
      font-weight: 600;
    }
  }

  .content {
    .item {
      display: flex;

      & + .item {
        border-top: 1rpx solid #999;
        padding-bottom: 20rpx;
      }
      .left {
        width: 10vw;
        padding: 10rpx;

        image {
          width: 100%;
          height: 10vw;
          border-radius: 50%;
        }
      }

      .midle {
        width: 80vw;
        padding: 10rpx;

        .user {
          padding: 10rpx 0;
          color: #666;
        }

        .comment {
          padding-top: 30rpx;
          font-weight: 600;
        }
      }

      .right {
        width: 10vw;
        padding: 10rpx;
        display: flex;
        align-items: flex-end;
        i + i {
          padding-left: 10rpx;
        }
      }
    }
  }
}

.download-wrap {
  padding: 15rpx;
  margin: 20rpx 10rpx;
  background-color: $color;
  display: flex;
  justify-content: center;
  text {
    color: #fff;
    font-size: 30rpx;
    font-weight: 600;
  }
}
.container {
  overflow: hidden;
}
</style>
