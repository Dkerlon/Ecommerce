<template>
    <header>
        <nav class="flex p-2 justify-between items-center">
            <RouterLink to="/">
            <div class="flex items-center gap-4">
                <img style="width: 35px;" src="/img/icons/loja.png" alt="">
                <h3 class="text-2xl font-black">MarketPlace</h3>
            </div>
            </RouterLink>
            <InputSearch v-model="search" place-holder="Buscar Produtos..."></InputSearch>
            <div class="icons relative">
              <img src="/img/icons/favorite.png" alt="">

              <div class="relative inline-block">
                <img
                  @click="router.push('/cart')"
                  src="/img/icons/cart.png"
                  alt="carrinho ícone"
                  class="cursor-pointer"
                />
                <span
                  v-if="numeroItensCarrinho > 0"
                  class="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center"
                >
                  {{ numeroItensCarrinho }}
                </span>
              </div>
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
import { computed, ref } from 'vue';
import InputSearch from '../Inputs/InputSearch.vue';
import { useUserInfo } from '@/store/userInfo';
const store = useAuthStore()
const storeUserInfo = useUserInfo()
const router = useRouter()
const numeroItensCarrinho = computed(() => storeUserInfo.getCarrinho.length)
const logged = computed(() => {
    return store.isLoggedIn
})
const search = ref('')

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
