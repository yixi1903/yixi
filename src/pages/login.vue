<template>
    <div class="login">
        <header>
            <img src="../assets/images/return.svg" @click="returnHome"/>
            <h3>登录</h3>
        </header>
        <div class="login-content">
            <div>
                <img src="../assets/images/logo.svg"/>
                <h2>登录·注册</h2>
                <div class="login-input">
                    <div>
                        <input name="user_name" placeholder="请输入手机号" v-model="phone"/><span :class="{active:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(phone)}">获取验证码</span>
                    </div>
                    <div>
                        <input name="code" placeholder="请输入验证码" v-model="code"/><span :class="{active:code}" @click="login">登录</span>
                    </div>
                </div>
                <div class="line">
                    <span></span><label>or</label><span></span>
                </div>
                <div class="tips">
                    <img src="../assets/images/loginqq.svg" />
                    <img src="../assets/images/loginblog.svg" />
                </div>
            </div>
        </div>
        <div class="foot">
            <img src="../assets/images/loginFooter.svg" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            phone:"",
            code:"",
        }
    },
    methods:{
        returnHome(){
            if(this.$store.state.flag==1){
                this.$router.push("/speechDetails/"+this.$store.state.id);
            }else if(this.$store.state.flag==2){
                this.$router.push("/My");                
            }
            else if(this.$store.state.flag==0){
                this.$store.state.footerShow=true;
                this.$router.push("Home");
            }
        },
        login(){
            axios.post('http://127.0.0.1:8000/login',{phone:this.phone})
            .then(res=>{
                localStorage.token = res.data.token;
                localStorage.phone = res.data.phone;
                this.$router.push("Home");
                console.log(res.data)
                // console.log(localStorage.token);
            })
        }
    },
    mounted(){
        this.$store.state.footerShow=false;
    }
}
</script>
<style scoped>
    .login{background: url('../assets/images/bj.png') no-repeat;height:100%}
    header{padding: 0 0.5rem;height:1.17rem;display: flex;justify-content: center;position: relative;align-items: center;font-size: 17px;background:#fff;box-shadow: 0 0 4px rgba(0,0,0,.1);}
    header>img{position: absolute;width:16px;height:16px;top:50%;left:.5rem;margin-top:-8px;}
    .login-content{width:86%;margin:0 auto;margin-top:1.27rem}
    .login-content>div:nth-of-type(1){text-align:center;padding: 1.1rem .5rem;box-shadow: 0 4px 4px rgba(0,0,0,.1), 0 0 4px rgba(0,0,0,.1);background: rgba(250,251,252,.8);}
    .login-content>div:nth-of-type(1)>img{width: 40px;height:40px;}
    .login-content>div:nth-of-type(1)>h2{margin:.9rem 0 .8rem 0;font-size: 21px;}
    
    .login-input{width:90%;margin:0 auto}
    .login-input>div{padding:0 .4rem 0 .3rem;border: 1px solid #c2c9d7;display: flex;justify-content: space-between;align-items: center}
    .login-input>div:nth-of-type(1){border-bottom: none;border-radius: 2px 2px 0 0;}
    .login-input>div:nth-of-type(2){border-radius: 0px 0px 2px 2px;}
    .login-input>div>input{border: none;height:.93rem;width:60%;outline-width: 0.5px;background: rgba(250,251,252,.8);}
    .login-input>div>span{color:#bdbdbd;font-size: 10px;}
    .active{color:#333 !important;}

    .line{padding:0 .5rem;margin-top:.8rem;display: flex;justify-content: space-around;align-items: center}
    .line>span{display: inline-block;width:2rem;height:1px;background:#bdbdbd;}
    .line>label{color:#bdbdbd;font-size: 18px;}

    .tips{margin-top:.8rem;padding: 0 .5rem;display: flex;justify-content: space-around;}
    .foot{margin-top:2.5rem;text-align: center}
</style>

