<template>
    <div>
        <homeShare v-if="share" :shareItem="shareItem" @share="shareHandle"></homeShare>

        <div class="video">
            <video :src='speechData.speech.video_url[0].video_url' controls width="100%"></video>
            <img :src="speechData.speech.video_cover" v-if="posterShow"/>
            <img src="../assets/images/play.svg" @click="videoPlay" v-if="posterShow"/>
        </div>
        <div class="content">
            <div class="speecher">
                <h3>{{speechData.speech.title}}</h3>
                <div>
                    <img :src="speechData.speech.speaker.avatar" />
                    <span>{{speechData.speech.speaker.name}} - </span>
                    <span>{{speechData.speech.speaker.intro}}</span>
                </div>
                <p>{{speechData.speech.titlelanguage}}</p>
                <div class="div-small">
                    <small>{{speechData.speech.created}}</small>
                    <small>{{speechData.speech.play_count}}次观看</small>
                </div>
            </div>

            <div class="all-content" @click="show"> 
                <span>查看完整文稿</span>
                <img src="../assets/images/allContent.svg"/>
            </div>

            <div class="recommend">
                <div class="re-top">
                    <img src="../assets/images/praise.svg" />
                    <span>为你推荐</span>
                </div>
                <ul>
                    <li v-for="v in speechData.recommend_speeches" :key="v.id" @click="goSpeechDetails(v.id)">
                        <div class="div-img">
                            <img :src="v.video_cover" />
                        </div>
                        <div class="div-middle">
                            <h4>{{v.title}}</h4>
                            <p>{{v.name}} 一席第{{v.speaker.id}}讲者</p>
                            <p>{{v.play_count}}次观看</p>
                        </div>
                        <div class="div-right">
                            <img src="../assets/images/right.svg" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="foot">
            <div class="foot-edit" @click="review">
                <img src="../assets/images/edit.svg" />
                <input placeholder="分享你的看法" name="shareTxt"/>
            </div>
            <div>

                <div @click="showReview">
                    <img src="../assets/images/review.svg" v-if="reviewIcon"/>
                    <img src="../assets/images/cancelReview.svg" v-if="!reviewIcon"/>
                    <span v-if="reviewIcon">{{speechData.comment_count}}</span>
                </div>
                <img src="../assets/images/collect.svg" @click="collect" v-if="collectShow"/>
                <img src="../assets/images/collected.svg" @click="collect" v-if="!collectShow"/>

                <img src="../assets/images/share.svg" @click="shareHandle"/>
            </div>
        </div>

        <div class="article">
            <div class="exit-img" @click="exit">
                <img src="../assets/images/shareExit.svg" />
            </div>
            <div class="article-content">
                <div class="art-title">
                    <h3>{{speechData.speech.title}}</h3>
                    <span>{{speechData.speech.speaker.name}} - {{speechData.speech.speaker.intro}}</span>
                </div>
                <div class="art-content" v-html="speechData.speech.draft">
                </div>
            </div>
        </div>

        <div class="review" v-if="viewShow">
            <h3>评论</h3>
            <main class="position-box"> 
            <vue-better-scroll class="wrapper"
                                ref="scroll"
                                :pullUpLoad="pullUpLoadObj"
                                :startY="parseInt(startY)"
                                 @pullingUp="onPullingUp"
                                >
                <review v-for="r in reviewData" :reviewList="r" :key="r.id"></review>
            </vue-better-scroll>
            </main>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import review from '../components/review'
import homeShare from '../components/homeShare'
import Vue from 'vue'
import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll);
export default {
    components:{
        review,
        VueBetterScroll,
        homeShare,
    },
    data() {
        return {
            speechData:{},
            posterShow:true,
            reviewData:[],
            viewShow:false,
            viewPage:1,
            collectShow:true,
            reviewIcon:true,
            shareItem:{},
            share:false,
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
   
    mounted(){
        this.$store.state.footerShow=false
        axios.get('/api/h5/speech/'+this.$route.params.id)
        .then(res=>{
            this.speechData=res.data.data;
            console.log(this.speechData)
            document.getElementById('Loading').style.display="none"            
        })
    },
    methods:{
        onPullingUp() {
        // 模拟上拉加载
           this.viewPage++;
           axios.get('/api/h5/comments/?page='+this.viewPage+'&page_size=10&speech_id='+this.speechData.speech.id)
                .then(res=>{
                    this.reviewData=this.reviewData.concat(res.data.data.items);
                    this.$refs.scroll.forceUpdate(true);
                })
            },
        goSpeechDetails(id){
            this.$store.state.id=id;
            this.$router.push('/speechDetails/'+id);
            this.$router.go(0)
        },
        videoPlay(){
            this.posterShow=!this.posterShow;
            document.getElementsByClassName("video")[0].getElementsByTagName("video")[0].play();
        },
        show(){
            $(".article").slideDown(1000);  
        },
        exit(){
             $(".article").slideUp(1000);           
        },
        review(){
             let token = localStorage.token;
             axios.post('http://101.37.76.177:8000/checkUser',  {token:token})
            .then(res=>{
                console.log(res.data);
                if(res.data.status==10010){
                    this.$store.state.flag=1;
                    this.$store.state.id=this.$route.params.id;
                    this.$router.push("/login");
                }else if(res.data.status==10000){
                    this.show=!this.show;
                }
            })
        },

        //查看评论
        showReview(){
            let token=localStorage.token;
            if(token){
                 axios.post('http://101.37.76.177:8000/checkUser',  {token:token})
                .then(res=>{
                    console.log(res.data);
                    if(res.data.status==10010){
                        this.$store.state.flag=1;
                        this.$store.state.id=this.speechData.speech.id;
                        this.$router.push("/login");
                    }else if(res.data.status==10000){
                        this.viewShow=!this.viewShow;
                        this.reviewIcon=!this.reviewIcon;
                        axios.get('/api/h5/comments/?page='+1+'&page_size=10&speech_id='+this.speechData.speech.id)
                        .then(res=>{
                            this.reviewData=res.data.data.items;
                        })
                    }
                })
            }else{
                this.$router.push("/login")
            }
        },

        //加入收藏
        collect(){
            let token=localStorage.token;
            if(token){
                 axios.post('http://101.37.76.177:8000/checkUser',  {token:token})
                .then(res=>{
                    console.log(res.data);
                    if(res.data.status==10010){
                        this.$store.state.flag=1;
                        this.$store.state.id=this.speechData.speech.id;
                        this.$router.push("/login");
                    }else if(res.data.status==10000){
                        this.collectShow=!this.collectShow;
                    }
                })
            }else{
                this.$router.push("/login")
            }
        },

        //分享绘制海报
        shareHandle(){
            this.share=!this.share;
            if(this.share){
                document.getElementsByTagName("body")[0].style.overflow="hidden";
                this.shareItem=this.speechData.speech;                
            }else{
                document.getElementsByTagName("body")[0].style.overflow="auto";
            }
        }
    }
}
</script>
<style scoped>
    .video{position: fixed;background: #fff;z-index:1;width:100%;}
    .video>video{height:5.68rem}
    .video>img:nth-of-type(1){position: absolute;width:100%;height:100%;top:0;left:0;}
    .video>img:nth-of-type(2){position: absolute;top:50%;left:50%;margin-top:-25px;margin-left:-25px;width:50px;height:50px;}
    .content{padding:6.2rem .5rem .5rem 1.5rem}
    .speecher>h3{font-size: 22px;margin-bottom:.4rem}
    .speecher>div{display: flex;align-items: center}
    .speecher>div>img{width:30px;height:30px;border-radius: 50%;margin-left:-1.2rem}
    .speecher>div>span{font-size: 14px;color:#999}
    .speecher>div>span:nth-of-type(1){margin-left:.4rem}
    .speecher>p{font-size: 14px;color:#999;line-height:.55rem;margin-top:.15rem}
    .div-small{display: flex;justify-content: space-between;margin-top:.3rem;}
    .div-small>small{color:#999;font-size: 12px;}
    .all-content{text-align: center;margin-top:1rem;margin-left:-.6rem}
    .all-content>img{vertical-align: middle;margin-left:.4rem}
    .all-content>span{vertical-align: middle}
    .re-top{display: flex;align-content: center;margin-top:1.4rem}
    .re-top>img{margin-left:-1.1rem}
    .re-top>span{margin-left:.5rem;font-size: 14px;color:#777}
    .recommend{padding-bottom: 1.17rem}
    .recommend>ul>li{display: flex;margin-top:.3rem;position: relative;}
    .div-img{width:3rem;margin-right:.3rem;height:1.8rem}
    .div-img>img{width:100%;height:100%}
    .div-middle>p:nth-of-type(1){margin-top:.2rem;color:#999;}
    .div-middle>p:nth-of-type(2){margin-top:.4rem;color:#999;}
    .div-right{position: absolute;right:0;top:50%;margin-top:-8px}


    .foot{position: fixed;bottom:0;left:0;width:100%;height:1.17rem;background:#fff;box-sizing: border-box;z-index:3;

    display: flex;justify-content: space-between;padding: 0 .5rem 0 .8rem;align-items: center;box-shadow: 0 0 3px rgba(0,0,0,.2)}
    .foot img{width:16px;height:16px;}
    .foot>div{display: flex;align-items: center}
    .foot>div:nth-of-type(2)>img{margin-left:.5rem}
    .foot>div:nth-of-type(1)>input{margin-left:.4rem;color:#777;background:#f7f7f7;outline: none;border:none}
    .foot-edit{border-radius:.5rem;background: #f7f7f7;padding: .2rem}
    .foot>div>div{position: relative}
    .foot>div>div>span{position: absolute;top:-.2rem;right:-.2rem;background:#ce0900;padding: 0 .1rem;color:#fff;font-size: 10px;line-height: 10px}

   

    .article{position: fixed;z-index:2;top:6rem;background: #fff;width:100%;padding: 0 .8rem;

    box-sizing: border-box;display: none;height:100%;overflow-y: scroll}
    .exit-img{position: fixed;z-index:3;bottom:1rem;left:50%;width:26px;height:26px;margin-left:-13px;
    background: #fff;border-radius: 50%}
    .exit-img>img{width:100%;height:100%;}
    .art-title{padding-bottom: .5rem;border-bottom: 1px dashed #dee3e9;margin-bottom: .7rem}
    .art-title>h3{font-size: 22px;margin-bottom:.3rem;}
    .art-title>span{color:#666;}
    .art-content>p{color:#555 ;}


    .active{height: 0;overflow: hidden;}

    .review{position: fixed;left:0;width:100%;top:6rem;bottom:1.17rem;z-index:2;background:#fff;overflow-y: scroll;height:auto;}
    .review>h3{padding:0.1rem 0 .3rem 1.8rem;font-size: .48rem;border-bottom: 1px solid #ddd}

    .position-box {
        top:7rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .art-content>p>img{width:100%}

    .active{height: 0;overflow: hidden;}
</style>



