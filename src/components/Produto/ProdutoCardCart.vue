<template>
  <div class="flex gap-3 border rounded-xl border-[#e5e7eb] py-4 mb-4 justify-evenly px-2 lg:max-w-[100%] lg:max-h-[150px]">
    <div class="w-[20%] items-center flex">
      <img class="w-full max-h-[110px]" :src="item.fotos[0]" alt="imagem do produto">
    </div>
    <div class="w-[47%] flex flex-col gap-1">
      <h4 class="text-sm font-bold">{{ item.nome }}</h4>
      <p class="text-xs text-[#6c727f]">Vendido por {{ vendedorNome }}</p>
      <div class="badge badge-sm border-[#e5e7eb]">{{ item.categoria }}</div>
      <div class="border border-[#e5e7eb] rounded-lg w-25 px-2 py-1 flex items-center justify-between gap-2 mt-2">
        <button class="w-10 cursor-pointer hover:opacity-90" @click="$emit('atualizarQuantidade',item.id,-1)">-</button>
        <span class="border-r border-l px-3.5 border-[#e5e7eb] text-center">{{ item.quantidade }}</span>
        <button class="w-10 cursor-pointer hover:opacity-90" @click="$emit('atualizarQuantidade',item.id, 1)">+</button>
      </div>
    </div>
    <div class="w-[20%] flex flex-col justify-between">
      <img class="self-end cursor-pointer hover:scale-95" src="/img/icons/lixeira.png" alt="remover ícone" @click="$emit('deletarItemCarrinho',item.id)">
      <div class="flex flex-col justify-end items-end gap-1">
        <span class="text-sm font-bold">R$ {{ (item.preco.atual * item.quantidade).toFixed(2) }}</span>
        <span class="text-xs" v-if="item.quantidade > 1">R$ {{ item.preco.atual.toFixed(2) }}cada</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import type { Produto } from '@/services/MeusProdutosService';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  item: Produto
}>()

defineEmits([
  'atualizarQuantidade','deletarItemCarrinho'
])

const vendedorNome = ref<string | undefined>('')


onMounted(async () => {
  const vendedorID = await getUserInfoById(props.item.vendedorId)
  vendedorNome.value = vendedorID?.nome
})
</script>
