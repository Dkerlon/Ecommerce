<template>
  <TheHeader/>
  <section class="flex gap-10 my-4 w-[90%] m-auto justify-center" v-if="!isLoading">
    <div class="w-[100%] max-w-[530px]">
      <img class="w-full rounded-xl" :src="produto.fotos[0]" alt="imagem1doproduto">
      <div class="flex gap-5 py-4">
        <img class="w-[22%] rounded-xl" :src="produto.fotos[0]" alt="imagem1doproduto">
        <img class="w-[22%] rounded-xl" :src="produto.fotos[0]" alt="imagem1doproduto">
        <img class="w-[22%] rounded-xl" :src="produto.fotos[0]" alt="imagem1doproduto">
        <img class="w-[22%] rounded-xl" :src="produto.fotos[0]" alt="imagem1doproduto">
      </div>
    </div>
    <div class="w-[50%]">
      <div>
        <div class="flex gap-5 mb-2">
          <div class="badge bg-orange-500 text-white py-4 px-2">{{ produto.categoria }}</div>
          <div v-if="produto.preco.emPromocao" class="badge bg-blue-600 text-white py-4 px-2">-{{ produto.preco.percentualDesconto }}% OFF</div>
        </div>
        <h2 class="font-bold text-xl">{{ produto.nome }}</h2>
        <div class="flex items-center gap-2 mb-2">
          <div class="stars relative w-26 min-w-26 h-6 mb-2">
            <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-2xl flex">★★★★★</div>
            <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-2xl flex overflow-hidden"
                :style="{ width: `${(ratingT / 5) * 100}%` }">★★★★★</div>
          </div>
          <span class="text-xs font-bold">{{ ratingT.toFixed(1) }}</span>
          <span class="text-xs text-[#6c727f]">{{ '(' + avaliacoesArray.length + ')' }}</span>
          <div class="text-xs text-[#6c727f]">Vendido por {{ vendedorInfo.nome }}</div>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <h3 class="font-bold text-2xl text-green-600">R$ {{ produto.preco.atual.toFixed(2) }}</h3>
        <h4 v-if="produto.preco.emPromocao" class="font-bold text-sm text-[#6c727f]"><del>R$ {{ produto.preco.original.toFixed(2) }}</del></h4>
      </div>
      <span v-if="produto.preco.emPromocao" class="text-xs text-green-600">Você economizará R$ {{ (produto.preco.atual - produto.preco.original).toFixed(2) }}</span>
      <div class="mb-4">
        <h5 class="text-sm font-bold my-2"><b>Descrição</b></h5>
        <p class="text-sm text-[#6c727f]">{{ produto.descricao }}</p>
      </div>
      <TheCard class="mb-10" style="padding: 0; border: none;" v-if="produto.especificacoes">
        <h5 class="font-bold text-sm my-2">Especificações</h5>
        <div class="border border-[#e5e7eb] rounded-xl p-3">
          <div class="flex items-center justify-between" v-for="(especificacao,index) in produto.especificacoes" :key="index">
            <span class="text-sm font-bold">{{ especificacao.nome }}:</span>
            <span class="text-sm text-[#6c727f]">{{ especificacao.descricao }}</span>
          </div>
        </div>
      </TheCard>
      <div class="flex items-center gap-2 my-4">
        <span class="text-sm font-bold">Quantidade</span>
        <div class="flex items-center gap-4 border border-[#e5e7eb] px-3 py-1 rounded-md">
          <span class="border-r border-[#e5e7eb] pr-3 hover:opacity-60 cursor-pointer text-sm" @click="quantidade--">-</span>
          <span class="border-r border-[#e5e7eb] pr-3 text-sm">{{ quantidade }}</span>
          <span @click="quantidade++" class="hover:opacity-60 cursor-pointer text-sm">+</span>
        </div>
      </div>
      <div class="flex mb-4 gap-3">
        <ButtonFullFilled @click="addToCart(route.params.id as string)" class="w-full" text="Adicionar ao carrinho">
          <template #img-start>
            <div class="flex items-center  justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            </div>
          </template>
        </ButtonFullFilled>
        <ButtonOutlined>
          <template #img-start>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
              </svg>
            </div>
          </template>
        </ButtonOutlined>
        <ButtonOutlined>
          <template #img-start>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </div>
          </template>
        </ButtonOutlined>
      </div>
      <div>
        <ButtonFullFilled class="bg-orange-500 w-full hover:bg-orange-600" text="Comprar Agora" @click="selecionarDesmarcarItem(route.params.id as string, 1)"/>
      </div>
      <div class="flex flex-col gap-2 my-4">
        <div class="flex items-center gap-3 text-xs text-[#6c727f]">
          <img class="w-7" src="/img/icons/em-transito.png" alt="">
          <p>Entrega grátis para todo o Brasil</p>
        </div>
        <div class="flex items-center gap-3 text-xs text-[#6c727f]">
          <img class="w-7" src="/img/icons/protect.png" alt="">
          <p>Compra 100% segura e protegida</p>
        </div>
        <div class="flex items-center gap-3 text-xs text-[#6c727f]">
          <img class="w-7" src="/public/img/icons/gráfico.png" alt="">
          <p>Devolução grátis em até 30 dias</p>
        </div>
      </div>

    </div>
  </section>
  <TheLoader v-if="isLoading && !hasError"/>
  <div v-else-if="!isLoading && hasError" class="!w-full items-center justify-center">
    <p class="text-red-500">Ocorreu um erro, tente novamente mais tarde</p>
  </div>
  <section v-if="!isLoading && !hasError" class="flex flex-col gap-5 my-4 w-[90%] m-auto">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">Avaliações dos clientes</h3>
    <ButtonFullFilled v-if="store.localId" @click="showModal = true" text="Escrever avaliação"/>
  </div>

  <!-- Resumo geral -->
  <div class="border border-[#e5e7eb] p-4 rounded-xl flex justify-between">
    <div class="w-full">
      <div class="flex items-center gap-2 mb-2">
        <div class="stars relative w-26 min-w-26 h-6 mb-2">
          <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-2xl flex">★★★★★</div>
          <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-2xl flex overflow-hidden"
              :style="{ width: `${(ratingT / 5) * 100}%` }">★★★★★</div>
        </div>
        <span class="text-md font-bold">{{ ratingT.toFixed(1) }}</span>
        <span class="text-xs text-[#6c727f]">de 5 estrelas</span>
      </div>
      <p class="text-sm text-[#6c727f]">Baseado em {{ avaliacoesCount }} avaliações</p>
    </div>

    <!-- Distribuição dinâmica -->
    <div class="w-full">
      <div
        v-for="n in 5"
        :key="n"
        class="flex w-full items-center gap-2"
      >
        <span class="text-yellow-400">★</span>
        <span class="text-sm text-[#6c727f]">{{ 6 - n }}</span>
        <div class="border border-[#e5e7eb] w-full rounded-2xl h-2">
          <div
            class="bg-yellow-400 h-2 rounded-2xl"
            :style="{
              width: `${(
                (avaliacoesArray.filter(a => a.avaliacao === (6 - n)).length / avaliacoesCount) * 100
              ) || 0}%`
            }"
          ></div>
        </div>
        <span class="text-sm text-[#6c727f]">
          {{ avaliacoesArray.filter(a => a.avaliacao === (6 - n)).length }}
        </span>
      </div>
    </div>
  </div>

  <!-- Lista de avaliações -->
  <TheCard
    v-for="avaliacao in avaliacoesArray"
    :key="avaliacao.idCliente + avaliacao.comentario"
    class="border-none"
  >
    <div class="flex gap-2 items-center">
      <span class="text-md font-bold">{{ avaliacao.nomeCliente }}</span>
      <div class="badge bg-green-100 text-green-700 py-3 px-2 text-xs">Compra Verificada</div>
    </div>
    <div class="flex gap-2 items-center">
      <div class="stars relative w-22 h-6 mb-2">
        <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-xl flex">★★★★★</div>
        <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-xl flex overflow-hidden"
            :style="{ width: `${Math.ceil(((avaliacao.avaliacao / 5) * 100))}%` }">★★★★★</div>
      </div>
      <span class="text-xs text-[#6c727f]">{{ avaliacao.data }}</span>
    </div>
    <p class="text-sm text-[#6c727f]">{{ avaliacao.comentario }}</p>
  </TheCard>
</section>
  <ModalAvaliacao
      :isOpen="showModal"
      :produtoId="String(route.params.id)"
      :idCliente="store.localId"
      @close="showModal = false"
      @sendAvaliacao="getProdutoAvaliacoes()"
    />
</template>

<script lang="ts" setup>
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue';
import ButtonOutlined from '@/components/UI/buttons/ButtonOutlined.vue';
import type { userInfo } from '@/interfaces/User';
import { MeusProdutosService, type Produto } from '@/services/MeusProdutosService';
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import TheCard from '@/components/UI/Container/TheCard.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import ModalAvaliacao from '@/components/UI/Modais/ModalAvaliacao.vue';
import { useAuthStore } from '@/store/auth';
import { useRoute, useRouter } from 'vue-router';
import { AvaliacaoService, type AvaliacaoPayload } from '@/services/AvaliacaoService';
import { carrinhoService } from '@/services/Carrinho';
import TheLoader from '@/components/UI/TheLoader.vue';
import useCarrinhoStore from '@/store/Carrinho';

const store = useAuthStore()
const carrinhoStore = useCarrinhoStore()
const route = useRoute()
const router = useRouter()
const produtoService = new MeusProdutosService
let produto = reactive<Produto>({} as Produto)
const quantidade = ref(1)
let vendedorInfo = reactive<userInfo>({} as userInfo)
const isLoading = ref(true)
const hasError = ref(false)
const avaliacoesObj = ref<Record<string, AvaliacaoPayload>>({});
const avaliacoesArray = computed<AvaliacaoPayload[]>(() =>
  Object.values(avaliacoesObj.value || {})
);
const avaliacoesCount = computed(() => avaliacoesArray.value.length);
const ratingT = computed(() => {
  if (avaliacoesArray.value.length === 0) return 0;
  const soma = avaliacoesArray.value.reduce((acc, a) => acc + a.avaliacao, 0);
  return soma / avaliacoesArray.value.length;
});
const showModal = ref(false);
async function getProduto(){
  try{
    const response = await produtoService.getProdutoById(String(route.params.id))
    produto = response
  }catch(error){
    console.log(error)
  }
}

async function getVendedorInfo(){
  try{
    const response = await getUserInfoById(produto.vendedorId)
    console.log(produto.vendedorId)
    if(response){
      vendedorInfo = response
    }
    console.log(response)
  }catch(error){
    console.log(error)
  }
}

async function getProdutoAvaliacoes() {
  try{
    const response: Record<string, AvaliacaoPayload> = await AvaliacaoService.getAvaliacoesProduto(String(route.params.id))
    avaliacoesObj.value = response
  }catch{
    alert('ERRO AO BUSCAR AVALIACOES')
  }
}

function addToCart(id: string) {
  carrinhoService.adicionarAoCarrinho(id, quantidade.value);
}

function selecionarDesmarcarItem(id: string, quantidade: number) {
  addToCart(route.params.id as string)
  const existe = carrinhoStore.carrinhoItensSelecionados.find(
    ([itemId]) => itemId === id
  )

  if (existe) {
    carrinhoStore.removerItemSelecionado(id)
  } else {
    carrinhoStore.adicionarItemSelecionado(id, quantidade)
  }

  console.log('Itens selecionados:', carrinhoStore.carrinhoItensSelecionados)
  router.push('/payPage')
}

onMounted( async () => {
  try{
    isLoading.value = true
    await getProduto()
    await getVendedorInfo()
    await getProdutoAvaliacoes()
  }catch{
    console.log('Error')
    hasError.value = true
  }finally{
    isLoading.value = false
  }
})
</script>
