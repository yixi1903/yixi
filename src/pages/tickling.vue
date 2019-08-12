<template>
    <div class="order">
        <header>
            <img src="../assets/images/return.svg" @click="returnPerson"  />
            <h3>反馈建议</h3>
        </header>
        <div class="tickling-content">
            <img src="../assets/images/tickling.svg" />
            <textarea placeholder="在这里写下你遇到的问题与建议，每一条我们都会认真查看。感谢你帮助一席做的更好。" cols="60" rows="12"></textarea>
            <span>写完提交</span>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        //返回到上个页面
        returnPerson(){
            this.$router.push("/My")
        },
    },
    mounted(){
         this.$store.state.footerShow=false;
    }
}
</script>
<style scoped>
    .tickling-content{padding: 1.5rem .5rem;text-align: center}
    .tickling-content>img{width:34px;height:34px;margin-bottom: 1rem}
    .tickling-content>textarea{padding:.1rem .2rem;border:1px solid #c2c9d7;font-size: 10px;color:#aaa;width:100%;box-sizing: border-box;margin-bottom: 1.5rem} 
    .tickling-content>span{padding: .3rem 1rem;border:1px solid #ddd;border-radius:.6rem;font-size: 16px;}
</style>
