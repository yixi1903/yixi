<template>
    <div class="vip">
        <div class="top">
            <div>
                <img src="../assets/images/card.jpg" alt="">
            </div>
            <Content/>
        </div>
    </div>
</template>

<script>

import Content from '../components/Content'
export default {
    components:{Content},
    mounted(){
        this.$store.state.footerFlag=3;
    }
}
</script>


<style scoped>
.vip{height: 100%}
.top{position: relative;width: 100%;height: 6.4rem /* 240/37.5 */;top: 0;}
.top>div>img{position:absolute; width: 280px; box-shadow: 0 1.5rem 5rem rgba(0,0,0,.1), 0 0 0.8rem rgba(0,0,0,.1);left: 50%;margin-left: -3.733333rem /* 140/37.5 */;top: 50%;margin-top: -73px}
</style>

