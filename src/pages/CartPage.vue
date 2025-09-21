<template>
  <TheHeader/>
  <main class="m-auto w-[90%]">
    <nav>
      <RouterLink to="/" class="flex items-center gap-2"><img class="w-5" src="/public/img/icons/arrow.svg" alt=""> <span class="text-sm text-[#6c727f]">Go to Home Page</span></RouterLink>
    </nav>
    <MainContainer v-if="!isLoading && carrinhoItens.length > 0" class="!border-none flex gap-4 justify-center">
      <section class="w-2/3">
        <header class="flex justify-between items-center mb-2">
          <h3 class="font-bold text-1xl">Carrinho de Compras</h3>
          <div class="badge badge-sm border-[#e5e7eb]">{{ carrinhoItens.length }} Itens</div>
        </header>
        <ProdutoCardCart v-for="item in carrinhoItens" :key="item.id" :item="item" @atualizarQuantidade="atualizarQuantidade" @deletarItemCarrinho="deletarItemCarrinho"/>
      </section>
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
          <ButtonFullFilled text="Finalizar Compra"/>
          <div class="flex flex-col gap-1 mt-2">
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Compra 100% segura</span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Devolução Grátis em 30 dias</span>
            <span class="text-[#6c727f] text-xs flex items-center gap-2"> <img src="/img/icons/check.svg" alt=""> Garantia do produto</span>
          </div>
        </div>
      </section>
    </MainContainer>
    <MainContainer v-else-if="!isLoading && carrinhoItens.length < 1" class="flex flex-col gap-5 items-center my-20">
      <img class="w-35" src="/public/img/icons/shopping-bag.svg" alt="ícone carrinho vazio">
      <p class="text-[#6c727f] text-md">Que tal adicionar alguns produtos incríveis ao seu carrinho?</p>
      <ButtonFullFilled text="Continuar comprado" @click="$router.push('/')"/>
    </MainContainer>
  </main>
</template>

<script lang="ts" setup>
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import ProdutoCardCart from '@/components/Produto/ProdutoCardCart.vue';
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue';
import { MeusProdutosService, type Produto } from '@/services/MeusProdutosService';
import getUserInfoById from '@/services/getUserInfo/userInfoById';
import { useAuthStore } from '@/store/auth';
import { computed, onMounted, ref } from 'vue';
import type { userInfo } from '@/interfaces/User';
import { carrinhoService } from '@/services/Carrinho';
const produtosService = new MeusProdutosService()
const store = useAuthStore()
const carrinhoItens = ref<Produto[]>([])
const isLoading = ref(true)
const subTotal = computed(() => {
  let total = 0
  for(const item of carrinhoItens.value){
    total+= item.preco.atual * item.quantidade
  }
  return total
})

const frete = +(Math.random() * 100).toFixed(2)
const total = computed(() => {
  return frete + subTotal.value
})

async function getProdutosCarrinho() {
  try {
    isLoading.value = true
    const response = await getUserInfoById(store.localId) as userInfo;

    const productsID = Object.keys(response.carrinho)
    let produtos: Produto[] = await produtosService.getAllProdutos()

    produtos = produtos
      .filter(produto => productsID.includes(produto.id!))
      .map(produto => ({
        ...produto,
        quantidade: response.carrinho[produto.id!].quantidade
      }))

    carrinhoItens.value = produtos
  } catch (error) {
    console.error('Erro ao buscar produtos do carrinho:', error);
  } finally {
    isLoading.value = false
  }
}
function atualizarQuantidade(id: string, valor: number) {
  const itemIdx = carrinhoItens.value.findIndex(item => item.id === id)

  if (itemIdx === -1) return

  const item = carrinhoItens.value[itemIdx]
  const novaQuantidade = item.quantidade + valor

  if (novaQuantidade <= 0) {
    carrinhoItens.value.splice(itemIdx, 1)
  } else {
    carrinhoItens.value[itemIdx].quantidade = novaQuantidade
  }

  carrinhoService.atualizarProdutoCarrinho(id, item.quantidade)
}

function deletarItemCarrinho(id: string) {
  const itemIdx = carrinhoItens.value.findIndex(item => item.id === id)
  if (itemIdx === -1) return
  carrinhoItens.value.splice(itemIdx, 1)
  carrinhoService.deletarProdutoCarrinho(id).catch(err => {
    console.error('Erro ao deletar do banco', err)
    getProdutosCarrinho()
  })
}

onMounted(() => {
  getProdutosCarrinho();
})
</script>
