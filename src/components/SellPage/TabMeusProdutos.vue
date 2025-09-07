<template>
  <main-container class="">
    <h3 class="font-bold text-xl">Meus Produtos</h3>
    <p class="text-[#6c727f] text-sm mb-6 my-1">Gerencie seus produtos cadastrados</p>

    <table class="w-full">
      <thead>
        <tr class="bg-[##ffffff]">
          <th>Produto</th>
          <th>Categoria</th>
          <th>Preco</th>
          <th>Estoque</th>
          <th>Status</th>
          <th colspan="2" style="text-align: right;">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produto) in produtos" :key="produto.id">
          <td>
            <div class="flex items-center gap-4">
              <img class="w-14 rounded-xl" :src="produto.fotos[0]" alt=""/>
              <div class="">
                <h3 class="font-bold text-sm">{{ produto.nome }}</h3>
                <span class="text-xs text-[#6c727f]">R$ {{ produto.preco.atual.toFixed(2) }}</span>
              </div>
            </div>
          </td>
          <td>{{ produto.categoria }}</td>
          <td>R$ {{ produto.preco.atual.toFixed(2) }}</td>
          <td>{{ produto.quantidadeDisponivel }}</td>
          <td>
            <span class="bg-[#f97415] text-white py-1 px-2 rounded-xl text-xs hover:opacity-80">{{ produto.status }}</span>
          </td>
          <td colspan="2">
            <div class="action-td flex items-center gap-5 justify-end">
              <img class="w-4 hover:opacity-80" src="/img/icons/view-on.png" alt=""/>
              <img class="w-4 hover:opacity-80" src="/img/icons/editar.png" alt=""/>
              <img class="w-4 hover:opacity-80" src="/img/icons/lixeira.png" alt=""/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MainContainer from '../UI/Container/MainContainer.vue';
import { MeusProdutosService } from '@/services/MeusProdutosService';
import type { Produto } from '@/services/MeusProdutosService';
const produtos = ref<Produto[]>([])
onMounted( async () => {
  produtos.value = await new MeusProdutosService().getProdutosByVendedor()
  console.log(produtos.value)
})
</script>
<style scoped>
.bordaCard{
  border: 1px solid #e5e7eb;
}

th,td{
  border-top: 1px solid #e5e7eb;
}
tr:hover{
  opacity: 0.8;
  cursor: pointer;
}

thead th{
  text-align: left;
  padding: 15px;
  color: #6c727f;
  font-size: 14px;
}
tbody td{
  padding: 15px;
  font-size: 14px;
}
</style>
