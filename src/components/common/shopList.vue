<!-- 商铺列表 -->
<template>
  <div class="shopList">
    <dl v-for="(item,index) in shopListArr" :key="index">
      <dt>
        <img :src="imgBaseUrl+item.image_path" />
      </dt>
      <dd>
        <div class="header">
          <span :class="item.is_premium?'premium':''" class="header_name ellipsis">{{item.name}}</span>
          <ul>
            <li v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
          </ul>
        </div>
        <div class="second">
          <div>
            <rating-star :rating="item.rating"></rating-star>
            <span class="rating">{{item.rating}}</span>
            <span class="orderNum">月售{{item.recent_order_num}}单</span>
          </div>
          <div>
            <span class="del_mode" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
            <span class="suppo" v-if="zhunshi(item.supports)">准时达</span>
          </div>
        </div>
        <div class="third">
          <div>
            ¥{{item.float_minimum_order_amount}}起送
            <span class="segmentation">/</span>
            {{item.piecewise_agent_fee.tips}}
          </div>
          <div>
            <span v-if="Number(item.distance)">
              {{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
              <span
                class="segmentation"
              >/</span>
            </span>
            <span v-else>{{item.distance}}</span>
            <span class="segmentation">/</span>
            <span class="order_time">{{item.order_lead_time}}</span>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { shopList } from "../../api/api";
import { imgBaseUrl } from "../../api/env";
import ratingStar from "./ratingStar";
export default {
  data() {
    return {
      offset: 0,
      shopListArr: [], //店铺列表数据
      imgBaseUrl //从外面的js中引入的变量如果不初始化定义是不能直接在HTML中使用的
    };
  },
  components: {
    ratingStar
  },
  props: [
    "restaurantCategoryId",
    "restaurantCategoryIds",
    "sortByType",
    "deliveryMode",
    "supportIds"
  ],
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  methods: {
    async initData() {
      let res = await shopList(
        this.latitude,
        this.longitude,
        this.datarestaurantCategoryId
      );
      this.shopListArr = [...res];
    },
    zhunshi(supports) {
      let zhunStatus;
      if (supports instanceof Array && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === "准") {
            zhunStatus = true;
          }
        });
      } else {
        zhunStatus = false;
      }
      return zhunStatus;
    }
  }
};
</script>
<style lang='scss' scoped>
.shopList {
  width: 100%;
  background: #fff;
  dl {
    border-bottom: 1px solid #ddd;
    height: 6rem;
    display: flex;
    dt {
      width: 25%;
      display: flex;
      align-items: center;
      img {
        width: 75%;
        height: 75%;
        margin: 0 auto;
      }
    }
    dd {
      width: 75%;
      padding: 0.7rem 0;
      div.header {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.17rem;
        }
        span.header_name {
          width: 12rem;
          font-size: 0.96rem;
          font-weight: 700;
        }
        span.premium:before {
          content: "品牌";
          font: 0.12rem/0.2rem "微软雅黑";
          padding: 0 0.1rem;
          color: #000;
          background: orange;
          margin-right: 0.2rem;
        }
        ul {
          display: flex;
          width: 2.6rem;
          font-size: 0.12rem;
          padding-right: 0.8rem;
          justify-content: space-around;
        }
      }
      div.second {
        display: flex;
        justify-content: space-between;
        padding-top: 0.8rem;
        font: 0.1rem/0.8rem "微软雅黑";
        div {
          display: flex;
          .rating {
            color: orange;
            font-weight: 500;
            margin: 0 0.5rem;
          }
          .orderNum {
            font-size: 0.01rem;
          }
          .del_mode {
            font-size: 12px;
            background: #3190e8;
            color: #fff;
            padding: 0.1rem;
          }
          .suppo {
            color: #3190e8;
            background: #fff;
            padding: 0.1rem;
            border: 1px solid #3190e8;
            margin: 0 1rem 0 0.1rem;
          }
        }
      }
      div.third {
        display: flex;
        font-size: 0.1rem;
        justify-content: space-around;
        padding: 0.5rem 0;
        color: #333;
        .order_time {
          color: #3190e8;
        }
      }
    }
  }
}
</style>