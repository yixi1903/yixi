<template>
    <div>
        <div class="head"><img src="../assets/images/return.svg" class="icon" @click="return1">现场详情</div>
        <div class="foot">本场视频制作剪辑中</div>
        <div class="bg"> 
            <img :src="tit.cover" alt="" >
            <div class="tit">
                <h2>{{tit.title}}</h2>
                <p>一席现场 第{{tit.periods}}期</p>
                <div class="xian"></div>
                <p>时间：{{tit.activity_date.replace(/\./g,"-")}}</p>
                <p class="inde">{{tit.screening_infos[0].name}}：{{tit.screening_infos[0].begin_time}}-{{tit.screening_infos[0].end_time}}</p>
                <p>地点：{{tit.address}}</p>
            </div>
        </div>
        <div class="fen"></div>
        <div class="secend">
            <div class="dan">
                <img class="pic" src="../assets/images/scene-change.svg" alt="" >
                <span>单场讲者介绍</span>
            </div>
            
            <div v-for="t in txt">
                <img v-if="show1" :src="t.speech_cover || t.cover_url" alt="" class="pic1">
                <h4>{{t.speaker_name}} - {{t.speaker_intro}}</h4>
            
                <img src="../assets/images/yin.svg" alt="" class="pic yin">
                <p class="span" v-html="t.quotations || t.titlelanguage"></p> 
                <p class="p" v-html="t.describe" v-if="show"></p>
                <div class="xian"></div>
                
            </div>
            
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            tit:[],
            txt:[],
            show:true,
            show1:true
        }
    },
    mounted(){
        let id=this.$route.params.id
        axios.get("/api/h5/activity/"+id)
        .then(res=>{
            this.tit=res.data.data.activity
            this.txt=res.data.data.item_one
            console.log(res.data.data.item_one)
        })
        if(id==100){
            this.show=false
        };
        if(id==99){
            this.show1=false
        };


    },
    methods:{
        return1(){
            this.$router.push("/scene")
        }
    }
}
</script>

<style scoped>
img{vertical-align: middle;width: 100%;}
.icon{width: 16px;height: 16px; position: absolute;top: calc(50% - 9px);left: 16px}
.head{box-shadow: 0 0 1rem rgba(0,0,0,.1);position: fixed;top: 0;width: 100%;height:1.253333rem /* 47/37.5 */;background: #fff;z-index: 10;text-align: center;line-height:1.253333rem ;font-size: .426667rem /* 16/37.5 */ ;font-weight: 800;font-size: .48rem /* 18/37.5 */}
.foot{position: fixed;bottom: 0;width: 100%;height:1.253333rem /* 47/37.5 */;background: #fff;z-index: 21;text-align: center;line-height:1.253333rem ;font-size: .426667rem /* 16/37.5 */ }
.bg{margin-top: 1.253333rem;background-color: #fff;padding-bottom: .533333rem /* 20/37.5 */}
.tit{padding: 0 .6rem;font-family: "微软雅黑";text-align: left}
h2{font-size: .533333rem /* 20/37.5 */;font-weight: 500;margin: .266667rem /* 10/37.5 */ 0}
p{margin: .213333rem /* 8/37.5 */ 0;color: #333}
.xian{height: 1px;width: 100%;background-color: rgb(235, 235, 235);margin:16px 0}
.inde{text-indent: .96rem /* 36/37.5 */;font-size: .266667rem /* 10/37.5 */}
.fen{height: .266667rem /* 10/37.5 */;background: rgb(245, 247, 248)}
.secend{padding: 0 .6rem .6rem;margin-bottom:1.226667rem /* 46/37.5 */ ;background: #fff}
.secend>.dan{line-height: 1.6rem }
.secend>div>span{margin-left: .266667rem /* 10/37.5 */}
.pic{width: 18px;}
.yin{position: relative;top: 16px}
.span{margin:0 0 0 30px;line-height: 20px;}
h4{font-size: 15px;line-height: 40px}
.p{line-height: 16px;font-size: 13px}
.pic1{margin-bottom: 20px}



</style>


