import axios from "./request";
//获取城市信息
export const cityGuess = params => {
  return axios.get("/api/v1/cities", {
    params
  }); //get请求
};
//获取所选城市信息
export const currentCity = id => {
  return axios.get("/api/v1/cities/" + id);
};
//搜索地址
export const searchAddress = (city_id, keyword) => {
  return axios.get("/api/v1/pois", {
    params: {
      city_id,
      keyword,
      type: "search"
    }
  });
};
//食品分类列表
export const classFood = () => {
  return axios.get("/api/v2/index_entry");
};
//根据经纬度详细定位
export const getAdd = geohash => {
  return axios.get("/api/v2/pois/" + geohash);
};
//获取商铺列表
export const shopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = "",
  restaurant_category_ids = "",
  order_by = "",
  delivery_mode = "",
  support_ids = []
) => {
  let supportStr = "";
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += "&support_ids[]=" + item.id;
    }
  });
  let data = {
    latitude, //经度
    longitude, //纬度
    offset, //跳过多少条数据
    limit: "20", //请求数据的数量
    "extras[]": "activities",
    keyword: "",
    restaurant_category_id, //餐馆分类id
    "restaurant_category_ids[]": restaurant_category_ids,
    order_by, //排序方式
    "delivery_mode[]": delivery_mode + supportStr //配送方式
  };
  return axios.get("/api/shopping/restaurants", {
    params: data
  });
};
//获取所有商铺分类列表
export const shopClassify = (latitude, longitude) => {
  return axios.get("/shopping/v2/restaurant/category", {
    params: {
      latitude,
      longitude
    }
  });
};
