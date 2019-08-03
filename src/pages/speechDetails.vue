<template>
    <div>
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
            <div>
                <img src="../assets/images/edit.svg" />
                <span>分享你的看法</span>
            </div>
            <div>
                <img src="../assets/images/review.svg" />
                <img src="../assets/images/collect.svg" />
                <img src="../assets/images/share.svg" />
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
    </div>
</template>
<script>
import axios from'axios'
export default {
    data() {
        return {
            speechData:{},
            posterShow:true,
        }
    },
    mounted(){
        this.$store.state.footerShow=false
        axios.get('/api/h5/speech/'+this.$route.params.id)
        .then(res=>{
            this.speechData=res.data.data;
            console.log(this.speechData)
        })
    },
    methods:{
        goSpeechDetails(id){
            this.$router.push('/speechDetails/'+id);
            this.$router.go(0)
        },
        videoPlay(){
            this.posterShow=!this.posterShow;
            document.getElementsByClassName("video")[0].getElementsByTagName("video")[0].play();
        },
        show(){
            // document.getElementsByClassName("article")[0].classList.remove("active");
            $(".article").slideDown(1000);  
        },
        exit(){
            // document.getElementsByClassName("article")[0].classList.add("active")
             $(".article").slideUp();           

        }
    }
}
</script>
<style scoped>
    .video{position: fixed;background: #fff;z-index:1}
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
    .recommend>ul>li{display: flex;margin-top:.3rem;position: relative;}
    .div-img{width:3rem;margin-right:.3rem;height:1.8rem}
    .div-img>img{width:100%;height:100%}
    .div-middle>p:nth-of-type(1){margin-top:.2rem;color:#999;}
    .div-middle>p:nth-of-type(2){margin-top:.4rem;color:#999;}
    .div-right{position: absolute;right:0;top:50%;margin-top:-8px}

    .foot{position: fixed;bottom:0;left:0;width:100%;height:1.17rem;background:#fff;box-sizing: border-box;
    display: flex;justify-content: space-between;padding: 0 .5rem 0 .8rem;align-items: center;box-shadow: 0 0 3px rgba(0,0,0,.2)}
    .foot img{width:16px;height:16px;}
    .foot>div{display: flex;align-items: center}
    .foot>div:nth-of-type(2)>img{margin-left:.5rem}
    .foot>div:nth-of-type(1)>span{margin-left:.4rem;color:#777;}

    .article{position: fixed;z-index:2;top:6.2rem;background: #fff;width:100%;padding: 0 .8rem;
    box-sizing: border-box;display: none;height:100%;overflow-y: scroll}
    .exit-img{position: fixed;z-index:3;bottom:1rem;left:50%;width:26px;height:26px;margin-left:-13px;
    background: #fff;}
    .exit-img>img{width:100%;height:100%;}
    .art-title{padding-bottom: .5rem;border-bottom: 1px dashed #dee3e9;margin-bottom: .7rem}
    .art-title>h3{font-size: 22px;margin-bottom:.3rem;}
    .art-title>span{color:#666;}
    .art-content>p{color:#555 ;}

    .active{height: 0;overflow: hidden;}
</style>



