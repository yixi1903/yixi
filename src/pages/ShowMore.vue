<template>
  <div>
    <div class="home">
      <header>
        <img src="../assets/images/return.svg" class="left" @click="goScene"/>
        <h2>更多现场</h2>
        <img src="../assets/images/seach.svg" @click="goSeach"/>
      </header>
    </div>
    <div class="data">
        <div class="dataList" v-for="l in lists" :key="l.id">
            <div class="img">
                <img :src='l.cover' />
                <span>一席深圳</span>
                <div class="linear"></div>
                <h3>{{l.title}}</h3>
            </div>
            <div class="content">
                <p>{{l.speech_titles[0]}}</p>
                <p>{{l.speech_titles[1]}}</p>
                <p>{{l.speech_titles[2]}}</p>
                <p>......</p>
                <div class="riqi">               
                    <span>{{l.created}}</span>
                    <label>共{{parseInt(Math.random()*(100-0+1)+0)}}位讲者</label>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            lists:[]
        }
    },
    mounted(){    
        this.$store.state.footerShow=false
        axios.get("/api/h5/activities/?page=1&page_size=10")
        .then(res=>{
            console.log(res.data.data)
            this.lists=res.data.data.items.splice(3)
        })
    },
    methods:{
        goSeach(){
            this.$router.push(
                {path:"/search",query:{id:100}}
            )
        },
        goScene(){
            this.$router.push("/scene")
        }
    }
};
</script>

<style scoped>
.home {padding: 0 0.6rem;color: #333;position: fixed;z-index: 1;top: -1px;left: 0;width: 100%;box-sizing: border-box;box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);background: #fff;}
header {display: flex;position: relative;line-height: 1.17rem;justify-content: center;}
header > h2 {font-weight: 550;}
header > img {position: absolute;right: 0;width: 0.43rem;height: 0.43rem;top: 0.59rem;margin-top: -0.24rem;}
.left {left: 0;}
.data{padding: .6rem .6rem 0;margin-top: 1.17rem}
.dataList{margin-bottom: .533333rem /* 20/37.5 */}
.img{position: relative;}
.img>img{width: 100%;vertical-align: middle}
.linear{width: 100%;height: 50%;position: absolute;bottom: 0;background: linear-gradient(180deg,transparent,rgba(0,0,0,.5));}
.img>h3{color: #fff;font-size: 20px;z-index: 10;position: absolute;bottom: 0;padding: .4rem;line-height: 26px}
.img>span{right: 0;width: 1.6rem /* 60/37.5 */;line-height: 24px;text-align: center;border-radius: .1rem;opacity: .85;background-color: #ce0900;position: absolute;top: 20px;color: #fff;font-size: 10px}
.content{background: #fff;padding: .4rem}
.content>p{margin: .106667rem /* 4/37.5 */ 0}
.riqi{display: flex;justify-content: space-between;margin-top: .426667rem /* 16/37.5 */;color: #6f6f6f}


</style>

