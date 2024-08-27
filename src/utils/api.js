import request from "./request";

const baseUrl1 = "https://picturedemo.usemock.com";
const baseUrl2 = "http://service.picasso.adesk.com";
const videoUrl = "https://service.videowp.adesk.com";

/**
 * 首页-推荐接口
 */
const getHomepage = () => {
  return request({ url: `${baseUrl1}/home/recommend/dataList` });
};
const getHomeHotList = ({ limit, skip }) => {
  return request({
    url: `${baseUrl2}/v1/vertical/vertical?limit=${limit}&skip=${skip}&order=hot`,
  });
};
/**
 * 首页-分类接口
 */
const getHomeCategory = () => {
  return request({
    url: `${baseUrl2}/v1/vertical/category`,
  });
};
const getHomeCategoryWallpaper = ({ id, limit, skip, order }) => {
  return request({
    url: `${baseUrl2}/v1/vertical/category/${id}/vertical?limit=${limit}&skip=${skip}&order=${order}`,
  });
};
/**首页-最新接口 */
const getHomeNewList = ({ limit, skip }) => {
  return request({
    url: `${baseUrl2}/v1/vertical/vertical?limit=${limit}&skip=${skip}&order=new`,
  });
};
/**首页-专辑接口 */
const getHomeAlbumBanner = () => {
  return request({ url: `${baseUrl1}/home/album/banner` });
};
const getHomeAlbumList = ({ limit, skip }) => {
  return request({
    url: `${baseUrl2}/v1/vertical/album?limit=${limit}&skip=${skip}&order=hot`,
  });
};
const getHomeAlbumDetail = (id) => {
  return request({
    url: `${baseUrl2}/v1/vertical/album/${id}`,
  });
};
const getHomeAlbumWallPaper = (id) => {
  return request({
    url: `${baseUrl2}/v1/wallpaper/album/${id}/wallpaper?first=1`,
  });
};

/**
 * 图片详情信息
 */
const getComment = (id) => {
  return request({
    url: `${baseUrl2}/v2/vertical/vertical/${id}/comment`,
  });
};

/**
 * 视频 接口
 */
const getVideoList = ({ limit, skip, type }) => {
  let url =
    type !== "category"
      ? `${videoUrl}/v1/aibizhi/${type}&limit=${limit}&skip=${skip}`
      : `${videoUrl}/v1/aibizhi/${type}`;
  return request({ url });
};
const getVideoCategoryDetail = ({ id, limit, skip, order }) => {
  return request({
    url: `${videoUrl}/v1/aibizhi/featured?category=${id}&limit=${limit}&skip=${skip}&order=${order}`,
  });
};
const api = {
  getHomepage,
  getHomeHotList,
  getHomeCategory,
  getHomeCategoryWallpaper,
  getHomeNewList,
  getHomeAlbumBanner,
  getHomeAlbumList,
  getHomeAlbumDetail,
  getHomeAlbumWallPaper,

  getComment,

  getVideoList,
  getVideoCategoryDetail
};
export default api;
