<template>
    <h1 class="text-center">Library CDN</h1>
    <div class="max-w-[800px] mx-auto my-4 p-4 grid grid-cols-[1fr_3fr]">
        <span>
            Search <b>by name</b>
        </span>
        <input v-model="search_name"/>
    </div>
    <div class="max-w-[800px] mx-auto my-4 p-4 text-center">Find {{data_result_length}} result(s)</div>
    <div class="max-w-[800px] mx-auto">
        <div class="border-2 m-2 p-2" v-for="(t,i) in data_result" :key="'Cdn'+i+'_'+t.name">
            <h1>{{t.name}}</h1>
            <a :href="t.latest" target="_blank" class="h4">{{t.latest}}</a>
        </div>  
    </div>
</template>
<script setup>
import { computed, ref } from '@vue/runtime-core'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const search_name = ref('')

const data = computed(()=> store.getters.cdn)
const data_result = computed(()=> {
    let regexp_name = new RegExp(search_name.value)
    return data.value.filter(d => regexp_name.test(d.name))
})
const data_result_length = computed(()=> data_result.value.length)

if (data.value.length==0)
    axios
        .get('https://api.cdnjs.com/libraries')
        .then(d => { store.commit('set_cdn',d.data.results.sort((a,b)=> (a.name>b.name)?1:-1 )) })
</script>
<style>

</style>