import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        footerShow:true,
        flag:0,
        id:0,
        footerFlag:1,
    }
})
export default store;