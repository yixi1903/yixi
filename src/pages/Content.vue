<template>
    <div class="content">
        <div class="con">
            <router-link to="/member" class="fl">万象课程</router-link>
            <router-link to="/member/textbook" class="fr">一席红本</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.content{position: relative;top: 6.4rem /* 240/37.5 */;}
.con{overflow: hidden;background: #fff;height: 50px;box-shadow: 0 0.5rem 0.5rem rgba(0,0,0,.03);}
.con>a{line-height: 50px;width: 50%;text-align: center;font-size: 18px;font-weight: 600;color: #a2a2a2;}
.fl{float: left;}
.fr{float: right;}
.con .router-link-exact-active{color: #333 }
</style>
