<template>
    <div class="order">
        <header>
            <img src="../assets/images/return.svg" @click="returnPerson"  />
            <h3>订单详情</h3>
        </header>
        <div class="no-order">
            <img src="../assets/images/noOrder.svg" />
            <p>没有任何订单</p>
            <div>
                <img src="../assets/images/yixi.svg" />
            </div>
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

<style>
    .order{height:100%;overflow: hidden;}
    .order>header{display: flex;justify-content: center;position: relative;padding: 0 .5rem;height:1.17rem;align-items: center;font-size: 16px;background:#fff;box-shadow: 0 0 3px rgba(0,0,0,.1);}
    .order>header>img{position: absolute;width:16px;height:16px;left:.5rem;top:50%;margin-top:-8px;}
    .no-order{height:100%;position: relative;}
    .no-order>img{position: absolute;top:40%;left:43%}
    .no-order>p{position: absolute;top:53%;left:0;text-align: center;color:#aaa;font-size: 16px;width:100%;}
    .no-order>div{position: absolute;bottom: 2rem;width:100%;text-align: center}
</style>