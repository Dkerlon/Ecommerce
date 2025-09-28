<template>
  <TheHeader/>

  <main class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-foreground">Dashboard do Vendedor</h1>
      <p className="text-muted-foreground mt-2">Gerencie seus produtos e acompanhe suas vendas</p>
    </div>

    <Tabs
    :tabs="[
      { label: 'Meus Produtos', value: 'meus-produtos' },
      { label: 'Adicionar Produto', value: 'adicionar-produto' },
    ]"
    defaultValue="meus-produtos"
  >
    <template #meus-produtos>
      <TabMeusProdutos/>
    </template>
    <template #adicionar-produto>
      <TabAdicionarProduto/>
    </template>
  </Tabs>
  </main>
</template>

<script setup lang=ts>
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import Tabs from '@/components/SellPage/Tabs.vue';
import TabMeusProdutos from '@/components/SellPage/TabMeusProdutos.vue';
import TabAdicionarProduto from '@/components/SellPage/TabAdicionarProduto.vue';
</script>
