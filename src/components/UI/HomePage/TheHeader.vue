<template>
    <header>
        <nav class="flex p-2 justify-between items-center">
            <RouterLink to="/">
            <div class="flex items-center gap-4">
                <img style="width: 35px;" src="/img/icons/loja.png" alt="">
                <h3 class="text-2xl font-black">MarketPlace</h3>
            </div>
            </RouterLink>
            <InputSearch place-holder="Buscar Produtos..."></InputSearch>
            <div class="icons">
                <img src="/img/icons/favorite.png" alt="">
                <img src="/img/icons/cart.png" alt="">
            </div>
            <div class="actions">
                <div class="actions">
                    <ButtonOutlined text="Entrar" v-if="!logged" @click="signSingUp('login')"></ButtonOutlined>
                    <ButtonOutlined text="Details" v-else></ButtonOutlined>
                    <ButtonFullFilled text="Registrar-se" v-if="!logged" @click="signSingUp('register')"></ButtonFullFilled>
                    <ButtonFullFilled text="Logout" @click="logout" v-else></ButtonFullFilled>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import ButtonFullFilled from '../buttons/ButtonFullFilled.vue';
import ButtonOutlined from '../buttons/ButtonOutlined.vue';
import { computed } from 'vue';
import InputSearch from '../Inputs/InputSearch.vue';

const store = useAuthStore()
const router = useRouter()
const logged = computed(() => {
    return store.isLoggedIn
})

function logout(){
    const userData = {
        idToken : '',
        localId: ''
    }
    store.setUser(userData)
    localStorage.removeItem("token")
}
function signSingUp(url: string){
    router.push(`/${url}`)
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: hsl(221, 79%, 53%);
}
a:hover{
    text-decoration: underline;
}
header img{
    width: 20px;
}
header{
    width: 90%;
    margin: 0 auto;
}
.title{
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.title h3{
    font-size: 21px;
}
.icons{
    display: flex;
    align-items: center;
    gap: 30px;
}
.icons img:hover{
    opacity: 0.5;
    cursor: pointer;
}
.actions{
    display: flex;
    align-items: center;
    gap: 15px;
}
</style>
