<template>
    <div>
        <header>
            <img src="../assets/images/return.svg" @click="returnHome"/>
            <h3>探索</h3>
        </header>
    </div>
</template>
<script>
export default {
    mounted(){
       
    },
    methods:{
        returnHome(){
            this.$store.state.footerShow=true;
            this.$router.push("home")
        }
    }
}
</script>
<style scoped>
    header{display: flex;height:1.17rem;justify-content: center;align-items: center;position: relative;padding: 0 .5rem;}
    header>img{position: absolute;left:.5rem;width:.43rem;height:.43rem}
    header>h3{font-size: 16px;font-weight: 550}
</style>


