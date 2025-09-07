<template>
  <TheHeader/>

  <main class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-foreground">Dashboard do Vendedor</h1>
      <p className="text-muted-foreground mt-2">Gerencie seus produtos e acompanhe suas vendas</p>
    </div>

    <Tabs
    :tabs="[
      { label: 'Visão Geral', value: 'visao-geral' },
      { label: 'Meus Produtos', value: 'meus-produtos' },
      { label: 'Adicionar Produto', value: 'adicionar-produto' },
      { label: 'Vendas', value: 'Vendas' }
    ]"
    defaultValue="visao-geral"
  >
    <template #visao-geral>
      <TabVisaoGerao/>
    </template>
    <template #meus-produtos>
      <TabMeusProdutos/>
    </template>
    <template #adicionar-produto>
      <TabAdicionarProduto/>
    </template>
    <template #Vendas>
      <TabVendas/>
    </template>
  </Tabs>
  </main>
</template>

<script setup lang=ts>
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import Tabs from '@/components/SellPage/Tabs.vue';
import TabVisaoGerao from '@/components/SellPage/TabVisaoGerao.vue';
import TabMeusProdutos from '@/components/SellPage/TabMeusProdutos.vue';
import TabAdicionarProduto from '@/components/SellPage/TabAdicionarProduto.vue';
import TabVendas from '@/components/SellPage/TabVendas.vue';
</script>
