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
    <div>
      
    </div>
  </div>
</template>

<script>
import headerTop from '../../components/header/header';
export default {
  name: '',
  components: {headerTop},
  data() {
    return {
        title:''
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/common/mixin.scss';
    .head_search{
        position:absolute;
        left:1rem;
        span{
            font:1.2rem/2.8125rem "微软雅黑";
            color:#fff;
            font-weight:bold;
        }
    }
    .msite-title{
      @include center;
      width:50%;
      color:#fff;
      text-align:center;
      .title_text{
          @include sc(1.125rem,#fff);
          font-weight:bold;
      }
    }
</style>
