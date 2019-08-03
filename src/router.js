import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import Home from './pages/Home';
import Member from './pages/Member';
import Scene from './pages/Scene';
import My from './pages/My';
import search from './pages/search';
import Details from './pages/Details';

import login from './pages/login';
import speechDetails from './pages/speechDetails';

import ShowMore from './pages/ShowMore';
import Course from './pages/Course';
import Textbook from './pages/Textbook';


const router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:Home},
        {path:"/member",component:Member,
        children:[
            {
                name:"course",
                path:"/member/",
                component:Course
            },
            {
                path:"/member/textbook",
                component:Textbook
            }
        ]},
        {path:"/scene",component:Scene},
        {path:"/my",component:My},
        {path:"/search",component:search},
        {path:"/details/:id",component:Details},

        {path:"/login",component:login},
        {path:"/speechDetails/:id",component:speechDetails},

        {path:"/showMore",component:ShowMore},
        {path:"/member",redirect:"/course"},
   

    ]
})

export default router;