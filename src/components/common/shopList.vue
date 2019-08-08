<!-- 商铺列表 -->
<template>
  <div class="shopList">
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { shopList } from "../../api/api";
export default {
  data() {
    return {
      offset: 0,
      shopListArr: [] //店铺列表数据
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
      console.dir(this.shopListArr);
      console.log(res);
    }
  }
};
</script>



<style lang='scss' scoped>
</style>