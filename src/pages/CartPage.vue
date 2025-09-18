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
        <ProdutoCardCart/>
        <ProdutoCardCart/>
        <ProdutoCardCart/>
      </section>
      <section>
        <div class="w-[350px] h-[250px] bg-[#f3f4f6] rounded-lg p-4 flex flex-col justify-between">
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
            <span class="font-bold">R$ 170,00</span>
          </div>
          <ButtonFullFilled text="Finalizar Compra"/>
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
</script>
