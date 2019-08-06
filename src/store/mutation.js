/**
 * 用来注册改变数据状态(应该就是注册改变状态的方法吧)
 */
// import {
//     SAVE_GEOHASH
// }from './mutation-types';
import * as type from './mutation-types'

let mutations = {
  //保存经纬度
  [type.SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  [type.RECORD_ADDRESS](state, { //对象解构
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  }
}
export default mutations;
