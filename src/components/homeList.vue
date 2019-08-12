<template>
<div class="data">
    <div class="dataList" @click="goSpeechDetails(dataList.id)">
        <div class="img">
            <div></div>
            <img :src='dataList.video_cover' />
            <span>{{dataList.title}}</span>
        </div>
        <div class="content">
            <span>{{dataList.speaker.name}}</span> - <span>{{dataList.speaker.intro}}</span>
            <p>{{dataList.titlelanguage}}</p>
            <div>
                <div>
                    <span>#{{dataList.tag}}</span>
                    <label>{{dataList.created}}</label>
                </div>
                <div>
                    <img src="../assets/images/collect.svg" @click="goLogin()" v-if="show" />
                    <img src="../assets/images/collected.svg" @click="goLogin()" v-if="!show" />
                    <img src="../assets/images/share.svg" @click="share(dataList.id)" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    props:["dataList"],
    data(){
        return{
           show:true
        }
    },
    mounted(){
        // if(localStorage.token){
        //     axios.get('http://127.0.0.1:4000/getCollect?uid='+localStorage.phone)
        //     .then(res=>{
        //         console.log(res)
        //         console.log(this.dataList)
        //         for(let i=0;i<res.data.length;i++){
        //            if(this.dataList.id=res.data[i].col_cid){

        //            }
        //         }
        //     })
        // }
    },
    // updated(){
    //     if(localStorage.token){
    //         axios.get('http://127.0.0.1:4000/getCollect?uid='+localStorage.phone)
    //         .then(res=>{console.log(res)})
    //     }
    // },
    methods:{
        share(id){
            event.stopPropagation();
            this.$emit("share",id);
        },
        goLogin(){
             event.stopPropagation();
             let token = localStorage.token;
             axios.post('http://101.37.76.177:8000/checkUser',  {token:token})
            .then(res=>{
                console.log(res.data);
                if(res.data.status==10010){
                      this.$store.state.flag=0;
                    this.$router.push("login");
                }else if(res.data.status==10000){
                    this.show=!this.show;
                }
            })
         
                     //加入收藏
                    // axios.get('http://127.0.0.1:8000/collect?uid='+localStorage.phone+'&cid='+id)
                    // .then(res=>{console.log(res)}  
        },
         goSpeechDetails(id){
             console.log(id)
            this.$store.state.footerShow=false;
            this.$router.push('speechDetails/'+id)
        },
             
            // axios.post('http://127.0.0.1:4000/checkUser',{
            //     headers: { Authorization:token}
            // }).then(res=>{
            //     console.log(res);
            //     this.$store.state.status=false;
            // })
         
    }
}
</script>
<style scoped>
    .data{padding: 0 .6rem .5rem .6rem}
    .dataList{box-shadow: 0 0 10px rgba(0,0,0,.2);border-radius: 4px;}
    .dataList>div>img{width:100%}
    .content{padding: .5rem .5rem}
    .img{position: relative;}
    .img>span{color:#fff;position: absolute;left:.53rem;bottom: .8rem;font-size: .5rem;letter-spacing: 2px;}
    .img>div{left:0;width:100%;height:50%;bottom: 0;background: linear-gradient(180deg,transparent,rgba(0,0,0,.5));}
    .content>p{
        margin:.3rem 0;
    }
    .content>div{color:#4a4a4a;font-size: 10px;display: flex;justify-content: space-between;align-items: center}
    .content>div>span{margin-right:10px;}
    .content>div>div>img{width:16px;height:16px;}
    .content>div>div>img:nth-of-type(1){margin-right:.51rem}
</style>
