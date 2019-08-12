<template>
<div>
    <homeShare v-if="share" :shareItem="shareItem" @share="shareHandle"></homeShare>
    <div class="home">
        <header>
            <h2>全部</h2>
            <img src="../assets/images/seach.svg" @click="goSearch"/>
        </header>
    </div>
    <div class="homeList">
        <main class="position-box"> 
            <vue-better-scroll class="wrapper"
                                ref="scroll"
                                :scrollbar="scrollbarObj"
                                :pullDownRefresh="pullDownRefreshObj"
                                :pullUpLoad="pullUpLoadObj"
                                :startY="parseInt(startY)"
                                 @pullingUp="onPullingUp"
                                 @pullingDown="onPullingDown">
                 <homeList :dataList="d" v-for="d in dataList" :key="d.id" @share="shareHandle" ></homeList>
             </vue-better-scroll>
        </main>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import homeList from '../components/homeList'
import homeShare from '../components/homeShare'
import Vue from 'vue'
import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll);

export default {
    data() {
        return {
            dataList:[],
            share:false,
            shareItem:{},
            page:1,
            scrollbarObj: {
                 fade: true
            },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
            pullDownRefreshObj: {
            threshold: 90,
            stop: 40
            },
            startY: 0, // 纵轴方向初始化位置
            scrollToX: 0,
            scrollToY: 0,
            scrollToTime: 700,
            pullUpLoadObj:{
                threshold: 50,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            }
        }
    },
    components:{
        homeList,homeShare,VueBetterScroll,
    },
    methods:{
        shareHandle(id){
            this.share=!this.share;
            if(this.share){
                document.getElementsByTagName("body")[0].style.overflow="hidden";
                this.shareItem=this.dataList.find(e=>id==e.id)
            }else{
                document.getElementsByTagName("body")[0].style.overflow="auto";
            }
        },
        goSearch(){
            this.$store.state.footerShow=false;
            this.$router.push("search");
        },
       
        //获取数据
        getData(n){
            axios.get('/api/h5/speeches/?page='+n+'&page_size=10')
            .then(res=>{
                document.getElementById('Loading').style.display="block"
                this.dataList=this.dataList.concat(res.data.data.items);
                this.$refs.scroll.forceUpdate(true)
                document.getElementById('Loading').style.display="none"
            })
        },
        onPullingUp() {
        // 模拟上拉加载
          this.page++;
          this.getData(this.page)
      },
        onPullingDown(){ this.$refs.scroll.forceUpdate(true)}
    },
    mounted() {
        this.$store.state.footerFlag=1;
        this.getData(1);
        this.$store.state.footerShow=true;
    },
    
}
</script>

<style scoped>
    .home{padding: 0 0.6rem;color: #333;position: fixed;z-index: 1;top:-1px;left:0;width:100%;box-sizing: border-box;box-shadow: 0 0 4px rgba(0,0,0,.1);background: #fff;}
    header{display: flex;position: relative;line-height:1.17rem;justify-content: center;}
    header>h2{font-weight: 550}
    header>img{position: absolute;right:0;width:.43rem;height:.43rem;top:.59rem;margin-top:-0.24rem;}
    main{top:48px !important;}
    .position-box {
        position: fixed;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>


