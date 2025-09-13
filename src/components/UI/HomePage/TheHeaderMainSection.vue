<template>
    <section class="flex flex-col md:flex-row w-[90%] m-auto my-25 gap-10">
        <div class="w-[60%] flex gap-8 flex-col">
            <h2 class="text-6xl font-semibold">Encontre tudo que você <span class="font-black text-[#2863e6]">precisa</span></h2>
            <p class="text-md text-[#6c727f]">Milhares de produtos das melhores marcas, com entrega rápida e segura. Compre com confiança no nosso marketplace.</p>
            <div class="flex w-full justify-between items-center mb-13 gap-5">
                <ButtonFullFilled text="Explorar Produtos" class="w-full"></ButtonFullFilled>
                <ButtonOutlined text="Vender no MarketPlace" @click="router.push('/sell')" class="w-full text-nowrap"></ButtonOutlined>
            </div>
            <div class="header-main-info">
                <div class="info-card">
                    <div style="background-color: #e6f5ed;" class="info-card-img-wrapper">
                        <img src="/img/icons/protect.png" alt=""/>
                    </div>
                    <div class="info-text-card">
                        <h5>Compra Segura</h5>
                        <span>Proteção Total</span>
                    </div>
                </div>
                <div class="info-card">
                    <div style="background-color: #ebf8fe;" class="info-card-img-wrapper">
                        <img src="/img/icons/em-transito.png" alt="">
                    </div>
                    <div class="info-text-card">
                        <h5>Entrega Rápida</h5>
                        <span>Em todo o brasil</span>
                    </div>
                </div>
                <div class="info-card">
                    <div style="background-color: #fdf4e4;" class="info-card-img-wrapper">
                        <img src="/img/icons/gráfico.png" alt="">
                    </div>
                    <div class="info-text-card">
                        <h5>Melhores Preços</h5>
                        <span>Sempre em oferta</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img src="https://www.tailwind-kit.com/images/object/10.png" class="max-w-xs md:max-w-sm m-auto"/>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonFullFilled from '../buttons/ButtonFullFilled.vue';
import ButtonOutlined from '../buttons/ButtonOutlined.vue';
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const store =  useAuthStore()
const idUser = ref(store.getlocalId)

onMounted(() => {
    getUserInfoById(idUser.value)
})
</script>

<style scoped>
.header-main-info{
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
}
.info-card{
    display: flex;
    align-items: center;
    gap: 10px;
    width: 32%;
}
.info-card-img-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    border-radius: 50%;
}
.info-card img{
    width: 30px;
}
.info-text-card h5{
    font-size: 15px;
}
.info-text-card span{
    color: #6c727f;
    font-size: 13px;
}
.header-main-img img{
    width: 100%;
    height: 100%;
    border-radius: 20px;

}
.header-main-img{
    width: 50%;
    position: relative;
}
#header-main-img-produtos{
    position: absolute;
    top: -20px;
    right: -20px;
    background-color: white;
    box-shadow: 0 0 0 0.3px;
    padding: 20px;
    border-radius: 50%;
    color: #6c727f;
    text-align: center;
}
#header-main-img-produtos span,#header-main-img-vendedores span{
    font-size: 23px;
    font-weight: bold;
}
#header-main-img-vendedores{
    position: absolute;
    bottom: -20px;
    left: -20px;
    background-color: white;
    box-shadow: 0 0 0 0.3px;
    padding: 25px;
    border-radius: 50%;
    color: #6c727f;
    text-align: center;
}
</style>
