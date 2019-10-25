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
      <div class="detail_data">
        <div class="first">
          <ul class="first_left">
            <li
              v-for="(item,index) in category"
              :key="index"
              @click="getDetailCategory(index)"
              :class="{active:restaurant_category_id==item.id}"
            >
              <div>
                <img v-if="index" :src="imgBaseUrl+item.image_url" />
                <span>{{item.name}}</span>
              </div>
              <div>
                <span class="count">{{item.count}}</span>
                <span v-if="index" class="iconfont icon-youjiantou"></span>
              </div>
            </li>
          </ul>
          <ul class="first_right">
            <li v-for="(item,index) in detailCategory" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.count}}</span>
            </li>
          </ul>
        </div>
      </div>
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
      category: null, //左侧分栏数据
      imgBaseUrl: "https://fuss10.elemecdn.com/",
      detailCategory: null, //左侧分栏详细数据
      restaurant_category_id: "" //食品类型ID值
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
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      //防止刷新页面，vuex状态丢失
      if (!this.latitude) {
        let res = await api.getAdd(this.geohash);
        this.RECORD_ADDRESS(res);
      }
      //获取左侧分栏数据
      this.category = await api.shopClassify(this.latitude, this.longitude);
      console.log(this.category);
    },
    getDetailCategory(index) {
      if (index == 0) {
        return;
      }
      this.detailCategory = this.category[index].sub_categories;
    }
  }
};
</script>

<style lang='scss' scoped>
.main_content {
  background: #fff;
  width: 100%;
  position: absolute;
  top: 3rem;
  left: 0;
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
  .detail_data {
    .first {
      display: flex;
      .first_left {
        width: 50%;
        li {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem /* 12/16 */ 0.9375rem /* 15/16 */;
          background: #f1f1f1;
          color: #333;
          font-size: 0.8125rem /* 13/16 */;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            img {
              width: 1.25rem /* 20/16 */;
              height: 1.25rem /* 20/16 */;
              margin-right: 0.625rem; /* 10/16 */
            }
            .count {
              display: inline-block;
              padding: 3px 6px;
              border-radius: 10px;
              background: #ccc;
              color: #fff;
              margin-right: 6px;
              font-size: 0.75rem; /* 12/16 */
            }
          }
        }
        li.active {
          background: #fff;
        }
      }
      .first_right {
        width: 50%;
        overflow: scroll;
        height: 25.7rem;
        li {
          width: 90%;
          float: right;
          padding: 0.75rem 0.5rem 0.75rem 0;
          font-size: 0.875rem /* 14/16 */;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.025rem solid #e4e4e4;
        }
      }
    }
  }
}
</style>