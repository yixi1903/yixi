<template>
    <div>
        <header class="mine">
            <h3>我</h3>
            <img src="../assets/images/setting.svg" @click="goLogin"/>
        </header>
        <div class="login-status">
            <img src="../assets/images/headPortrait.png" />
            <span>{{loginMessage}}</span>
        </div>

        <div class="items">
            <div>
                <img src="../assets/images/order.svg" />
                <span>订单</span>
            </div>
            <img src="../assets/images/right.svg" />
        </div>
        <div class="items">
            <div>
                <img src="../assets/images/collect.svg" />
                <span>收藏</span>
            </div>
            <img src="../assets/images/right.svg" />
        </div>
        <div class="items">
            <div>
                <img src="../assets/images/review.svg" />
                <span>评论</span>
            </div>
            <img src="../assets/images/right.svg" />
        </div>
        <div class="items">
            <div>
                <img src="../assets/images/suggest.svg" />
                <span>反馈建议</span>
            </div>
            <img src="../assets/images/right.svg" />
        </div>
        <div class="items">
            <div>
                <img src="../assets/images/aboutyixi.svg" />
                <span>关于一席</span>
            </div>
            <img src="../assets/images/right.svg" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            loginMessage:"未登录"
        }
    },
    methods:{
        goLogin(){
            let token = localStorage.token;
             axios.post('http://127.0.0.1:8000/checkUser', {token:token})
            .then(res=>{
                console.log(res.data);
                if(res.data.status==10010){
                    this.$router.push("login");
                    this.$store.state.flag=2;
                }else if(res.data.status==10000){
                    this.$router.push("personalMessage/"+localStorage.phone);                    
                }
            })
        }
    },
    mounted(){
        this.$store.state.footerFlag=4;
        this.$store.state.footerShow=true;

        let token = localStorage.token;
        console.log(localStorage)
        axios.post('http://127.0.0.1:8000/checkUser', {token:token})
        .then(res=>{
            console.log(res.data);
            if(res.data.status==10010){
                console.log(1)
               this.loginMessage="未登录";              
            }else if(res.data.status==10000){
                console.log(2)
                let phone=localStorage.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
               this.loginMessage=phone;
            }
        })
    }
}
</script>
<style scoped>
    header{display:flex;justify-content: center;position: relative;height:1.17rem;align-items: center;font-size: 18px;background:#fff;}
    header>img{width:16px;height:16px;position: absolute;top:50%;margin-top:-8px;right:.5rem}
    .login-status{margin-top:.1rem;background:#fff;padding: .9rem 1.3rem 1.1rem 1.3rem;margin-bottom: .25rem}
    .login-status>img{width:1.5rem;height:1.5rem;vertical-align: middle}
    .login-status>span{font-size: 18px;font-weight: 600;vertical-align: middle;margin-left:1.5rem}
    .items{background:#fff;padding: .3rem .5rem .3rem 1rem;display: flex;justify-content: space-between;border-top:1px solid #fafbfc}
    .items img{width:16px;height: 16px;}
    .items:nth-of-type(5){margin-top:.25rem}
    .items>div{display: flex;align-items: center}
    .items>div>span{font-size: 14px;color:#777;margin-left:.35rem;font-weight: 600}
</style>
