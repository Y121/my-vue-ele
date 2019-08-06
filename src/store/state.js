/**
 * 用来数据共享数据存储(相当于对外的只读属性，只能通过mutations修改)
 */
const state = {
  geohash: '', //地址值
  latitude: '', //经度
  longitude: '', //纬度
}
export default state;
