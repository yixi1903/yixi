<template>  
    <div class="course">
        <div class="courseP">
            <p v-html="tits.description"></p>
        </div>
        <video :src="tits.video_url[0].video_url" :poster='tits.video_cover' controls width="100%"></video>
        <div class="xian"></div>
        <div class="list" v-for="c in curs" :key="c.id">
            <div class="fl"><img :src="c.cover" alt=""></div>
            <div class="fr">
                <h2>{{c.name}}</h2>
                <p>{{c.speaker_name}} - {{c.speaker_intro}}</p>
                <p class="frCon">{{c.wanxiang_intro}}</p>
            </div>
        </div>
        <div class="list" v-for="item in items" :key="item.id">
            <div class="fl coming"><img :src="item.cover" alt=""><span>即将上线</span></div>
            <div class="fr">
                <h2>{{item.name}}</h2>
                <p>{{item.speaker_name}} - {{item.speaker_intro}}</p>
                <p class="frCon">{{item.wanxiang_intro}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VueBetterScroll from 'vue2-better-scroll'
export default {
    data(){
        return {
            tits:[],
            curs:[],
            items:[]
        }
    },
    components: {
        VueBetterScroll
    },
    mounted(){
        axios.get("/api/h5/wanxiangs/")
        .then(res=>{
            console.log(res.data.data.expect_wanxiangs)
            this.curs=res.data.data.wanxiangs
            this.items=res.data.data.expect_wanxiangs
        }),
        axios.get("/api/h5/wanxiang/basic/?type_choice=1")
        .then(res=>{
            // console.log(res.data.data.wanxiang_basic)
            this.tits=res.data.data.wanxiang_basic
        })
        
    }
}
</script>
<style scoped>
img{vertical-align: top}
.course{background: #fff;padding: 0 .6rem;margin-top: 1px;margin-bottom: 70px}
.course .courseP{padding-top: 20px}
video{margin: 20px 0;object-fit:fill;}
.xian{height: 1px;width: 100%;background-color: rgb(235, 235, 235);}

/* list */
.list{margin-top: .6rem;display: flex;justify-content: space-between;position: relative;}
.fl>img{border-radius: .2rem;box-shadow: 0 0 1rem rgba(0,0,0,.1);width:3.733333rem /* 140/37.5 */}
.fr{width: 4rem /* 150/37.5 */;font-family: "软软雅黑";}
.fr>h2{font-weight: 500;margin-bottom: .213333rem /* 8/37.5 */}
.fr>p{line-height: .533333rem /* 20/37.5 */}
.fr .frCon{font-size: .266667rem /* 10/37.5 */;bottom: 0;position: absolute}
/* 即将上线 */
.coming{position: relative;}
.coming>span{position: absolute;left: 0;bottom: 0;line-height: 30px;width: 100%;color: #fff;background: rgba(206,9,0,.6);text-align: center;letter-spacing: 6px}

</style>
