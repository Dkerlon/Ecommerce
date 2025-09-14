<!-- eslint-disable vue/valid-v-model -->
<template>
  <div v-if="isOpen" class="bg-modal fixed inset-0 flex items-center justify-center z-50">
    <form @submit.prevent="enviarAtualização" v-if="formProduto">
      <div class="bg-white rounded-xl shadow-lg w-[600px] p-6 relative">
        <h2 class="text-xl font-semibold mb-4">Atualizar Produto</h2>

        <div class="flex gap-5">
          <div class="w-full">
            <label class="block mb-1 text-sm font-medium">Nome do produto</label>
            <input-text
              class="mb-2"
              place-holder="Digite seu nome"
              :required="true"
              v-model="formProduto.nome"
            />
          </div>
          <div class="w-full">
            <label class="block mb-1 text-sm font-medium">Categoria</label>
            <the-select
              :required="true"
              v-model="formProduto.categoria"
              class="mb-2"
              :options="categorias"
            />
          </div>
        </div>

        <div class="flex gap-5">
          <div class="w-full">
            <label class="block mb-1 text-sm font-medium">Preço (R$)</label>
            <input-number
              class="mb-2"
              place-holder="0.00"
              :required="true"
              v-model="formProduto.preco.original"
            />
          </div>
          <div class="w-full">
            <label class="block mb-1 text-sm font-medium">Estoque</label>
            <input-number
              class="mb-2"
              place-holder="0"
              :required="true"
              v-model="formProduto.quantidadeDisponivel"
            />
          </div>
        </div>

        <label class="block mb-1 text-sm font-bold">Descrição</label>
        <textarea
          required
          v-model="formProduto.descricao"
          rows="4"
          class="w-full border outline-none border-[#e5e7eb] focus:ring-2 focus:ring-blue-500 text-sm rounded-xl p-2 mb-4 resize-none"
          placeholder="Escreva sua avaliação..."
        ></textarea>

        <div class="flex items-center justify-between mb-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Aplicar desconto</label>
            <p class="block mb-1 text-sm text-[#6c727f]">
              Ative para aplicar um desconto promocional
            </p>
          </div>
          <toggle-input v-model="formProduto.preco.emPromocao" />
        </div>

        <div class="flex gap-5" v-if="produto.preco.emPromocao">
          <div class="w-full">
            <label class="block mb-1 text-sm font-medium">Percentual de desconto (%)</label>
            <input-number
              class="mb-2"
              place-holder="0"
              :required="true"
              v-model="formProduto.preco.percentualDesconto"
            />
          </div>
        </div>
      <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <label class="font-bold text-sm">Especificações técnicas</label>
            <ButtonOutlined @click="addEspecificação" type="button" text="Adicionar Especificação">
              <template #img-start>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="size-3.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </template>
            </ButtonOutlined>
          </div>

          <MainContainer v-if="especificacoes.length > 0">
            <div
              class="flex items-center justify-evenly gap-2"
              v-for="(especificacao, index) in especificacoes"
              :key="index"
            >
              <div class="w-full">
                <label for="" class="font-bold text-sm">Nome</label>
                <InputText
                  :required="true"
                  v-model="especificacao.nome"
                  place-holder="Ex: Bateria"
                />
              </div>
              <div class="w-full">
                <label for="" class="font-bold text-sm">Descrição</label>
                <InputText
                  :required="true"
                  v-model="especificacao.descricao"
                  place-holder="Ex: 5800mha"
                />
              </div>
              <div>
                <label for="" class="opacity-0 font-bold text-sm">hidden</label>
                <div
                  @click="removerEspecificação(index)"
                  class="flex flex-col items-center border border-[#e5e7eb] p-2 rounded-lg cursor-pointer hover:opacity-85"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="size-3.5 text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
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

        <div class="flex items-center justify-between mb-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Produto ativo</label>
            <p class="block mb-1 text-sm text-[#6c727f]">
              Desative para remover temporariamente da loja
            </p>
          </div>
          <toggle-input v-model="statusProduto" />
        </div>

        <div class="flex justify-end gap-3">
          <button-outlined type="button" @click="$emit('close')" text="Cancelar" />
          <button-full-filled type="submit" text="Salvar alterações" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Produto } from '@/services/MeusProdutosService'
import { computed, onMounted, ref, watch } from 'vue'
import ButtonFullFilled from '../buttons/ButtonFullFilled.vue'
import ButtonOutlined from '../buttons/ButtonOutlined.vue'
import InputText from '../Inputs/InputText.vue'
import InputNumber from '../Inputs/InputNumber.vue'
import TheSelect from '../Inputs/TheSelect.vue'
import ToggleInput from '../Inputs/ToggleInput.vue'
import { MeusProdutosService } from '@/services/MeusProdutosService'
import MainContainer from '../Container/MainContainer.vue'
const produtosService = new MeusProdutosService()
const props = defineProps<{
  isOpen: boolean
  produto: Produto
}>()

const formProduto = ref<Produto>()
const categorias = [
  { label: 'Eletrônicos', value: 'Eletrônicos' },
  { label: 'Roupas', value: 'Roupas' },
  { label: 'Livros', value: 'Livros' },
  { label: 'Móveis', value: 'Móveis' },
  { label: 'Beleza', value: 'Beleza' },
  { label: 'Esportes', value: 'Esportes' },
]
const statusProduto = computed({
  get: () => formProduto.value?.status === 'ativo',
  set: (val: boolean) => {
    if (formProduto.value) {
      formProduto.value.status = val ? 'ativo' : 'inativo'
    }
  },
})
const especificacoes = ref([])
function addEspecificação() {
  especificacoes.value.push({ nome: '', descricao: '' })
}

function removerEspecificação(index: number) {
  especificacoes.value.splice(index, 1)
}
watch(
  () => props.produto,
  (novo) => {
    formProduto.value = novo
  },
  { immediate: true },
)

watch(
  () => [formProduto.value?.preco.emPromocao, formProduto.value?.preco.percentualDesconto],
  () => {
    if (formProduto.value?.preco.emPromocao) {
      formProduto.value.preco.atual =
        formProduto.value.preco.original * (1 - formProduto.value.preco.percentualDesconto / 100)
    } else {
      if (formProduto.value) {
        formProduto.value.preco.atual = formProduto.value.preco.original
      }
    }
  },
  { immediate: true },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

async function enviarAtualização() {
  if (formProduto.value?.id && formProduto.value) {
    formProduto.value.especificacoes = especificacoes.value
    await produtosService.atualizarProduto(formProduto.value?.id, formProduto.value)
    emit('close')
  }
}

onMounted(() => {
  console.log(props.produto)
})
</script>
<style>
.bg-modal {
  background-color: rgba(0, 0, 0, 0.363);
}
</style>
