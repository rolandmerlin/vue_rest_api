import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

import './main.css'

console.log(router);

const AppVue = createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
