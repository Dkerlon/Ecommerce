<template>
  <form v-on:submit.prevent="cadastrarProduto">
    <MainContainer>
      <h3 class="font-bold text-xl">Adicionar Novo Produto</h3>
      <p class="text-[#6c727f] text-sm mb-6 my-1">Preencha as informações do seu produto</p>

      <div class="flex justify-between items-center gap-10 mb-2.5">
        <div class="flex flex-col w-[90%]">
          <label for="nome-produto" class="font-bold text-sm mb-2">Nome do produto</label>
          <InputText :required="true" :modelValue="produto.nome" @update:modelValue="produto.nome = $event" place-holder="Digite o nome do produto"/>
        </div>
        <div class="flex flex-col w-[90%]">
          <label for="categoria" class="font-bold text-sm mb-2">Categoria</label>
          <TheSelect :required="true" v-model="produto.categoria" :options="categorias" placeholder="Selecione a categoria"/>
        </div>
      </div>

      <div class="flex justify-between items-center gap-10 mb-2.5">
        <div class="flex flex-col w-[90%]">
          <label for="preco" class="font-bold text-sm mb-2">Preço (R$)</label>
          <InputNumber :modelValue="produto.preco.original" @update:modelValue="produto.preco.original = $event" place-holder="0.00"/>
        </div>
        <div class="flex flex-col w-[90%]">
          <label for="quantidade" class="font-bold text-sm mb-2">Quantidade em estoque</label>
          <InputNumber :required="true" :modelValue="produto.quantidadeDisponivel" @update:modelValue="produto.quantidadeDisponivel = $event" place-holder="0"/>
        </div>
      </div>

      <div class="mb-2.5">
        <label for="descricao" class="font-bold text-sm">Descrição</label>
        <textarea required="true" v-model="produto.descricao" class="outline-none w-full border text-sm border-[#e5e7eb] p-2 rounded-lg focus:ring-2 focus:ring-blue-500 my-2" placeholder="Descreva o seu produto detalhadamente..." id="descricao"></textarea>
      </div>

      <div class="mb-2.5">
        <label for="urlp" class="font-bold text-sm">URL Pública de imagem</label>
        <InputText :required="true" :modelValue="produto.fotos[0]" @update:modelValue="produto.fotos[0] = $event" place-holder="Digite a URL pública da imagem"/>
      </div>

      <div @click="alertar">
        <label for="img-produto" class="font-bold text-sm mb-2 inline-block">Imagens do produto</label>
        <p class="font-bold text-sm text-red-400">Temporariamente desbilitado, Digite a URL pública da imagem no campo acima.</p>
        <InputFile/>
      </div>

      <div class="flex justify-end mt-6 gap-5">
        <ButtonOutlined text="Salvar como rascunho" @click="salvarRascunho"/>
        <ButtonFullFilled type="submit" text="Cadastrar Produto"/>
      </div>
    </MainContainer>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import MainContainer from '../UI/Container/MainContainer.vue';
import InputText from '../UI/Inputs/InputText.vue';
import TheSelect from '../UI/Inputs/TheSelect.vue';
import InputNumber from '../UI/Inputs/InputNumber.vue';
import InputFile from '../UI/Inputs/InputFile.vue';
import ButtonOutlined from '../UI/buttons/ButtonOutlined.vue';
import ButtonFullFilled from '../UI/buttons/ButtonFullFilled.vue';
import { ProdutoHttpService, type Produto } from '@/services/AdicionarProdutoService';
import { useAuthStore } from '@/store/auth';

const store = useAuthStore();
const produtoService = new ProdutoHttpService();

// Dados reativos do produto
const produto = reactive<Produto>({
  nome: '',
  descricao: '',
  categoria: '',
  preco: {
    atual: 0,
    original: 0,
    emPromocao: false,
    percentualDesconto: 0
  },
  quantidadeDisponivel: 0,
  status: 'ativo',
  fotos: [],
  vendedorId: store.getlocalId
});

const categorias = [
  { label: 'Eletrônicos', value: 'Eletrônicos' },
  { label: 'Roupas', value: 'Roupas' },
  { label: 'Livros', value: 'Livros' },
  { label: 'Móveis', value: 'Móveis' },
  { label: 'Beleza', value: 'Beleza' },
  { label: 'Esportes', value: 'Esportes' }
];

// Cadastrar produto
const cadastrarProduto = async () => {
  try {
    const id = await produtoService.adicionarProduto(produto);
    console.log('Produto cadastrado com sucesso:', produto);
    alert(`Produto cadastrado com sucesso! ID: ${id}`);
  } catch (error) {
    console.error(error);
    alert('Erro ao cadastrar produto');
  }
};

// Salvar como rascunho (opcional)
const salvarRascunho = () => {
  console.log('Produto salvo como rascunho:', produto);
  alert('Rascunho salvo!');
};

function alertar(){
  alert('Temporariamente desabilitado, por favor insira uma URL de imagem manualmente.')
}

watch(produto, () => {
  produto.preco.atual = produto.preco.original
}, { deep: true });
</script>

<style scoped>
.bordaCard{
  border: 1px solid #e5e7eb;
}
</style>
