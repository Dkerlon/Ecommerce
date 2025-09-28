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
        <div class="flex justify-between items-center mb-2">
          <label class="font-bold text-sm">Especificações técnicas</label>
          <ButtonOutlined @click="addEspecificação" type="button" text="Adicionar Especificação">
            <template #img-start>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </template>
          </ButtonOutlined>
        </div>
        <MainContainer v-if="especificacoes.length > 0">
          <div class="flex items-center justify-evenly gap-2" v-for="(especificacao,index) in especificacoes" :key="index">
            <div class="w-full">
              <label for="" class="font-bold text-sm">Nome</label>
              <InputText :required="true" v-model="especificacao.nome" place-holder="Ex: Bateria"/>
            </div>
            <div class="w-full">
              <label for="" class="font-bold text-sm">Descrição</label>
              <InputText :required="true" v-model="especificacao.descricao" place-holder="Ex: 5800mha"/>
            </div>
            <div>
              <label for="" class=" opacity-0 font-bold text-sm">hidden</label>
              <div @click="removerEspecificação(index)" class="flex flex-col items-center border border-[#e5e7eb] p-2 rounded-lg cursor-pointer hover:opacity-85">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-3.5 text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
              </div>
            </div>
          </div>
        </MainContainer>
        <MainContainer style="border: none" class="text-center" v-else>
          <p class="text-[#6c727f] text-sm">Nenhuma Especificação adicionada</p>
          <p class="text-[#6c727f] text-sm">Clique em "Adicionar Especificação para começar"</p>
        </MainContainer>
      </div>

      <div class="mb-2.5">
        <label for="urlp" class="font-bold text-sm">URL Pública de imagem</label>
        <InputText :required="true" :modelValue="produto.fotos[0]" @update:modelValue="produto.fotos[0] = $event" place-holder="Digite a URL pública da imagem"/>
      </div>

      <div @click="alertar">
        <label for="img-produto" class="font-bold text-sm mb-2 inline-block">Imagens do produto</label>
        <p class="font-bold text-sm text-red-400 mb-4">Temporariamente desbilitado, Digite a URL pública da imagem no campo acima.</p>
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
import { reactive, ref, watch } from 'vue';
import MainContainer from '../UI/Container/MainContainer.vue';
import InputText from '../UI/Inputs/InputText.vue';
import TheSelect from '../UI/Inputs/TheSelect.vue';
import InputNumber from '../UI/Inputs/InputNumber.vue';
import InputFile from '../UI/Inputs/InputFile.vue';
import ButtonOutlined from '../UI/buttons/ButtonOutlined.vue';
import ButtonFullFilled from '../UI/buttons/ButtonFullFilled.vue';
import { ProdutoHttpService, type Produto } from '@/services/AdicionarProdutoService';
import { useAuthStore } from '@/store/auth';
import TheLoader from '../UI/TheLoader.vue';

const store = useAuthStore();
const produtoService = new ProdutoHttpService();

const especificacoes = ref([
  {nome: '', descricao: ''}
])

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
  vendedorId: store.getlocalId,
  especificacoes: especificacoes.value
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

function addEspecificação(){
  especificacoes.value.push({nome: '', descricao: ''})
}

function removerEspecificação(index){
  especificacoes.value.splice(index,1)
}
</script>

<style scoped>
.bordaCard{
  border: 1px solid #e5e7eb;
}
</style>
