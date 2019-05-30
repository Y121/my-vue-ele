<!--  -->
<template>
    <div class=''>
        <head-top signin-up="home">
            <span slot="logo" class="head_logo" @click="reload">ele.me</span>
        </head-top>
    </div>
</template>

<script>
import headTop from '../../components/header/header'
export default {
    components: {headTop},
    data() {
        return {

        };
    },
    methods:{
        reload(){
            window.location.reload();
        }
    }

}
</script>
<style lang='scss' scoped>
    .head_logo{
        position:absolute;
        left:.4rem;
        font:.75rem/1.95rem "微软雅黑";
        color:#fff;
    }
</style>