<template>
    <div class="share">
        <div class="shareTop">
            <span>长按图片保存分享</span>
            <em>or</em>
            <span>点击菜单分享<img src="../assets/images/share-top.svg"/></span>
        </div>
        <div class="shareSection">
            <div>
                <img :src="shareItem.video_cover" />
                <span>#{{shareItem.tag}}</span>
                <h3>{{shareItem.title}}</h3>
            </div>
            <div class="shareIntro">
                 <span>{{shareItem.speaker.name}}</span> - <span>{{shareItem.speaker.intro}}</span>
                 <p>{{shareItem.titlelanguage}}</p>
                 <small>一席第762讲者</small>
                 <strong>YiXi<small>人文 · 科技 · 白日梦</small></strong>
                 <div>
                     <img :src="qrCode.img" />
                     <p>长按查看</p>
                 </div>
                 <img src="../assets/images/shareExit.svg" class="exit" @click="exit"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:["shareItem"],
    data() {
        return {
            qrCode:""
        }
    },
    methods:{
        exit(){
           this.$emit("share",1)
        }
    },
    mounted(){
        axios.get("/api/h5/create/qrcode/?url=https:%2F%2Fwww.yixi.tv%2Fwx%2Fh5%2F%23%2Fspeech%2Fspeech%2F"+this.shareItem.id)
        .then(res=>{
            this.qrCode=res.data.data
            console.log(res.data.data)

        })
    }
}
</script>
<style scoped>
    .share{position: fixed;z-index: 100;top:0;left:0;width:100%;}
    .shareTop{height:1.17rem;background: #fff;display: flex;justify-content: space-around;width:100%;align-items: center;color:#333;}
    .shareSection{width:100%;height:1000px;background:rgba(0,0,0,.6);overflow: hidden;}
    .shareTop>span{vertical-align: middle}
    .shareTop>span>img{vertical-align: middle;margin-left:.4rem}
    .shareSection>div>img{width:7.2rem;height:4.8rem;}
    .shareSection>div:nth-of-type(1){text-align: center;margin: 0 auto;margin-top:1.6rem;position: relative;width:7.2rem;height:4.8rem;left:50;}
    .shareSection>div:nth-of-type(1)>span{display: inline-block;width:1.17rem;height:.6rem;background: rgb(209, 26, 26);position: absolute;right:0;top:.8rem;line-height: .6rem;color:#fff;font-size: 8px;}
    .shareSection>div:nth-of-type(1)>h3{color:#fff;position: absolute;left:.53rem;bottom: .8rem;font-size: .5rem;letter-spacing: 2px;}
    .shareIntro{background: #fff;width:7.2rem;margin:0 auto;font-size: 10px;padding: .3rem;box-sizing: border-box;position: relative}
    .shareIntro>p{margin:.3rem 0}
    .shareIntro>small{display: block;color:#666;font-size: 10px;margin-bottom:1.13rem;}
    .shareIntro>strong{color: rgb(209, 26, 26);font-size: 16px;}
    .shareIntro>strong>small{color:#888;font-size: 8px;font-weight: 400;margin-left:5px;}
    .shareIntro>div{position: absolute;right:.27rem;bottom:.53rem;}
    .shareIntro>div>p{color:#777;font-size: 8px;}
    .shareIntro>div>img{width:1.07rem;height:1.07rem}
    .exit{background:#fff;border-radius:50%;position: absolute;width:.9rem !important;height:.9rem !important;bottom: -1.5rem;left:3.6rem;margin-left:-0.45rem}
</style>


