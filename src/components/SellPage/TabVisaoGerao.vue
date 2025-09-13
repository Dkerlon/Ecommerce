<template>
  <section value="overview" class="w-[100%]">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="rounded-lg bordaCard bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <p class="text-sm">Total de Produtos</p>
          <img class="w-4" src="/img/icons/caixa.png" alt="">
        </div>
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <span class="font-bold text-3xl">3</span>
        </div>
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <span class="text-xs text-[#6c727f]">+2 desde o mês passado</span>
        </div>
      </div>

      <div class="rounded-lg bordaCard bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <p class="text-sm">Vendas Totais</p>
          <img class="w-4" src="/img/icons/dolar.png" alt="">
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="font-bold text-3xl">R$ 12.450</span>
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="text-xs text-[#6c727f]">+15% desde o mês passado</span>
        </div>
      </div>

      <div class="rounded-lg bordaCard bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <p class="text-sm">Pedidos</p>
          <img class="w-4" src="/img/icons/investimento.png" alt="">
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="font-bold text-3xl">89</span>
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="text-xs text-[#6c727f]">+8% desde o mês passado</span>
        </div>
      </div>

      <div class="rounded-lg bordaCard bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <p class="text-sm">Avaliação Média</p>
          <img class="w-4" src="/img/icons/investimento.png" alt="">
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="font-bold text-3xl">4.8</span>
        </div>
        <div class="flex flex-row items-center justify-between space-y-0  pb-2">
          <span class="text-xs text-[#6c727f]">⭐ Excelente</span>
        </div>
      </div>
    </div>

    <div class="container rounded-lg my-10 p-4 bordaCard">
      <h2 class="text-xl mb-5 font-bold">Produtos Mais Vendidos</h2>

      <div class="flex flex-row items-center justify-between bordaCard p-5 rounded-xl">
        <div class="flex items-center justify-between gap-6">
          <img class="w-14 rounded-xl" src="/img/products-image/photo-1511707171634-5f897ff02aa9.jpg" alt="">
          <div>
            <h3 class="font-bold text-sm">Smartphone Samsung Galaxy S23</h3>
            <span class="text-xs text-[#6c727f]">R$ 2499.99</span>
          </div>
        </div>
        <div>
          <h3 class="font-bold text-sm">23 vendas</h3>
          <span class="text-xs text-[#6c727f]">Este mês</span>
        </div>
      </div>
    </div>
  </section>
</template>


<style>
.bordaCard{
  border: 1px solid #e5e7eb;
}
</style>
