<template>
  <!-- 手势滑动组件 左滑右滑 -->
  <view @touchstart="handleTouchstart" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      start: {},
    };
  },
  methods: {
    handleTouchstart(event) {
      this.start.time = Date.now();
      this.start.x = event.changedTouches[0].clientX;
      this.start.y = event.changedTouches[0].clientY;
    },
    handleTouchend(event) {
      let start = { ...this.start };
      let end = {};
      end.time = Date.now();
      end.x = event.changedTouches[0].clientX;
      end.y = event.changedTouches[0].clientY;

      // 判断用户合法滑动：滑动时间，滑动距离
      if (end.time - start.time > 2 * 1000) return;
      if (Math.abs(end.x - start.x) > 30 && Math.abs(end.y - start.y) < 30) {
        let direction = end.x - start.x > 0 ? "left" : "right";
        this.$emit("swiperAction", { direction });
      }
      return;
    },
  },
};
</script>

<style></style>
