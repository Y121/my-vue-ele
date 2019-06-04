<template>
  <div class="page">
    <head-top goBack="true" :headTitle="cityName">
        <router-link tag="span" to="/home" slot="changeCity" class="changecity">切换城市</router-link>
    </head-top>
    <div class="city_search">
        <input type="text" class="search_input" v-model="searchContent" placeholder="输入学校、商务楼、地址"/>
        <div @click="searchSubmit" class="search_button">提交</div>
    </div>
    <div class="add_content">
        <div class="search_history">搜索历史</div>
        <div class="show_search">
            <dl>
                <dt></dt>
                <dd></dd>
            </dl>
        </div>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/header/header'
import {currentCity,searchAddress} from '../../api/api.js'
export default {
  name: '',
  components: {headTop},
  data() {
    return {
        cityId:'',//城市ID
        cityName:'',//城市名称
        searchContent:'',//搜索内容
        addressData:[],//搜索出来的数据集
    }
  },
  mounted(){
      this.cityId = this.$route.params.cityId;
      currentCity(this.cityId).then(res=>{
          this.cityName = res.name;
      })
  },
  methods:{
      searchSubmit(){
          searchAddress(this.cityId,this.searchContent).then(res=>{
              this.addressData = res;
          })
      }
  }
}
</script>

<style scoped lang="scss">
    @import '../../assets/css/common/mixin.scss';
    .changecity{
        position:absolute;
        right:0.4rem;
        @include sc(.875rem,#fff);
            line-height:2.8125rem;
    }
    .city_search{
         margin-top:3.4375rem;
         background:#fff;
         width:100%;
         padding:.625rem 0;
         border-top:1px solid #e4e4e4;
         border-bottom:1px solid #e4e4e4;
    }
    .search_input{
        width:90%;
        display:block;
        margin:0 auto .625rem;
        height:1.875rem;
        border:1px solid #dedede;
        border-radius:.125rem .125rem;
        @include sc(.875rem,#000);
        text-indent:.25rem;
    }
    .search_button{
        width:90%;
        margin:0 auto;
        height:2.1875rem;
        border:1px solid #dedede;
        border-radius:.125rem .125rem;
        background:$blue;
        @include sc(.9375rem,#fff);
        text-align:center;
        line-height:2.1875rem;
    }
    .add_content{
        .search_history{
            @include sc(.75rem,#000);
            line-height:1.25rem;
            padding-left:.625rem;
        }
    }
</style>
