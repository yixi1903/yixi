<template>
    <div>
        <div class="head"><img src="../assets/images/return.svg">现场详情</div>
        <Title/>
        <div class="foot">本场视频制作剪辑中</div>
    </div>
</template>

<script>
import axios from 'axios';
import Title from './Title'
export default {
    data(){
        return {
            txt:[]
        }
    },
    components:{Title},
    mounted(){
        console.log(this.$route.params)
        let id=this.$route.params.id
        axios.get("/api/h5/activity/"+id)
        .then(res=>{
            console.log(res.data.data)
            // this.txt=res.data.data.item_one
        })
    },
}
</script>

<style scoped>
img{width: 16px;height: 16px; position: absolute;top: calc(50% - 9px);left: 16px}
.head{box-shadow: 0 0 1rem rgba(0,0,0,.1);position: fixed;top: 0;width: 100%;height:1.253333rem /* 47/37.5 */;background: #fff;z-index: 10;text-align: center;line-height:1.253333rem ;font-size: .426667rem /* 16/37.5 */ ;font-weight: 800;font-size: .48rem /* 18/37.5 */}
.foot{position: fixed;bottom: 0;width: 100%;height:1.253333rem /* 47/37.5 */;background: #fff;z-index: 10;text-align: center;line-height:1.253333rem ;font-size: .426667rem /* 16/37.5 */ }
</style>


