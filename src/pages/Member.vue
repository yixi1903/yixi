<template>
    <div class="vip">
        <div class="top">
            <div>
                <img src="../assets/images/card.jpg" alt="">
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        // axios.get("/api/h5/wanxiangs/")
        // .then(res=>{

        // }),
        axios.get("/api/h5/wanxiang/basic/?type_choice=1")
        .then(res=>{
            console.log(res.data.data)
        })
        
    }
}
</script>


<style scoped>
.top{position: fixed;width: 100%;height: 240px;top: 0;}
.top>div{
    position: absolute;
    width: 50rem;
    height: 6.4rem /* 240/37.5 */;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    left: calc(50% - 25rem);
    top: calc(50% - 13rem);
    /* padding: 0 0 0 5rem; */
    background: #fafbfc; 
    transition: all .2s linear;
    transform: rotateX(0deg);
    visibility: visible;
    opacity: 1;
    overflow: hidden;
}
.top>div>img{width: 280px; box-shadow: 0 1.5rem 5rem rgba(0,0,0,.1), 0 0 0.8rem rgba(0,0,0,.1);}
</style>

