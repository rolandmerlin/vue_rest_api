<template>
    Hello publicapis<br>
    <div class="grid grid-cols-2 max-w-[800px] w-full mx-auto gap-2">
        <div class="grid grid-cols-[1fr_2fr] gap-x-4 mx-2">
            <b>Api Name : </b>
            <span class="align-text"><input type="" name="" v-model="search_name"></span>
        </div>
        <div class="grid grid-cols-[1fr_2fr] gap-x-4 mx-2">
            <b>Api Auth : </b>
            <span class="align-text">
                <select v-model="search_auth">
                    <option v-for="(a,i) in searchValue_auth" :key="'auth_'+i">{{a}}</option>
                </select>                
            </span>
        </div> 
        <div><br></div>
        <div><br></div>
        <div class="grid grid-cols-[1fr_2fr] gap-x-4 mx-2">
            <b>Catégory : </b>
            <span>
                <select v-model="search_category">
                    <option></option>
                    <option v-for="(a,i) in searchValue_catogry" :key="'auth_'+i">{{a}}</option>
                </select>
            </span>
        </div>
        <div class="grid grid-cols-[1fr_2fr] gap-x-4 mx-2">
            <b>Cors : </b>
            <span>
                <select v-model="search_cors">
                    <option></option>
                    <option v-for="(a,i) in searchValue_cors" :key="'auth_'+i">{{a}}</option>
                </select>
            </span>
        </div>
    </div>
    <br>
    <div class="text-center">Find {{nmb_resultat_search}} result(s)</div>
    <div id="#apis" class="max-w-[800px] w-full mx-auto">
        <div v-for="(api,i) in resultat_search" :key="'API_'+i+api.API" class="my-5 p-5  border-2">
            <div class="grid grid-cols-2">
                <div>
                    <div>
                        <h1>{{api.API}}</h1>
                        <h3>{{api.Description}}</h3>                    
                    </div>
                </div>
                <div>
                    <b>Auth : </b>{{api.Auth}}<br>
                    <b>Cors : </b>{{api.Cors}}<br>
                    <b>Category : </b>{{api.Category}}

                </div>                
            </div>
            <div>URL : <a :href="api.Link" class="h5" target="_blank">{{api.Link}}</a></div>
        </div>
    </div>
</template>
<script setup>
// https://api.publicapis.org/entries
import axios from 'axios'

import {useStore} from 'vuex'
import {computed,ref} from 'vue'

const search_name = ref('')
const search_auth = ref('')
const search_category = ref('')
const search_cors = ref('')

const store = useStore()

const data = computed(()=> store.getters.publicapis)

const searchValue_auth = computed(auth => {
    return data.value
        .map(a => a.Auth)
        .filter((value,index,self)=>{ return self.indexOf(value) === index })
        .sort((a,b)=> (a>b)?1:-1);
})
const searchValue_catogry = computed(auth => {
    return data.value
        .map(a => a.Category)
        .filter((value,index,self)=>{ return self.indexOf(value) === index })
        .sort((a,b)=> (a>b)?1:-1);
});
const searchValue_cors = computed(auth => {
    return data.value
        .map(a => a.Cors)
        .filter((value,index,self)=>{ return self.indexOf(value) === index })
        .sort((a,b)=> (a>b)?1:-1);
});
const resultat_search = computed(()=> {
    let regexp_name = new RegExp(search_name.value);
    let regexp_auth = new RegExp(search_auth.value);
    let regexp_category = new RegExp(search_category.value);
    let regexp_cors = new RegExp(search_cors.value);
    return data.value
        .filter(d => regexp_name.test(d.API))
        .filter(d => regexp_auth.test(d.Auth))
        .filter(d => regexp_category.test(d.Category))
        .filter(d => regexp_cors.test(d.Cors))
})
const nmb_resultat_search = computed(()=> resultat_search.value.length)

const url_publicapis = 'https://api.publicapis.org/entries'
if (data.value.length==0)
    axios.get(url_publicapis).then(d => {
        store.commit('set_publicapis',d.data.entries.sort((a,b)=>{
            return (a.API.toUpperCase() > b.API.toUpperCase())? 1 : -1;
        }));
    }).catch(e => {
        alert(e);
    })
</script>