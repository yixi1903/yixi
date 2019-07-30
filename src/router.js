import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import Home from './pages/Home';
import Member from './pages/Member';
import Scene from './pages/Scene';
import My from './pages/My';

const router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:Home},
        {path:"/member",component:Member},
        {path:"/scene",component:Scene},
        {path:"/my",component:My}
    ]
})

export default router;