<!-- 底部组件 -->
<template>
  <div class="footer">
    <dl class="active">
      <dt>
        <span class="iconfont myicon">&#xe608;</span>
      </dt>
      <dd>外卖</dd>
    </dl>
    <dl>
      <dt>
        <span class="iconfont myicon">&#xe704;</span>
      </dt>
      <dd>搜索</dd>
    </dl>
    <dl>
      <dt>
        <span class="iconfont myicon">&#xe738;</span>
      </dt>
      <dd>订单</dd>
    </dl>
    <dl>
      <dt>
        <span class="iconfont myicon">&#xe600;</span>
      </dt>
      <dd>我的</dd>
    </dl>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.footer {
  background-color: #fff;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
  dl {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    dd {
      font-size: 13px;
    }
  }
  .active {
    color: #3190e8;
  }
  .myicon {
    font-size: 24px;
  }
}
</style>