<template>
  <TheHeader/>
  <main class="m-auto w-[90%]">
    <nav>
      <RouterLink to="/" class="flex items-center gap-2"><img class="w-5" src="/public/img/icons/arrow.svg" alt=""> <span class="text-sm text-[#6c727f]">Go to Home Page</span></RouterLink>
    </nav>
    <MainContainer class="!border-none flex gap-4 justify-center">
      <section class="w-2/3">
        <header class="flex justify-between items-center mb-2">
          <h3 class="font-bold text-1xl">Carrinho de Compras</h3>
          <div class="badge badge-sm border-[#e5e7eb]">3 itens</div>
        </header>
        <ProdutoCardCart v-for="item in carrinho" :key="item.id"/>
      </section>
      <section>
        <div class="w-[350px] h-[290px] bg-[#e5e7eb] rounded-lg p-4 flex flex-col justify-between">
          <h3 class="font-bold text-1xl">Resumo do Pedido</h3>
          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Subtotal</span>
            <span class="font-bold">R$ 150,00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Frete</span>
            <span class="font-bold">R$ 20,00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Total</span>
            <span class="font-bold text-green-500">R$ 170,00</span>
          </div>
          <ButtonFullFilled text="Finalizar Compra"/>
          <div class="flex flex-col gap-1 mt-2">
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Compra 100% segura</span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Devolução Grátis em 30 dias</span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Garantia do produto</span>
          </div>
        </div>
      </section>
    </MainContainer>
  </main>
</template>

<script lang="ts" setup>
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import ProdutoCardCart from '@/components/Produto/ProdutoCardCart.vue';
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue';
import { MeusProdutosService } from '@/services/MeusProdutosService';
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';

const store = useAuthStore()
const produtosService = new MeusProdutosService();
const carrinho = ref([])

async function getProdutosCarrinho() {
  try {
    const response = await getUserInfoById(store.localId);

    if(response) {
      carrinho.value = Object.keys(response.carrinho).map(key => ({
        id: key,
        quantidade: response.carrinho[key]
      }));
      console.log(carrinho.value);
    } else {
      carrinho.value = [];
    }
  } catch (error) {
    console.error('Erro ao buscar produtos do carrinho:', error);
  }
}

onMounted(() => {
  getProdutosCarrinho();
})
</script>
