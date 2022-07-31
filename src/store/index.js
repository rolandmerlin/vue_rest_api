import { createStore } from 'vuex'

const store = createStore({
    state:{
        publicapis:[],
        cdn:[]
    },
    getters:{
        publicapis:state=>state.publicapis,
        cdn:state=>state.cdn,
    },
    mutations:{
        set_publicapis:(state,values)=>{ state.publicapis=values; },
        set_cdn:(state,values)=>{ state.cdn=values; }
    }
})

export default store