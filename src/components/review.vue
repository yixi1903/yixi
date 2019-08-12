<template>
        <div class="reviewList">
            <img :src="List.user.avater"/>
            <div>
                <div>
                    <div class="user">
                        <p>{{List.user.nickname}}</p>
                        <span>{{List.created}}</span>
                    </div>
                    <div class="content">
                        <span>{{List.like_count}}</span>
                        <img src='../assets/images/praise.svg' @click="add" v-if="praiseShow"/>
                        <img src='../assets/images/praised.svg' @click="sub" v-if="!praiseShow"/>
                    </div>
                </div>
                <p>{{reviewList.content}}</p>
            </div>
        </div>
</template>
<script>
export default {
    props:["reviewList"],
    data(){
        return{
            List:{},
            praiseShow:true
        }
    },
    methods:{
        add(){
            this.List.like_count++;
            this.praiseShow=!this.praiseShow
        },
        sub(){
            this.List.like_count--;
            this.praiseShow=!this.praiseShow
        }
    },
    mounted(){
        this.List=this.reviewList;
    }
}
</script>
<style scoped>
    .reviewList{padding: .5rem .5rem 0 .5rem;display: flex;justify-content: space-between}
    .reviewList>img{width:.8rem;height:.8rem;border-radius: 50%}
    .reviewList>div{width:100%;padding-bottom: .5rem;border-bottom: 1px solid #ddd;margin-left:.5rem}
    .reviewList>div>div{display: flex;justify-content: space-between}
    .user{display: flex;}
    .user>p{font-size: 14px;}
    .user>span{font-size: 11px;margin-top:.08rem;margin-left:.3rem}
    .content{display: flex;align-items: center;font-size: 10px;}
    .content>img{width:16px;height:16px;margin-left:.1rem}
    .reviewList>div>p{margin-top:.2rem}
</style>

