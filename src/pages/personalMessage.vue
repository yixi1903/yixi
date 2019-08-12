<template>
    <div class="personal-message">
        <header>
            <img src="../assets/images/return.svg" @click="returnPerson"/>
            <h3>个人资料设置</h3>
            <img src="../assets/images/logigOut1.svg" v-if="isLoginOut" @click="confirm"/>
            <img src="../assets/images/loginOut.svg" v-if="!isLoginOut" @click="loginOut"/>
            <span v-if="!isLoginOut">再次点击退出</span>
        </header>
        <div class="user-img">
            <span>头像:</span>
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <!-- <img src="../assets/images/headPortrait.png"/> -->
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
        </div>
        <div>
            <span>昵称:</span>
            <input v-model="userData.user_nickname" />
        </div>
        <div>
            <span>已绑定手机号:</span>
            <span>{{userData.user_name}}</span>
        </div>
        <div>
            <span>已绑定第三方账号:</span>
            <div class="bind-img">
                <img src="../assets/images/weChat.svg" />
                <img src="../assets/images/qq.svg" />
                <img src="../assets/images/microBlog.svg" />
            </div>
        </div>

        <p>收货人信息</p>
        <div>
            <span>姓名:</span>
            <input v-model="userData.user_adname"/>
        </div>
        <div>
            <span>手机号:</span>
            <input v-model="userData.user_adphone"/>
        </div>
        <div @click="slideUp">
            <span>地区:</span>
            <div class="origin">
                {{userData.user_address}}
            </div>
        </div>
        <div >
            <span>详细地址:</span>
            <input v-model="userData.user_origin"/>
        </div>

        <button @click="saveMessage">保存</button>
        <div v-if="show">
            <transition name="fade">
                <v-distpicker type="mobile" class="address-picker"
                @selected="selected"  ></v-distpicker>
            </transition>
        </div>
        <!-- 遮罩 -->
        <div class="mask" v-if="show" @click="slideUp"></div>
    </div>
</template>
<script>
import axios from 'axios'
import VDistpicker from 'v-distpicker'//地址选择插件

export default {
    components: { VDistpicker },
    data(){
        return{
            isLoginOut:true,
            userData:{},
            imageUrl:require('../assets/images/headPortrait.png'),
            province:"",
            city:"",
            area:"",
            show:false,
        }
    },
    methods:{
       selected(data){
           console.log(data);
           this.province=data.province.value;
           this.city=data.city.value;
           this.area=data.area.value;
           this.userData.user_address=this.province+this.city+this.area;
       },
       slideUp(){
           this.show=!this.show;
       },
        //图片上传之前
        beforeAvatarUpload(file){
            console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            
            return isJPG && isLt2M;
        },
        //图片上传成功
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        //退出登录，跳转到首页
        loginOut(){
            localStorage.token="";
            this.$router.push("/Home");
        },
        //确认退出登录
        confirm(){
            this.isLoginOut=!this.isLoginOut;
        },
        //返回到上个页面
        returnPerson(){
            this.$router.push("/My")
        },
        //提交保存个人信息
        saveMessage(){
            console.log(this.userData)
            axios.post('http://101.37.76.177:8000/saveMessage',{data:this.userData})
            .then(res=>{
                console.log(res)
                this.$router.push("/My")
            })
            
        }
    },
    mounted(){
        this.$store.state.footerShow=false;
        axios.get('http://101.37.76.177:8000/getUser?phone='+localStorage.phone)
        .then(res=>{
            console.log(res.data)
            this.userData=res.data[0];
        })
    }
}
</script>
<style scoped>
    div{color:#2c3e50;}
    header{display: flex;justify-content: space-between;padding: 0 .5rem 0 .6rem;align-items: center;
    height:1.17rem;box-shadow: 0 0 3px rgba(0,0,0,.1);background:#fff;font-size: 15px;position: relative;}
    header>img{width:16px;height:16px;}
    header>span{color:#f5222d;font-size: 8px;position: absolute;bottom: .05rem;right:.05rem;}
    .personal-message>div{align-items: center;padding:.4rem 1rem;display: flex;justify-content: space-between;background:#fff;align-items: center;font-size: 13px;border-top:1px solid #eee;}
    .user-img{border-top:none !important;}
    .user-img img{width:1.3rem;height:1.3rem;border-radius: 50%;}
    .bind-img>img{width:.7rem;height:.7rem;margin-left:.3rem}
    .personal-message>p{padding: .5rem 1rem;}
    .personal-message>div>input{border:none;outline: none;text-align: right}
    .personal-message>button{outline: none;margin:0 auto;margin-top:1rem;font-size: 20px;display: block;border-radius:.5rem;border:1px solid #c2c9d7;background:#fff;padding: .15rem 1.3rem;color:#d0d0d0;font-weight: 600;letter-spacing: 6px;}
    /* 日期选择样式 */
    .personal-message>div>.address-picker{background:#fff;z-index: 2;position: fixed;left:0;bottom:0;width:100%;height:3rem;overflow-y: scroll;padding:0 .5rem;}
    .origin>span{margin-left:.7rem}

    .mask{position: fixed;width:100%;height:100%;z-index:1;left:0;top:0;background: rgba(0,0,0,.7) !important;display: none;}

</style>


