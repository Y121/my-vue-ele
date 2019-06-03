<!--  -->
<template>
    <div class='home'>
        <head-top signin-up="home">
            <span slot="logo" class="head_logo" @click="reload">ele.me</span>
        </head-top>
        <div class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link tag="div" class="city_content" :to="'/city/'+guessCityData.id">
                <span>{{guessCityData.name}}</span>
                <span class="iconfont">&#xe64c;</span>
            </router-link>
        </div>
        <div class="hot_city">
            <p>热门城市</p>
            <ul>
                <router-link tag="li" :to="'/city/'+item.id" v-for="(item) in hotCityData" :key="item.id">{{item.name}}</router-link>
            </ul>
        </div>
        <div class="group_city">
            <div class="hot_city" v-for="(value,key,index) in sortgroupcity" :key="key">
                <p>{{key}}<span v-if="index==0">（按字母排序）</span></p>
                <ul>
                    <router-link tag="li" :to="'/city/'+item.id" v-for="(item) in value" class="ellipsis" :key="item.id">{{item.name}}</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/header' 
import {cityGuess} from '../../api/api.js'
export default {
    components: {headTop},
    data() {
        return {
            guessCityData:{},//当前城市信息
            hotCityData:[],//热门城市信息
            groupCityData:{},//所有城市
        };
    },
    methods:{
        reload(){
            window.location.reload();
        }
    },
    computed:{
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupCityData[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupCityData[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    },
    mounted(){
        //获取当前城市
        cityGuess({type:'guess'}).then(res=>{
            this.guessCityData = res;
        });
        //获取热门城市
        cityGuess({type:'hot'}).then(res=>{
            this.hotCityData = res;
        });
        //获取城市列表
        cityGuess({type:'group'}).then(res=>{
            this.groupCityData = res;
        });
    }
}
</script>
<style lang='scss' scoped>
@import '../../assets/css/common/mixin.scss';
    .home{width:100%;}
    .head_logo{
        position:absolute;
        left:.4rem;
        font:.875rem/2.8125rem "微软雅黑";
        color:#fff;
    }
    .city_nav{
        width:100%;
        padding-top:3.4375rem;
        border-bottom:2px solid #e4e4e4;
        margin-bottom:.625rem;
        background:#fff;
    }
    .city_tip{
        display:flex;
        justify-content:space-between;
        border-bottom:1px solid #dedede;
        padding:0 .625rem;
        span{
            @include sc(.75rem,#666);
            line-height:2.1875rem;
        }
        span:nth-of-type(2){
            font-weight:bold;
        }
    }
    .city_content{
        display:flex;
        justify-content:space-between;
        line-height:2.5rem;
        padding:0 .625rem;
        span:nth-of-type(1){
            @include sc(1.125rem,#289bf0);
        }
        span:nth-of-type(2){
            @include sc(1.25rem,#666);
            font-weight:bold;
        }
    }
    .hot_city{
        width:100%;
        border-top:2px solid #e4e4e4;
        background:#fff;
        margin-bottom:.625rem;
        p{
            @include sc(.8125rem,#333);
            line-height:2.1875rem;
            padding-left:.625rem;
            border-bottom:1px solid #e4e4e4;
        }
        ul{
            width:100%;
            display:flex;
            flex-wrap:wrap;
            li{
                width:25%;
                text-align:center;
                border-right:1px solid #e4e4e4;
                box-sizing:border-box;
                border-bottom:1px solid #e4e4e4;
                @include sc(.875rem,#289bf0);
                line-height:2.5rem;
            }
        }
    }
    .ellipsis{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color:#333!important;
    }
</style>