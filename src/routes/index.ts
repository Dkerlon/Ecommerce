import { setUserInfo } from "@/services/setUserInfo";
import { createRouter, createWebHistory } from "vue-router";
import { useUserInfo } from "@/store/userInfo";
const routes = [
    {
        path:'/',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/register',
        component: () => import('@/pages/TheRegister.vue'),
        meta: { guestOnly: true }
    },
    {
        path: '/login',
        component: () => import('@/pages/TheLoginPage.vue'),
        meta: { guestOnly: true }
    },
    {
        path: '/sell',
        component: () => import('@/pages/SellPage.vue'),
        meta: { requiresAuth: true, onlySeller: true}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to,from,next) => {
    const isLogged = localStorage.getItem("token")
    await setUserInfo()
    const userInfo = useUserInfo()

    if(userInfo.getTipoConta != 'vendedor' && to.meta.onlySeller){
      return next('/')
    }
    if (to.meta.guestOnly && isLogged) {
        return next('/');
    }
    if (to.meta.requiresAuth && !isLogged) {
        return next('/login');
    }
    next();
})

export default router
