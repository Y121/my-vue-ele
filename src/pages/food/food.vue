<!--  -->
<template>
  <div>
    <my-header goBack="true" :headTitle="title"></my-header>
    <div class="main_content">
      <ul class="menu_top">
        <li @click="sortName='first'">
          {{title}}
          <span class="iconfont">&#xeb6d;</span>
        </li>
        <li @click="sortName='second'">
          排序
          <span class="iconfont">&#xeb6d;</span>
        </li>
        <li @click="sortName='third'">
          筛选
          <span class="iconfont">&#xeb6d;</span>
        </li>
      </ul>
      <!-- <transition>
        <div class="detail_data"> -->
        <transition name="showlist">
          <div class="shopCommon first" v-show="sortName=='first'">
            <ul class="first_left">
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="getDetailCategory(index,item)"
                :class="{active:restaurant_category_id==item.id}"
              >
                <div>
                  <img v-if="index" :src="imgBaseUrl+item.image_url" />
                  <span>{{item.name}}</span>
                </div>
                <div>
                  <span class="count">{{item.count}}</span>
                  <span v-if="index" class="iconfont icon-youjiantou"></span>
                </div>
              </li>
            </ul>
            <ul class="first_right">
              <li v-for="(item,index) in detailCategory" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.count}}</span>
              </li>
            </ul>
          </div>
        </transition>
        <transition name="showlist">
          <div class="shopCommon second" v-show="sortName=='second'">
              <ul>
                <li>
                  <span class="iconfont" style="color:#289BF0">&#xe627;</span>
                  <p>智能排序</p>
                </li>
                <li>
                  <span class="iconfont" style="color:#289BF0">&#xe699;</span>
                  <p>距离最近</p>
                </li>
                <li>
                  <span class="iconfont" style="color:red">&#xe625;</span>
                  <p>销量最高</p>
                </li>
                <li>
                  <span class="iconfont" style="color:orange">&#xe602;</span>
                  <p>起送价最低</p>
                </li>
                <li>
                  <span class="iconfont" style="color:green">&#xe635;</span>
                  <p>配送速度最快</p>
                </li>
                <li>
                  <span class="iconfont" style="color:orange">&#xe606;</span>
                  <p>评分最高</p>
                </li>
              </ul>
          </div>
        </transition>
        <transition name="showlist">
          <div class="shopCommon third" v-show="sortName=='third'">
            <div class="third_box">
              <h5>配送方式</h5>
              <p class="delivery_method">蜂鸟专送</p>
              <div class="merchant_attribute">
                <p>商家属性(可以多选)</p>
                <ul class="shop_activity">
                  <li v-for="(item,index) in shopActivity" :key="index" @click="changeActivity_status(index,item.id)" :class="{active:select_activities[index].status}">
                    <div>
                      <span v-if="select_activities[index].status" class="iconfont activity_icon">&#xe72c;</span>
                      <span v-else class="activity_iconname">{{item.icon_name}}</span>
                    </div>
                    <p>{{item.name}}</p>
                  </li>
                </ul>
              </div>
            </div> 
            <div class="third_bottons">
              <div class="clear" style="background:#fff;color:#333;" @click="clearAll">清空</div>
              <div class="confirm">确定<span v-show="this.activetyCount">({{activetyCount}})</span></div>
            </div>
          </div>
        </transition>
        <!-- </div>
      </transition> -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import header from "../../components/header/header";
import * as api from "../../api/api.js";
export default {
  data() {
    return {
      title: "", //页面标题
      geohash: "", //city页面传递过来的地址geohash
      category: null, //左侧分栏数据
      imgBaseUrl: "https://fuss10.elemecdn.com/",
      detailCategory: null, //左侧分栏详细数据
      restaurant_category_id: "", //食品类型ID值
      sortName:'first',//区分点击哪个分类
      shopActivity:null,//商铺属性活动列表
      activetyCount:0,//选择的商铺属性活动总数量
      select_activities:[],//选中的商铺属性活动数据
    };
  },
  components: {
    myHeader: header
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS"]),
    async initData() {
      this.title = this.$route.query.title;
      this.geohash = this.$route.query.geohash;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      //防止刷新页面，vuex状态丢失
      if (!this.latitude) {
        let res = await api.getAdd(this.geohash);
        this.RECORD_ADDRESS(res);
      }
      //获取左侧分栏数据
      this.category = await api.shopClassify(this.latitude, this.longitude);
      this.category.forEach(item=>{
        if(this.restaurant_category_id==item.id){
          this.detailCategory = item.sub_categories;
        }
      })
      //获取商铺属性活动数据
      this.shopActivity = await api.shopActivity(this.latitude,this.longitude);
      this.shopActivity.forEach((item,index)=>{
        this.select_activities[index] = {status:false,id:item.id}
      })
    },
    //排序列点击获取对应右边部分详细数据
    getDetailCategory(index, item) {
      if (index == 0) {
        return;
      }
      this.restaurant_category_id = item.id;
      this.detailCategory = this.category[index].sub_categories;
    },
    //修改商家属性活动状态
    changeActivity_status(index,id){
      //修改所选择商家活动中对应的状态值。此处是用数组替换来做
      this.select_activities.splice(index,1,{
        status:!this.select_activities[index].status,
        id:id
      });
      this.activetyCount = 0;
      this.select_activities.forEach((item,index)=>{
        if(item.status){
          this.activetyCount++;
        }
      });
    },
    //清空所选商家属性活动
    clearAll(){
      this.select_activities = this.select_activities.map(item=>{
        return !item.status;
      });
      this.activetyCount = 0;
    }
  }
};
</script>

<style lang='scss' scoped>
.main_content {
  background: #fff;
  width: 100%;
  position: absolute;
  top: 3rem;
  left: 0;
  background: #fff;
  .menu_top {
    display: flex;
    border-bottom: 1px solid #dedede;
    padding: 0.3rem 0;
    li {
      width: 33.3%;
      border-right: 1px solid #dedede;
      text-align: center;
      font: 0.875rem/1.6rem "微软雅黑";
      color: #333;
      span {
        color: #333;
        font-size: 10px;
      }
    }
  }
  // .detail_data {
  //   opacity: 0;
    .first {
      display: flex;
      width:100%;
      .first_left {
        width: 50%;
        li {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem /* 12/16 */ 0.9375rem /* 15/16 */;
          background: #f1f1f1;
          color: #333;
          font-size: 0.8125rem /* 13/16 */;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            img {
              width: 1.25rem /* 20/16 */;
              height: 1.25rem /* 20/16 */;
              margin-right: 0.625rem; /* 10/16 */
            }
            .count {
              display: inline-block;
              padding: 3px 6px;
              border-radius: 10px;
              background: #ccc;
              color: #fff;
              margin-right: 6px;
              font-size: 0.75rem; /* 12/16 */
            }
          }
        }
        li.active {
          background: #fff;
        }
      }
      .first_right {
        width: 50%;
        overflow: scroll;
        height: 25.7rem;
        li {
          width: 90%;
          float: right;
          padding: 0.75rem 0.5rem 0.75rem 0;
          font-size: 0.875rem /* 14/16 */;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.025rem solid #e4e4e4;
        }
      }
    }
    .second{
      width:100%;
      ul{
        li{
          display:flex;
          font-size:.9rem;
          color:#333;
          span{
            display:inline-block;
            width:10%;
            text-align:center;
            padding:1.4rem 0;
            font-size:1.1rem;
          }
          p{
            width:90%;
            border-bottom:0.025rem solid #e4e4e4;
            padding:1.4rem 0;
          }
        }
      }
    }
    .third{
      width:100%;
      .third_box{
        width:90%;
        margin:0 auto;
        h5{
          font-weight:normal;
          line-height:2.5rem;
        }
        .delivery_method{
          font-size:.12rem;
          width:6rem;
          padding:.56rem .8rem;
          border:1px solid #eee;
          margin-bottom:1rem;
        }
        .merchant_attribute{
          font-size:.2rem;
          .shop_activity{
            margin-top:1rem;
            margin-bottom:1rem;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
              display:flex;
              width:23%;
              padding:.3rem 1rem;
              border:1px solid #eee;
              margin-bottom:.4rem;
              div{
                margin-right:.5rem;
                margin-top:.3rem;
                color:#289BF0;
                .activity_iconname{
                  font-size:.8rem;
                  border:1px solid #289BF0;
                  padding:.05rem .2rem;
                  border-radius: .2rem .2rem;
                }
              }
              p{
                font-size: .6rem;
                line-height: 1.5rem;
              }
            }
            li.active{
              color:#289BF0;
            }
          }
        }
      }
      .third_bottons{
        display:flex;
        background-color: #f1f1f1;
        width: 100%;
        padding: 0.5rem 0.2rem;
        justify-content: space-around;
        div{
          width:45%;
          text-align:center;
          padding:.7rem 0;
          background:#56d176;
          color:#fff;
          border-radius:.5rem .5rem;
          font-size:1.2rem;
        }
      }
    }
  // }
    .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  
}
</style>