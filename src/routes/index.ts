import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path:'/',
        redirect:'/register'
    },
    {
        path: '/register',
        component: () => import('@/pages/TheRegister.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
