<template>
  <div id="head_top">
      <slot name="logo"></slot><!--logo-->
      <slot name="search"></slot><!--搜索框-->
      <div v-if="goBack" class="head_back" @click="$router.go(-1)"><!--返回按钮-->
        <span class="iconfont">&#xe771;</span>
      </div>
      <div class="head_center" v-if="headTitle"><!--标题内容-->
          <span class="title_text">{{headTitle}}</span>
      </div>
      <router-link class="head_login" v-if="signinUp" tag="div" :to="'/home'">
          <span>登录|注册</span>
      </router-link>
      <slot name="changeCity"></slot>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props:['goBack','headTitle','signinUp'],
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/common/mixin.scss';//此处应以分号结尾，否则会报错。
  #head_top{
    position:fixed;
    left:0;
    top:0;
    z-index:100;
    background:$blue;
    @include wh(100%,2.8125rem);
  }
  .head_back{
     position:absolute;
     left:0.4rem;
     span{
        @include sc(1.875rem,#fff);
        line-height:2.8125rem;
     }
  }
  .head_center{
    @include center;
    width:50%;
    color:#fff;
    text-align:center;
    .title_text{
        @include sc(1.125rem,#fff);
        font-weight:bold;
    }
  }
  .head_login{
    position:absolute;
    right:0.4rem;
    span{
       @include sc(.875rem,#fff);
        line-height:2.8125rem;
    }
  }
</style>
