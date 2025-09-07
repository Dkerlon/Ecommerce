<template>
    <main>
        <div class="filters">
            <InputSearch class="filtroInput" place-holder="Buscar Produtos, marcas, categorias..."></InputSearch>
            <div class="showMoreFilters">
                <img src="/img/icons/filter.png" alt="">
                <span>Filtros</span>
            </div>
            <div class="changeLayout">
                <div class="img-div"><img src="/img/icons/grid.png" alt=""></div>
                <div class="img-div"><img src="/img/icons/lista.png" alt=""></div>
            </div>
        </div>

        <section class="flex gap-10">
          <div class="flex gap-5 flex-col w-[50%] max-w-[300px]">
            <TheCard>
              <label for="ordenar" class="font-semibold text-sm mb-2 inline-block">Ordenar Por</label>
              <TheSelect :required="true" v-model="relevancia" :options="relevanciaOp" placeholder="Selecione a categoria"/>
            </TheCard>
            <TheCard>
              <label for="ordenar" class="font-semibold text-sm mb-2 inline-block">Categorias</label>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <input type="checkbox" id="eletronico"/>
                  <label class="text-sm font-medium" for="eletronico">Eletrônico</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="roupas"/>
                  <label class="text-sm font-medium" for="roupas">Roupas</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="livros"/>
                  <label class="font-medium text-sm" for="livros">Livros</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="moveis"/>
                  <label class="font-medium text-sm" for="moveis">Móveis</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="beleza"/>
                  <label class="font-medium text-sm" for="beleza">Beleza</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="esportes"/>
                  <label class="font-medium text-sm" for="esportes">Esportes</label>
                </div>
              </div>
            </TheCard>
            <TheCard>
              <label for="ordenar" class="font-semibold text-sm mb-2 inline-block">Faixa de Preço</label>

              <TheSlider :min="0" :max="5000" v-model="preco" label="Preço"></TheSlider>
            </TheCard>
            <TheCard>
              <label for="ordenar" class="font-semibold text-sm mb-2 inline-block">Avaliação</label>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <input type="checkbox" id="5-star"/>
                  <label class="text-sm font-medium" for="5-star">5+ estrela</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="4-star"/>
                  <label class="text-sm font-medium" for="4-star">4+ estrela</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="3-star"/>
                  <label class="text-sm font-medium" for="3-star">3+ estrela</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="2-star"/>
                  <label class="text-sm font-medium" for="2-star">2+ estrela</label>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="1-star"/>
                  <label class="text-sm font-medium" for="1-star">1+ estrela</label>
                </div>
              </div>
            </TheCard>
            <TheCard>
              <label for="ordenar" class="font-semibold text-sm mb-2 inline-block">Disponibilidade</label>

              <div class="flex items-center gap-2">
                  <input type="checkbox" id="apenas-estoque"/>
                  <label class="font-medium text-sm" for="apenas-estoque">Apenas em estoque</label>
              </div>
            </TheCard>
          </div>
          <div class="h-500 w-full">
            <h3 class="pt-5 font-black text-2xl">Produtos em Destaque</h3>
            <p class="text-[#6c727f] text-sm py-1">3 produtos encontrados</p>

            <div class ="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mt-6">
              <ProdutoCard/>
              <ProdutoCard/>
              <ProdutoCard/>
              <ProdutoCard/>
            </div>
          </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import InputSearch from '../Inputs/InputSearch.vue';
import TheCard from '../Container/TheCard.vue';
import TheSelect from '../Inputs/TheSelect.vue';
import TheSlider from '../Inputs/TheSlider.vue';
import ProdutoCard from '@/components/Produto/ProdutoCard.vue';
import { ref } from 'vue';

const relevanciaOp = [
    {value: 'mais-relevantes', label: 'Mais Relevantes'},
    {value: 'menor-preco', label: 'Menor Preço'},
    {value: 'maior-preco', label: 'Maior Preço'},
    {value: 'melhor-avaliado', label: 'Melhor Avaliado'},
    {value: 'mais-recente', label: 'Mais Recente'}
]
const preco = ref(0)
const relevancia = ref('')
</script>

<style scoped>
main{
    width: 90%;
    margin: 0 auto;
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
