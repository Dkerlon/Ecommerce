<template>
  <main class="m-auto">
    <!-- Barra de busca e layout -->
    <div class="filters">
      <InputSearch
        class="filtroInput"
        v-model="searchTerm"
        place-holder="Buscar Produtos, marcas, categorias..."
      ></InputSearch>

      <div class="showMoreFilters" @click="showFilters = !showFilters">
        <img src="/img/icons/filter.png" alt="">
        <span>Filtros</span>
      </div>
    </div>

    <section class="flex gap-10 my-4">
      <!-- Coluna de filtros -->
      <div v-if="showFilters" class="flex gap-5 flex-col w-[50%] max-w-[300px]">

        <!-- Categorias -->
        <TheCard>
          <label class="font-semibold text-sm mb-2 inline-block">Categorias</label>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2" v-for="cat in categoriasOp" :key="cat.value">
              <input type="checkbox" :id="cat.value" :value="cat.value" v-model="categoriasSelecionadas"/>
              <label :for="cat.value" class="text-sm font-medium">{{ cat.label }}</label>
            </div>
          </div>
        </TheCard>

        <!-- Faixa de preço -->
        <TheCard>
          <label class="font-semibold text-sm mb-2 inline-block">Faixa de Preço</label>
          <TheSlider :min="0" :max="5000" v-model="preco" label="Preço"></TheSlider>
        </TheCard>

        <!-- Avaliação -->
        <TheCard>
          <label class="font-semibold text-sm mb-2 inline-block">Avaliação</label>
          <div class="flex flex-col gap-2">
            <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-2">
              <input type="checkbox" :id="star + '-star'" :value="star" v-model="avaliacaoSelecionada"/>
              <label :for="star + '-star'" class="text-sm font-medium">{{ star }}+ estrela</label>
            </div>
          </div>
        </TheCard>

        <!-- Disponibilidade -->
        <TheCard>
          <label class="font-semibold text-sm mb-2 inline-block">Disponibilidade</label>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="apenas-estoque" v-model="apenasEstoque"/>
            <label for="apenas-estoque" class="font-medium text-sm">Apenas em estoque</label>
          </div>
        </TheCard>

      </div>

      <!-- Lista de produtos -->
      <div class="h-500 w-full">
        <h3 class="pt-5 font-black text-2xl">Produtos em Destaque</h3>
        <p class="text-[#6c727f] text-sm py-1">{{ produtosFiltrados.length }} produtos encontrados</p>

        <div class="flex w-full flex-wrap gap-10 justify-center">
          <ProdutoCard
            v-for="produto in produtosFiltrados"
            :key="produto.id || produto.nome"
            :produto="produto"
          />
          <TheLoader v-if="isLoading && !hasError"/>
          <div v-if="!isLoading && hasError" class="w-full items-center justify-center">
            <p class="text-red-500 text-center">Ocorreu um erro, tente novamente mais tarde</p>
          </div>
        </div>
        <div v-if="produtosFiltrados.length === 0 && !isLoading" class="py-10 text-red-500">
          <p>Nenhum produto encontrado...</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import InputSearch from '../Inputs/InputSearch.vue';
import TheCard from '../Container/TheCard.vue';
import TheSlider from '../Inputs/TheSlider.vue';
import ProdutoCard from '@/components/Produto/ProdutoCard.vue';
import { MeusProdutosService, type Produto } from '@/services/MeusProdutosService';
import type { AvaliacaoPayload } from '@/services/AvaliacaoService';
import TheLoader from '../TheLoader.vue';

const MeusProdutosServiceInstance = new MeusProdutosService();

// Opções

const categoriasOp = [
  { value: 'Eletrônicos', label: 'Eletrônico' },
  { value: 'Roupas', label: 'Roupas' },
  { value: 'Livros', label: 'Livros' },
  { value: 'Móveis', label: 'Móveis' },
  { value: 'Beleza', label: 'Beleza' },
  { value: 'Esportes', label: 'Esportes' }
];

// Estados
const showFilters = ref(true);
const preco = ref(5000);
const searchTerm = ref('');
const categoriasSelecionadas = ref<string[]>([]);
const avaliacaoSelecionada = ref<number[]>([]);
const apenasEstoque = ref(false);
const isLoading = ref(true)
const hasError = ref(false)
const produtos = ref<Produto[]>([]);

function computeAverageRating(avaliacoes?: Record<string, AvaliacaoPayload>): number {
  if (!avaliacoes) return 0
  const values = Object.values(avaliacoes)
  if (values.length === 0) return 0

  const soma = values.reduce((acc, v) => acc + v.avaliacao, 0)
  return soma / values.length
}

const produtosFiltrados = computed(() => {
  return produtos.value.filter(p => {
    if (searchTerm.value) {
      const termo = searchTerm.value.toLowerCase();
      if (
        !p.nome.toLowerCase().includes(termo) &&
        !p.categoria.toLowerCase().includes(termo)
      ) {
        return false;
      }
    }
    if (categoriasSelecionadas.value.length > 0 &&
        !categoriasSelecionadas.value.includes(p.categoria)) return false;
    if (p.preco.atual > preco.value) return false;

    // filtro por avaliação
    if (avaliacaoSelecionada.value.length > 0) {
      const minFiltro = Math.min(...avaliacaoSelecionada.value)
      if ((p.avgRating ?? 0) < minFiltro) return false
    }

    if (apenasEstoque.value && (p.quantidadeDisponivel <= 0 || p.status !== 'ativo')) return false;

    return true;
  });
});

onMounted(async () => {
  try{
    produtos.value = await MeusProdutosServiceInstance.getAllProdutos();
    const raw = await MeusProdutosServiceInstance.getAllProdutos()
    produtos.value = raw.map(p => ({
      ...p,
      avgRating: computeAverageRating(p.avaliacoes)
    }))
  }catch(error){
    console.log('Erro ao buscar produtos', error)
    hasError.value = true
  }finally{
    isLoading.value = false
  }
});

</script>


<style scoped>
main{
    width: 90%;
}

.filters{
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
}

.showMoreFilters, .filtroInput{
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}
.showMoreFilters, .changeLayout{
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    font-size: 15px;
    font-weight: bold;
}

.showMoreFilters:hover{
    background-color: #2863e6;
    color: white;
}

.filters img{
    width: 20px;
}

.changeLayout{
    border-radius: 5px;
    padding: 2px;
}
.changeLayout div{
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
}

.showMoreFilters:hover img{
    filter: invert(1);
}

.img-div:hover{
    background-color: #2863e6;
}
.img-div:hover img{
    filter: invert(1);
}
</style>
