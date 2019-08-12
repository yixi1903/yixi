<template>
    <div>
        <header>
            <img src="../assets/images/return.svg" @click="returnHome"/>
            <h3>探索</h3>
        </header>
        <div class="search_div">
            <div class="search" @click="onFocus">
                <img src="../assets/images/search1.svg" v-if="searchShow"/>
                <img src="../assets/images/search2.svg" v-if="!searchShow" @click="search"/>
                <input placeholder="发现世界的另一面" @keyup.enter="search" v-model="searchText"/>
                <img src="../assets/images/shareExit.svg" class="img-delete" v-if="!searchShow" @click="onBlur($event)" id="imgDelete"/>
            </div>
        </div>
        <div class="tips" v-if="searchShow">
            <div><span></span><label>标签</label></div>
            <swiper :options="swiperOption" ref="mySwiper" class="tipList">
                <swiper-slide v-for="t in tipsList" :key="t.id" class="listItem">
                    <img :src="t.img" />
                    <p>{{t.title}}</p>
                </swiper-slide>
             </swiper>
        </div>
        <div class="type" v-if="searchShow">
            <div><span></span><label>分类</label></div>
            <ul>
                <li>
                    <img src="../assets/images/treeChild.jpg"/>
                    <p>枝桠</p>
                </li>
                <li>
                    <img src="../assets/images/record.jpg"/>
                    <p>专辑</p>
                </li>
                <li>
                    <img src="../assets/images/album.jpg"/>
                    <p>记录</p>
                </li>
            </ul>
        </div>

        <div class="search-history" v-if="!searchShow">
            <div><span></span><label>搜索历史</label></div>
            <ul>
                <li>建筑</li>
                <li>建筑</li>
            </ul>
        </div>

        <div class="search-result" v-if="resultShow">
            <div><span></span><label>搜索结果</label></div>
            <ul>
                <li v-for="s in searchList" :key="s.id">
                    <div class="sr-img"><img  :src="s.video_cover"/></div>
                    <div class="sr-content">
                        <h3>{{s.title}}</h3>
                        <p>{{s.name}} 一席第{{s.name}}位讲者</p>
                        <span>演讲</span>
                    </div>
                    <div class="sr-play"><img src="../assets/images/play.svg"/></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            searchShow:true,
            tipsList:[],
            searchText:"",
            searchList:[],
            resultShow:false,
            swiperOption: {
                slidesPerView: 4,
                spaceBetween: 18,
            }
        }
    },
    components:{
        swiper,swiperSlide
    },
    mounted(){
        this.$store.state.footerShow=false;
        axios.get('/api/h5/tags/?page=1&page_size=10')
        .then(res=>{
            this.tipsList=res.data.data.items
            console.log(res.data)
        })
    },
    methods:{
        returnHome(){
            // console.log(this.$route.query)
            if(this.$route.query.id==100){
                this.$router.push("showMore")
            }else{
                this.$store.state.footerShow=true;
                document.getElementById('Loading').style.display="block"
                this.$router.push("home");
            }
        },
        onFocus(){
            if(this.searchShow)
            {
                this.searchShow=!this.searchShow;
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].focus();
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].style.border="1px solid yellow"
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].style.borderBottom="0px solid yellow"            
            }
        },
        onBlur(e){
            if(e.id="imgDelete"){
                event.stopPropagation()
                this.searchShow=!this.searchShow;
                this.resultShow=false;
                this.searchText="";
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].blur();
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].style.border="0px solid yellow";
                document.getElementsByClassName("search")[0].getElementsByTagName("input")[0].value=""

            }
        },
        search(){
            axios.get('/api/h5/search/new/?keyword='+this.searchText+'&page=1&page_size=10')
            .then(res=>{
                this.searchList=res.data.data.items;
                this.resultShow=!this.resultShow;
                console.log(res.data.data)
            })
        }
    }
}
</script>
<style scoped>
    header{padding: 0 0.5rem;height:1.17rem;display: flex;justify-content: center;align-items: center;position: relative;box-shadow: 0 0 4px rgba(0,0,0,.1);background: #fff;}
    header>img{position: absolute;left:.5rem;width:.43rem;height:.43rem;margin-top:-8px;top:50%}
    header>h3{font-size: 16px;font-weight: 550}
    .search_div{padding: .3rem .5rem;background: #fff}
    .search{width:93%;border: .3px solid rgba(194,201,215,.4);box-shadow: 0 0 4px rgba(0,0,0,.1);border-radius: .6rem;height:.8rem;margin:0 auto;padding:.2rem .4rem;display: flex;align-items: center;position: relative;}
    .search>input{border:none;font-size: 11px;color:#666;outline: none;width:70%;height:90%;}
    .search>img{width:16px;height:16px;margin-right:.5rem}
    .img-delete{position: absolute;top:50%;margin-top:-8px;width:16px;height:16px;right:.2rem;cursor: pointer;}
    .tips{padding:.5rem 0;background:#fff;margin-top:.2rem}
    .tips>div:nth-of-type(1){padding: 0 .5rem;display: flex;align-items: center;color:#333333;font-size: 16px;margin-bottom: 15px;}
    .tips>div>span{display: inline-block;width:4px;height:4px;background: #ce0900;border-radius: 50%;margin-right:7px;}
    .listItem>img{height:.8rem;width:auto;margin-top:.3rem;margin-bottom: .1rem}
    .listItem{text-align: center;border-radius: .1rem;width:1.9rem !important;height:1.9rem;border:1px solid #c2c9d7;box-shadow: 0 0 4px rgba(0,0,0,.1)}
    .listItem>p{font-size: 12px}
    .tipList{padding-left:.37rem}
    .type{margin-top:.2rem;padding: .4rem .5rem;background:#fff;}
    .type>div:nth-of-type(1){display: flex;align-items: center;color:#333333;font-size: 16px;margin-bottom: 15px;}
    .type>div>span{display: inline-block;width:4px;height:4px;background: #ce0900;border-radius: 50%;margin-right:7px;}
    .type>ul{display: flex;list-style: none;justify-content: space-between}
    .type>ul>li{    box-shadow: 0 0 4px rgba(0,0,0,.2);}
    .type>ul>li>img{width:2.7rem;height:2.7rem;}
    .type>ul>li>p{font-size: 16px;text-align: center;margin:10px 0;}
    .search-history{margin-top:.2rem;padding: .4rem .5rem;background:#fff;}
    .search-history>div>span{display: inline-block;width:4px;height:4px;background: #ce0900;border-radius: 50%;margin-right:7px;}
    .search-history>ul{list-style: none;padding: 0;display: flex;padding-top:.5rem}
    .search-history>ul>li{padding: .18rem .35rem;border: 1px solid #c2c9d7;margin-right:.5rem}

    .search-result{margin-top:.2rem;padding: .4rem .5rem;background:#fff;}
    .search-result>div>span{display: inline-block;width:4px;height:4px;background: #ce0900;border-radius: 50%;margin-right:7px;}
    .search-result>ul>li{display: flex;margin-top:.2rem}
    .sr-content{margin-left:.5rem;position: relative;color:#777;}
    .sr-content>h3{font-weight: 550;margin-bottom: .1rem}
    .sr-content>span{position: absolute;bottom: .1rem}
</style>


