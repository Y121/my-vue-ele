<!--  -->
<template>
  <div>
    <my-header goBack="true" :headTitle="title"></my-header>
    <div class="main_content">
      <ul class="menu_top">
        <li>
          {{title}}
          <span class="iconfont">&#xeb6d;</span>
        </li>
        <li>
          排序
          <span class="iconfont">&#xeb6d;</span>
        </li>
        <li>
          筛选
          <span class="iconfont">&#xeb6d;</span>
        </li>
      </ul>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import header from "../../components/header/header";
import * as api from "../../api/api.js";
export default {
  data() {
    return {
      title: "", //页面标题
      geohash: "", //city页面传递过来的地址geohash
      category: null //左侧分栏数据
    };
  },
  components: {
    myHeader: header
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS"]),
    async initData() {
      this.title = this.$route.query.title;
      this.geohash = this.$route.query.geohash;
      //防止刷新页面，vuex状态丢失
      if (!this.latitude) {
        let res = await api.getAdd(this.geohash);
        this.RECORD_ADDRESS(res);
      }
      //获取左侧分栏数据
      this.category = await api.shopClassify(this.latitude, this.longitude);
      console.log(this.category);
    }
  }
};
</script>

<style lang='scss' scoped>
.main_content {
  margin-top: 3rem;
  background: #fff;
  .menu_top {
    display: flex;
    border-bottom: 1px solid #dedede;
    padding: 0.3rem 0;
    li {
      width: 33.3%;
      border-right: 1px solid #dedede;
      text-align: center;
      font: 0.875rem/1.6rem "微软雅黑";
      color: #333;
      span {
        color: #333;
        font-size: 10px;
      }
    }
  }
}
</style>