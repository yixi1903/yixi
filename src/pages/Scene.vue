<template>
    <div class="box">
        <swiper :options="swiperOption" ref="mySwiper"  >
            <swiper-slide  v-for="c in cards" :key="c.id" class="slide">
                <div @click="click(c.id)">
                    <img :src="c.card_cover"  class="slide-img" alt="" srcset="">
                    <div class="pad">
                        <h2>{{c.title}}</h2>
                        <div class="xian"></div>
                        <div>
                            <p>{{c.address}}</p>
                            <p>{{c.created}}</p>
                            <span class="label">一席@北京</span>
                        </div>
                    </div>
                </div>
                
                
            </swiper-slide>
            <swiper-slide class="slide">
                <img src="../assets/images/bj.png" alt="" class="slide-img">
                <div class="more">
                    <img src="../assets/images/more.svg" alt="">
                    <span class="click">点击查看过往现场</span>
                </div>
                
            </swiper-slide >
        </swiper>
    </div>
  
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import axios from 'axios';

export default {
    data(){
        return {
            cards:[],
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides : true,
            }   
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted(){
        axios.get("/api/h5/activities/?page=1&page_size=3")
        .then(res=>{
            console.log(res.data.data)
            this.cards=res.data.data.items
        })
    },
    methods:{
        click(id){
            this.$router.push("Details/"+id)
        }
    }
}
</script>

<style scoped>    

.slide{position:relative;z-index:10;height:12.8rem /* 480/37.5 */!important;border: solid 1px rgb(236, 236, 236); width: 7.2rem /* 270/37.5 */!important;box-shadow: 0 1.5rem 5rem rgba(0,0,0,.1), 0 0 0.8rem rgba(0,0,0,.1);background: #fff;border-radius: .08rem /* 3/37.5 */;box-sizing: border-box;}

.slide-img{width: 7.2rem /* 270/37.5 */;vertical-align: middle}
.box{box-sizing: border-box;height: 17.706667rem /* 664/37.5 */;} 
.pad{padding:.426667rem /* 16/37.5 */}
.swiper-container{height: 100%;padding-left: 1.44rem /* 54/37.5 */;padding-top: 1.6rem /* 60/37.5 */}
h2{font-family: "新宋体";height: 1.066667rem /* 40/37.5 */}
p{margin: .16rem /* 6/37.5 */ 0;font-weight: 300}
.xian{height: 1px;width: 100%;background-color: rgb(235, 235, 235);margin:16px 0}
.label{display: block;height: 30px;width: 80px;background-color: #ce0900; color: #fff;position: absolute;right: 0;bottom: 16px;text-align: center;line-height: 30px; font-size:12px}
.more{position: absolute;top: 44%;margin: auto;left: 0;right: 0;text-align: center}
.click{display: block;margin: .266667rem /* 10/37.5 */}
</style>
