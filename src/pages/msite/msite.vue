<template>
  <div class="page">
    <headerTop signin-up="msite">
      <router-link tag="div" :to="'/search/geohash'" slot="search" class="head_search">
        <span class="iconfont">&#xe615;</span>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="title_text">{{title}}</span>
      </router-link>
    </headerTop>
    <div class="swiper-box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide slider-part" v-for="(item,index) in foodList" :key="index">
            <router-link
              :to="{path:'/food'}"
              class="food_detail"
              v-for="foodItem in item"
              :key="foodItem.id"
            >
              <span class="iconfont">&#xe61f;</span>
              <span>{{foodItem.title}}</span>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { cityGuess, getAdd, classFood } from "../../api/api";

import headerTop from "../../components/header/header";
import footer from "../../components/footer/footer";
import "../../plugins/swiper.min.js";
import "../../assets/css/plugins/swiper.min.css";

//因为报regeneratorRuntime is not defined
require("babel-polyfill");

export default {
  name: "",
  components: { headerTop },
  data() {
    return {
      geohash: "", //经纬度
      title: "请选择地址",
      foodList: [] //食品类型列表
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const geohashResult = await cityGuess({ type: "guess" }); //await等待promise执行结束
      this.geohash = geohashResult.latitude + "," + geohashResult.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    //保存geohash到vuex
    this.SAVE_GEOHASH(this.geohash);
    let res = await getAdd(this.geohash);
    this.title = res.name;
  },
  computed: {
    // 一个组件中可能会需要多个state，此处只是示例
    // ...mapState({
    //   vuexgeohash:state=>state.geohash
    // })
  },
  mounted() {
    classFood()
      .then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        console.log(foodArr);
        this.foodList = foodArr;
      })
      .then(() => {
        new Swiper(".swiper-container", {
          pagination: ".swiper-pagination",
          loop: true
        });
      });
  },
  methods: {
    //一个组件中可能需要多个mutations
    ...mapMutations(["SAVE_GEOHASH"])
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/common/mixin.scss";
@import "../../assets/css/plugins/swiper.min.css";
.head_search {
  position: absolute;
  left: 1rem;
  span {
    font: 1.2rem/2.8125rem "微软雅黑";
    color: #fff;
    font-weight: bold;
  }
}
.msite-title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .title_text {
    @include sc(1.125rem, #fff);
    font-weight: bold;
  }
}
// .swiper {
//   width: 200px;
// }
.swiper-container {
  width: 100%;
  height: auto;
  padding-bottom: 1.6rem;
  background: #fff;
  margin-bottom: 1rem;
}
.slider-part {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .food_detail {
    width: 25%;
    color: #000;
    span {
      display: block;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    span:nth-of-type(1) {
      @include sc(3rem, green);
    }
  }
}
.swiper-box {
  margin-top: 3rem;
}
</style>
