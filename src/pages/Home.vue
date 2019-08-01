<template>
<div>
    <homeShare v-if="share" :shareItem="shareItem" @share="shareHandle"></homeShare>
    <div class="home">
        <header>
            <h2>全部</h2>
            <img src="../assets/images/seach.svg"/>
        </header>
    </div>
    <div class="homeList">
         <homeList :dataList="d" v-for="d in dataList" :key="d.id" @share="shareHandle"></homeList>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import homeList from '../components/homeList'
import homeShare from '../components/homeShare'
export default {
    data() {
        return {
            dataList:[],
            share:false,
            shareItem:{}
        }
    },
    components:{
        homeList,homeShare
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
        }
    },
    mounted() {
        axios.get('/api/h5/speeches/?page=1&page_size=10')
        .then(res=>{
            this.dataList=res.data.data.items;
            console.log(res.data.data.items)
        })
    },
    
}
</script>

<style scoped>
    .home{padding: 0 0.6rem;color: #333;position: fixed;z-index: 1;top:-1px;left:0;width:100%;box-sizing: border-box;box-shadow: 0 0 4px rgba(0,0,0,.1);background: #fff;}
    header{display: flex;position: relative;line-height:1.17rem;justify-content: center;}
    header>h2{font-weight: 550}
    header>img{position: absolute;right:0;width:.43rem;height:.43rem;top:.59rem;margin-top:-0.24rem;}
    .homeList{margin-top:1.6rem;}
</style>


