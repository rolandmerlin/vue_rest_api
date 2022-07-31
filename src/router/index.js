import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path:'/',
        component: ()=> import('../pages/Home.vue')
    },
    {
        path:'/publicapis',
        component: ()=> import('../pages/Publicapis.vue')
    },
    {
        path:'/cdn',
        component: ()=> import('../pages/Cdn.vue')
    }
];

const router = createRouter({
    routes,
    history:createWebHistory()
});

export default router;