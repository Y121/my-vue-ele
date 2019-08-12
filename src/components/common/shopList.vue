<!-- 商铺列表 -->
<template>
  <div class="shopList">
    <dl v-for="(item,index) in shopListArr" :key="index">
      <dt>
        <img :src="imgBaseUrl+item.image_path" />
      </dt>
      <dd>
        <div>
          <span></span>
          <span></span>
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { shopList } from "../../api/api";
import { imgBaseUrl } from "../../api/env";
export default {
  data() {
    return {
      offset: 0,
      shopListArr: [], //店铺列表数据
      imgBaseUrl //从外面的js中引入的变量如果不初始化定义是不能直接在HTML中使用的
    };
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
    }
  }
}
</style>