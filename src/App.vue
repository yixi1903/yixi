<template>
  <div id="app">
    <footer v-if="footerShow">
      <router-link to="/home">
        <div @click="change(1)">
          <img class="footer-img" src="./assets/images/home.svg" alt="" v-if="flag!=1">
          <img class="footer-img" src="./assets/images/home-change.svg" alt="" v-if="flag==1">         
          <div>首页</div>
        </div>      
      </router-link>

      <router-link to="/scene">
        <div @click="change(2)">
          <img class="footer-img"  src="./assets/images/scene.svg" alt="" v-if="flag!=2">
          <img class="footer-img"  src="./assets/images/scene-change.svg" alt="" v-if="flag==2">
          <div>现场</div>
        </div>  
      </router-link>

      <router-link to="/member">
        <div @click="change(3)">
          <img class="footer-img"  src="./assets/images/member.svg" alt="" v-if="flag!=3">
          <img class="footer-img"  src="./assets/images/member-change.svg" alt="" v-if="flag==3">
          <div>会员</div>
        </div>
      </router-link>
      
      <router-link to="/my">
        <div @click="change(4)">
          <img class="footer-img"  src="./assets/images/my.svg" alt="" v-if="flag!=4">
          <img class="footer-img"  src="./assets/images/my-change.svg" alt="" v-if="flag==4">
          <div>我的</div>
        </div>
      </router-link>
    </footer>

    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      flag:1
    }
  },
  computed:{
    ...mapState(["footerShow"])
  },
  methods:{
    change(n){    
      this.flag=n
    }
  },
  created(){
    document.getElementById('Loading').style.display="none"
  }
}
</script>

<style>
a{text-decoration: none;}
body,html,#app{height: 100%}
body{background: #fafbfc}
.app{width: 100%;height: 100%}
body{font-family: "新宋体";}
body,ul,p,h1,h2,h3,h4,h5,p{margin: 0;padding: 0;  color: #333}
.footer-img{height: 18px;width: 18px;margin: 8px 0 2px}

footer{position: fixed;display: flex;bottom: 0;left:0;width: 100%;height:1.253333rem /* 47/37.5 */;background: #fff;box-shadow: 0 0 1rem rgba(0,0,0,.1);justify-content: space-around;align-items: center;z-index:20}
footer>a>div{text-align: center;height:1.253333rem /* 47/37.5 */;}
footer>a{font-size: .266667rem /* 10/37.5 */;text-decoration: none;color: #333;display: block;width: 25%;height: 100%}
.router-link-exact-active{color: red}





footer>a>div{text-align: center;height:1.253333rem /* 47/37.5 */;}
footer>a{font-size: .266667rem /* 10/37.5 */;text-decoration: none;color: #333;display: block;width: 25%;height: 100%}
.router-link-exact-active{
  color: red
}

.scroll-content{padding-top:.5rem}


</style>
