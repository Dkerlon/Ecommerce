<template>
  <div @click="$router.push('/products/' + produto.id)" :class="['items-center justify-center', fullWidth ? 'w-full' : 'md:w-[45%] xl:w-[20%]']">
      <div
        class="img-produto group flex items-end justify-center p-3 hover:scale-101 hover:cursor-pointer overflow-hidden
              bg-cover bg-center rounded-xl transition-all duration-500 relative ease-in-out"
        :style="{ backgroundImage: `url(${produto.fotos[0]})`, height: fullWidth ? '100%' : '280px' }"
      >
      <button
        class="bg-[#f97316] opacity-0 group-hover:opacity-100 rounded-md text-white w-full py-2 px-2 text-sm font-semibold cursor-pointer
       hover:bg-amber-700 transition-all duration-500 ease-in-out transform translate-y-5 group-hover:translate-y-0">
        Adicionar ao carrinho
      </button>
        <span v-if="produto.preco.emPromocao" class="bg-red-500 hover:bg-blue-400 transition-all duration-500 ease-in-out p-1 text-xs rounded-xl text-white absolute top-2 left-2">-30%</span>
        <div class="bg-gray-400 hover:bg-gray-300 p-1 absolute top-2 right-5 rounded-xl transition-all duration-500 ease-in-out">
          <img class="w-5 invert brightness-200" src="/public/img/icons/favorite.png" alt="">
        </div>
    </div>
    <div class="flex flex-col mt-3">
      <label class="text-xs font-bold text-[#6c727f]" for="">{{ produto.categoria }}</label>
      <h5 class="font-bold text-md py-0.5">{{ produto.nome }}</h5>
      <div class="stars relative w-26 min-w-26 h-6">
        <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-2xl flex">★★★★★</div>
        <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-2xl flex overflow-hidden"
             :style="{ width: `${(ratingT / 5) * 100}%` }">★★★★★</div>
        <span class="text-xs text-[#6c727f] absolute top-2.5 left-27">({{ avaliacoesCount }})</span>
      </div>
      <span class="text-xs text-[#6c727f] py-2">por {{ vendedorNome }}</span>
      <div class="flex items-center gap-2 ">
        <span class="text-[#16a249] font-bold">R$ {{ produto.preco.atual }}</span>
        <span v-if="produto.preco.emPromocao" class="text-[#6c727f] text-xs"><del>R$ {{ produto.preco.original }}</del></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvaliacaoPayload } from '@/services/AvaliacaoService';
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import type { Produto } from '@/services/MeusProdutosService';
import { computed, onMounted, ref } from 'vue';
const props = defineProps<{
  fullWidth: boolean,
  produto: Produto
}>()
const vendedorNome = ref('')
const avaliacoesObj = ref(props.produto.avaliacoes)
const avaliacoesArray = computed<AvaliacaoPayload[]>(() =>
  Object.values(avaliacoesObj.value || {})
);
const avaliacoesCount = computed(() => avaliacoesArray.value.length);
const ratingT = computed(() => {
  if (avaliacoesArray.value.length === 0) return 0;
  const soma = avaliacoesArray.value.reduce((acc, a) => acc + a.avaliacao, 0);
  return soma / avaliacoesArray.value.length;
});

onMounted( async () => {
  const response = await getUserInfoById(String(props.produto.vendedorId))
  vendedorNome.value = response.nome
  let avaliacoes = 0
  for(const avaliacao in response.avaliacoes.nota){
    avaliacoes += Number(avaliacao)
  }
  ratingT.value = avaliacoes / response.avaliacoes.length
})
</script>

<style>
.bg-background:hover .btn-bg-background {
  opacity: 1;
  translate: 0px 0px;
}
</style>
