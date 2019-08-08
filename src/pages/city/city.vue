<template>
  <div class="page">
    <head-top goBack="true" :headTitle="cityName">
      <router-link tag="span" to="/home" slot="changeCity" class="changecity">切换城市</router-link>
    </head-top>
    <div class="city_search">
      <input type="text" class="search_input" v-model="searchContent" placeholder="输入学校、商务楼、地址" />
      <div @click="searchSubmit" class="search_button">提交</div>
    </div>
    <div class="add_content">
      <div class="search_history" v-if="isHistory">搜索历史</div>
      <div class="show_search">
        <dl v-for="(item,index) in addressData" :key="index" @click="goPage(item)">
          <dt>{{item.name}}</dt>
          <dd>{{item.address}}</dd>
        </dl>
        <div class="clearAll" v-if="isHistory&&addressData.length" @click="clearAll">清空所有</div>
      </div>
      <div class="clearAll noResult" v-if="isResult">很抱歉，无搜索结果！</div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/header/header";
import { currentCity, searchAddress } from "../../api/api.js";
import { setStore, getStore, removeStore } from "../../utils/myUtils.js";
export default {
  name: "",
  components: { headTop },
  data() {
    return {
      cityId: "", //城市ID
      cityName: "", //城市名称
      searchContent: "", //搜索内容
      addressData: [], //搜索出来的数据集
      historyList: [], //搜索历史
      isRepeat: false, //是否重复存储
      isHistory: true, //是否显示搜索历史字样
      isResult: false //搜索无结果，显示提示信息
    };
  },
  mounted() {
    this.cityId = this.$route.params.cityId;
    currentCity(this.cityId).then(res => {
      this.cityName = res.name;
    });
    this.initData();
  },
  methods: {
    initData() {
      let history = getStore("placeHistory");
      if (history) {
        this.addressData = JSON.parse(history);
      } else {
        this.addressData = [];
      }
    },
    searchSubmit() {
      //搜索内容
      if (!this.searchContent) {
        return;
      }
      searchAddress(this.cityId, this.searchContent).then(res => {
        this.addressData = res;
        this.isHistory = false;
        this.isResult = res.length ? false : true;
      });
    },
    goPage(content) {
      //跳转到具体地址页面，同时存储搜索历史。
      let history = getStore("placeHistory");
      if (history) {
        //如果有存储历史且没有存过
        this.historyList = JSON.parse(history);
        this.historyList.forEach((item, index) => {
          if (item.geohash == content.geohash) {
            this.isRepeat = true; //搜索历史记录里面已经存在该条搜索历史
          }
        });
        if (!this.isRepeat) {
          //不存在才存储
          this.historyList.push(content);
        }
      } else {
        //如果该搜索历史没有存过则存储
        this.historyList.push(content);
      }
      setStore("placeHistory", this.historyList);
      this.$router.push({
        path: "/msite",
        query: { geohash: content.geohash }
      });
    },
    clearAll() {
      //清除历史记录
      removeStore("placeHistory");
      this.initData();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/common/mixin.scss";
.changecity {
  position: absolute;
  right: 0.4rem;
  @include sc(0.875rem, #fff);
  line-height: 2.8125rem;
}
.city_search {
  margin-top: 3.4375rem;
  background: #fff;
  width: 100%;
  padding: 0.625rem 0;
  border-top: 1px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
}
.search_input {
  width: 90%;
  display: block;
  margin: 0 auto 0.625rem;
  height: 1.875rem;
  border: 1px solid #dedede;
  border-radius: 0.125rem 0.125rem;
  @include sc(0.875rem, #000);
  text-indent: 0.25rem;
}
.search_button {
  width: 90%;
  margin: 0 auto;
  height: 2.1875rem;
  border: 1px solid #dedede;
  border-radius: 0.125rem 0.125rem;
  background: $blue;
  @include sc(0.9375rem, #fff);
  text-align: center;
  line-height: 2.1875rem;
}
.add_content {
  .search_history {
    @include sc(0.75rem, #000);
    line-height: 1.25rem;
    padding-left: 0.625rem;
    border-bottom: 2px solid #e4e4e4;
  }
}
.show_search {
  width: 100%;
  background: #fff;
  dl {
    height: 3.125rem;
    padding: 0.9375rem 1.25rem;
    border-bottom: 1px solid #e4e4e4;
    dt {
      @include sc(1rem, #000);
      font-weight: bold;
    }
    dd {
      @include sc(0.8125rem, #aaa);
      line-height: 2.1875rem;
    }
  }
}
.clearAll {
  height: 3.125rem;
  border-bottom: 1px solid #e4e4e4;
  @include sc(1.125rem, #333);
  line-height: 3.125rem;
  text-align: center;
  background: #fff;
}
.noResult {
  text-align: left;
  padding-left: 1.25rem;
}
</style>
