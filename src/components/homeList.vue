<template>
<div class="data">
    <div class="dataList">
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
                    <img src="../assets/images/collect.svg" />
                    <img src="../assets/images/share.svg" @click="share(dataList.id)" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:["dataList"],
    methods:{
        share(id){
            this.$emit("share",id);
        }
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
