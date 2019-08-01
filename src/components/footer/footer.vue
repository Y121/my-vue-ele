<!-- 底部组件 -->
<template>
  <div class="footer">
      <dl>
          <dt>
              <span class="iconfont">&#xe608;</span>
          </dt>
          <dd>外卖</dd>
      </dl>
      <dl>
          <dt>
              <span class="iconfont">&#xe704;</span>
          </dt>
          <dd>搜索</dd>
      </dl>
      <dl>
          <dt>
              <span class="iconfont">&#xe738;</span>
          </dt>
          <dd>订单</dd>
      </dl>
      <dl>
          <dt>
              <span class="iconfont">&#xe600;</span>
          </dt>
          <dd>我的</dd>
      </dl>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.footer{
    height:2.1875rem /* 35/16 */;
    display:flex;
    justify-content: space-around;
    dl{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>