<template>
    <div>
        <header>
            <img src="../assets/images/return.svg" @click="returnPerson"  />
            <h3>关于一席</h3>
        </header>
        <div>
            <div class="logo-img">
                <video src="http://cdn.yixi.tv/aboutYixi-video.mp4" controls></video>
                <img src="../assets/images/aboutUs.png" v-if="posterShow"/>
                <img src="../assets/images/play.svg" v-if="posterShow" @click="play"/>
            </div>

            <div class="content">
                <div class="content-title">
                    <img src="../assets/images/xi.svg" />
                    <span>Get Inspired</span>
                </div>
                <h3>听君一席话,胜读十年书</h3>
                <p>一席鼓励分享见解、体验和对未来的想象，做有价值的传播。2012年成立于北京，一席现场演讲，目前在北京、上海、广州、杭州、深圳、武汉、香港、台北等城市举办。</p>
                <span>首次现场: 2012/08/26</span>
            </div>

            <div class="footer-logo">
                <img src="../assets/images/yixi.svg" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            posterShow:true,
        }
    },
    methods:{
        //返回到上个页面
        returnPerson(){
            this.$router.push("/My")
        },
        play(){
            this.posterShow=!this.posterShow;
            document.getElementsByClassName("logo-img")[0].getElementsByTagName("video")[0].play();
        }
    },
    mounted(){
         this.$store.state.footerShow=false;
    }
}
</script>

<style  scoped>
    header{display: flex;justify-content: center;position: relative;padding: 0 .5rem;height:1.17rem;align-items: center;font-size: 16px;background:#fff;box-shadow: 0 0 3px rgba(0,0,0,.1);}
    header>img{position: absolute;width:16px;height:16px;left:.5rem;top:50%;margin-top:-8px;}
    .logo-img{position: relative;}
    .logo-img>img:nth-of-type(1){width:100%;height:6rem;position: absolute;top:0;left:0;}
    .logo-img>img:nth-of-type(2){width:50px;height: 50px;position: absolute;top:50%;left:50%;margin-top:-25px;margin-left:-25px;}
    .logo-img>video{width:100%}
    .footer-logo{position: fixed;left:0;bottom:1rem;width:100%;text-align: center}
    .content{padding: .9rem .5rem;background:#fff;}
    .content-title{display: flex;align-items: center}
    .content-title>img{border-radius: 50%;margin-right:.7rem;width:.8rem;height:.8rem;}
    .content>h3{margin:.6rem 0;padding-left:1.5rem;font-size: 18px;}
    .content>p{padding-left:1.5rem;font-size: 14px;color:#aaa;margin-bottom: 1rem;}
    .content>span{padding-left:1.5rem;color:#777;}
</style>

