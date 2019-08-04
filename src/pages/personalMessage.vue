<template>
    <div>
        个人信息
        <h3 @click="loginOut">退出登录</h3>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    methods:{
        loginOut(){
            localStorage.token="";
            this.$router.push("/Home");
        }
    }
}
</script>
<style scoped>

</style>


