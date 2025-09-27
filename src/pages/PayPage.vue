<template>

  <TheHeader/>

  <section class="m-auto w-[90%] flex gap-4 mt-10">
    <MainContainer class="w-2/3 flex flex-col gap-2">
      <h3 class="font-bold text-1xl">Método de Pagamento</h3>

      <MainContainer class="flex items-center gap-3">
        <input type="radio" v-model="metodoDePagamento" value="pix" name="metodoPagamento">
        <img src="/img/icons/qr-code.svg" alt="ícone de qr-code">
        <div>
          <span class="font-bold text-sm">PIX</span>
          <p class="text-xs text-[#6c727f]">Pagamento instantâneo via QR Code</p>
        </div>
      </MainContainer>
      <MainContainer class="flex items-center gap-3">
        <input type="radio" v-model="metodoDePagamento" value="cartao" name="metodoPagamento">
        <img src="/img/icons/credit-card.svg" alt="ícone de qr-code">
        <div>
          <span class="font-bold text-sm">Cartão de Crédito</span>
          <p class="text-xs text-[#6c727f]">Visa, Mastercard, Elo</p>
        </div>
      </MainContainer>
      <MainContainer class="flex items-center gap-3">
        <input type="radio" v-model="metodoDePagamento" value="paypal" name="metodoPagamento">
        <img src="/img/icons/paypal.svg" alt="ícone de qr-code">
        <div>
          <span class="font-bold text-sm">Paypal</span>
          <p class="text-xs text-[#6c727f]">Conta Paypal</p>
        </div>
      </MainContainer>

    <MainContainer v-if="metodoDePagamento === 'pix'" class="mt-4 flex flex-col items-center">
      <img class="w-35" src="/img/icons/qr-code.svg" alt="ícone de qr-code">
      <p class="text-xs text-[#6c727f]">Use seu banco ou carteira digital para pagar com QR Code</p>
    </MainContainer>

    <MainContainer v-if="metodoDePagamento === 'cartao' || metodoDePagamento === 'paypal'" class="mt-4">
      <h3 class="font-bold">Dados do Cartão</h3>
      <form>
        <div class="my-2">
          <label class="text-xs font-semibold">Número do Cartão</label>
          <InputText v-model="dadosDoCartao.numero" place-holder="1234 5678 9012 3456"/>
        </div>

        <div class="my-2">
          <label class="text-xs font-semibold">Nome no Cartão</label>
          <InputText v-model="dadosDoCartao.nome" place-holder="João Silva"/>
        </div>

        <div class="my-2 flex gap-4">
          <div class="w-full">
            <label class="text-xs font-semibold">Validade</label>
            <InputText type="month" v-model="dadosDoCartao.validade" place-holder="MM/AA"/>
          </div>
          <div class="w-full">
            <label class="text-xs font-semibold">CVV</label>
            <InputText v-model="dadosDoCartao.cvv" place-holder="123"/>
          </div>
        </div>
      </form>
    </MainContainer>

    </MainContainer>

    <MainContainer class="w-1/3 h-60 max-h-6000">
      <h3 class="font-bold text-1xl">Resumo do Pedido</h3>

      <div class="my-2">
        <h4 class="text-xs font-semibold">Camiseta Polo Masculina</h4>
        <span class="text-xs text-[#6c727f]">Quantidade: 1</span>
      </div>
      <div>
        <div class="flex items-center justify-between my-2">
          <span class="text-sm">Subtotal</span>
          <span class="text-sm font-semibold">R$ 89,99</span>
        </div>
        <div class="flex items-center justify-between my-2">
          <span class="text-sm">Frete</span>
          <span class="text-xs font-semibold text-green-500">R$ Gŕatis</span>
        </div>
        <div class="flex items-center justify-between my-2">
          <span class="text-sm">Total</span>
          <span class="text-sm font-semibold">R$ 89,99</span>
        </div>

        <ButtonFullFilled class="w-full" text="Finalizar Compra"/>
      </div>
    </MainContainer>
  </section>
</template>

<script setup lang="ts">
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue';
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import InputText from '@/components/UI/Inputs/InputText.vue';
import { reactive, ref } from 'vue';

const metodoDePagamento = ref('cartao');
const dadosDoCartao = reactive({
  numero: '',
  nome: '',
  validade: '',
  cvv:''
})
</script>
