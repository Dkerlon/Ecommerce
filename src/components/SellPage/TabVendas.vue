<template>
  <main-container class="">
    <h3 class="font-bold text-xl">Histórico de Vendas</h3>
    <p class="text-[#6c727f] text-sm mb-6 my-1">Acompanhe suas vendas recentes</p>
    <table class="w-full">
      <thead>
        <tr class="bg-[##ffffff]">
          <th>Pedido</th>
          <th>Cliente</th>
          <th>Produto</th>
          <th>Data</th>
          <th>Status</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            #001
          </td>
          <td>Maria Silva</td>
          <td>Smartphone XYZ</td>
          <td>15/01/2024</td>
          <td>
            <span class="bg-[#f97415] text-white py-1 px-2 rounded-xl text-xs hover:opacity-80">Em trânsito</span>
          </td>
          <td>
            R$ 899,99
          </td>
        </tr>
        <tr>
          <td>
            #002
          </td>
          <td>João Santos</td>
          <td>Tênis Esportivo</td>
          <td>	14/01/2024</td>
          <td>
            <span class="bg-blue-600 text-white py-1 px-2 rounded-xl text-xs hover:opacity-80">Entregue</span>
          </td>
          <td>
            R$ 259,90
          </td>
        </tr>
        <tr>
          <td>
            #002
          </td>
          <td>Ana Costa</td>
          <td>Livro de Programação</td>
          <td>13/01/2024</td>
          <td>
            <span class="py-1 px-2 rounded-xl text-xs hover:opacity-80 border border-[#e5e7eb]">Processando</span>
          </td>
          <td>
            R$ 79,90
          </td>
        </tr>
      </tbody>
    </table>
  </main-container>
</template>

<script setup lang="ts">
import MainContainer from '../UI/Container/MainContainer.vue';
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
