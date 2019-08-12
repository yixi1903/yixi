<template>
    <div class="order">
        <header>
            <img src="../assets/images/return.svg" @click="returnPerson"  />
            <h3>收藏</h3>
        </header>
        <div class="no-order">
            <img src="../assets/images/noOrder.svg" />
            <p>还未收藏任何视频</p>
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

