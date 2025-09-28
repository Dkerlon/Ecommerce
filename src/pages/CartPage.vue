<template>
  <TheHeader/>
  <main class="m-auto w-[90%]">
    <!-- Navegação -->
    <nav>
      <RouterLink to="/" class="flex items-center gap-2">
        <img class="w-5" src="/public/img/icons/arrow.svg" alt="">
        <span class="text-sm text-[#6c727f]">Go to Home Page</span>
      </RouterLink>
    </nav>

    <!-- Carrinho preenchido -->
    <MainContainer
      v-if="!isLoading && carrinhoItens.length > 0"
      class="!border-none flex gap-4 justify-center"
    >
      <!-- Lista de itens -->
      <section class="w-2/3">
        <header class="flex justify-between items-center mb-2">
          <h3 class="font-bold text-1xl">Carrinho de Compras</h3>
          <div>
            <div class="badge badge-sm border-[#e5e7eb]">
              {{ carrinhoItens.length }} Itens
            </div>
            <div class="badge badge-sm border-[#e5e7eb] ml-2">
              {{ carrinhoStore.carrinhoItensSelecionados.length }} Itens Selecionados
            </div>
          </div>
        </header>

        <ProdutoCardCart
          v-for="item in carrinhoItens"
          :key="item.id"
          :item="item"
          @click="selecionarDesmarcarItem(item.id!, item.quantidade)"
          @atualizarQuantidade="atualizarQuantidade"
          @deletarItemCarrinho="deletarItemCarrinho"
          :class="{ 'bg-blue-100': isSelecionado(item.id!) }"
        />
      </section>

      <!-- Resumo do pedido -->
      <section>
        <div class="w-[350px] h-[290px] bg-[#e5e7eb] rounded-lg p-4 flex flex-col justify-between">
          <h3 class="font-bold text-1xl">Resumo do Pedido</h3>

          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Subtotal</span>
            <span class="font-bold">R$ {{ subTotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Frete</span>
            <span class="font-bold">R$ {{ frete }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-sm text-[#6c727f]">Total</span>
            <span class="font-bold text-green-500">R$ {{ total.toFixed(2) }}</span>
          </div>

          <ButtonFullFilled
            @click="$router.push('/payPage')"
            text="Finalizar Compra"
          />

          <div class="flex flex-col gap-1 mt-2">
            <span class="text-[#6c727f] text-xs flex items-center gap-2">
              <img src="/img/icons/check.svg" alt="">
              Compra 100% segura
            </span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2">
              <img src="/img/icons/check.svg" alt="">
              Devolução Grátis em 30 dias
            </span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2">
              <img src="/img/icons/check.svg" alt="">
              Garantia do produto
            </span>
          </div>
        </div>
      </section>
    </MainContainer>

    <!-- Carrinho vazio -->
    <MainContainer
      v-else-if="!isLoading && carrinhoItens.length < 1"
      class="flex flex-col gap-5 items-center my-20"
    >
      <img
        class="w-35"
        src="/public/img/icons/shopping-bag.svg"
        alt="ícone carrinho vazio"
      >
      <p class="text-[#6c727f] text-md">
        Que tal adicionar alguns produtos incríveis ao seu carrinho?
      </p>
      <ButtonFullFilled
        text="Continuar comprando"
        @click="$router.push('/')"
      />
    </MainContainer>
  </main>
</template>


<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import MainContainer from '@/components/UI/Container/MainContainer.vue'
import TheHeader from '@/components/UI/HomePage/TheHeader.vue'
import ProdutoCardCart from '@/components/Produto/ProdutoCardCart.vue'
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue'
import { MeusProdutosService, type Produto } from '@/services/MeusProdutosService'
import getUserInfoById from '@/services/getUserInfo/userInfoById'
import { useAuthStore } from '@/store/auth'
import { carrinhoService } from '@/services/Carrinho'
import useCarrinhoStore from '@/store/Carrinho'
import type { userInfo } from '@/interfaces/User'

const produtosService = new MeusProdutosService()
const store = useAuthStore()
const carrinhoStore = useCarrinhoStore()

const carrinhoItens = ref<Produto[]>([])
const isLoading = ref(true)

const subTotal = computed(() => {
  return carrinhoItens.value.reduce((total, item) => {
    const selecionado = carrinhoStore.carrinhoItensSelecionados.find(
      ([id]) => id === item.id
    )
    if (selecionado) {
      total += item.preco.atual * item.quantidade
    }
    return total
  }, 0)
})

const frete = +(Math.random() * 100).toFixed(2)
const total = computed(() => frete + subTotal.value)


function isSelecionado(id: string) {
  return carrinhoStore.carrinhoItensSelecionados.some(([itemId]) => itemId === id)
}

async function getProdutosCarrinho() {
  try {
    isLoading.value = true
    const response = (await getUserInfoById(store.localId)) as userInfo

    const productsID = Object.keys(response.carrinho)
    let produtos = await produtosService.getAllProdutos()

    produtos = produtos
      .filter(produto => productsID.includes(produto.id!))
      .map(produto => ({
        ...produto,
        quantidade: response.carrinho[produto.id!].quantidade
      }))

    carrinhoItens.value = produtos
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error)
  } finally {
    isLoading.value = false
  }
}

function atualizarQuantidade(id: string, valor: number) {
  const item = carrinhoItens.value.find(item => item.id === id)
  if (!item) return

  const novaQuantidade = item.quantidade + valor
  if (novaQuantidade <= 0) {
    deletarItemCarrinho(id)
    return
  }

  item.quantidade = novaQuantidade
  carrinhoService.atualizarProdutoCarrinho(id, novaQuantidade)
  carrinhoStore.adicionarItemSelecionado(id, novaQuantidade)
}

function deletarItemCarrinho(id: string) {
  carrinhoItens.value = carrinhoItens.value.filter(item => item.id !== id)

  carrinhoStore.removerItemSelecionado(id)

  carrinhoService.deletarProdutoCarrinho(id).catch(err => {
    console.error('Erro ao deletar do banco', err)
    getProdutosCarrinho()
  })
}

function selecionarDesmarcarItem(id: string, quantidade: number) {
  const existe = carrinhoStore.carrinhoItensSelecionados.find(
    ([itemId]) => itemId === id
  )

  if (existe) {
    carrinhoStore.removerItemSelecionado(id)
  } else {
    carrinhoStore.adicionarItemSelecionado(id, quantidade)
  }

  console.log('Itens selecionados:', carrinhoStore.carrinhoItensSelecionados)
}

onMounted(() => {
  getProdutosCarrinho()
})
</script>
