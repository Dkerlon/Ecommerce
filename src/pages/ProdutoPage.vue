<template>
  <TheHeader/>
  <section>
    <div>
      <img src="" alt="">
      <div>
        <img src="" alt="">
        <img src="" alt="">
        <img src="" alt="">
      </div>
    </div>
    <div>
      <div class="tag"></div>
      <h2>Camiseta Polo Masculina</h2>
      <div>
        <div class="stars relative w-32 h-6">
          <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-2xl flex">★★★★★</div>
          <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-2xl flex overflow-hidden"
              :style="{ width: `${(ratingT / 5) * 100}%` }">★★★★★</div>
          <span class="text-xs text-[#6c727f] absolute top-2.5 left-27">(2156)</span>
        </div>
        <div>Vendido por Fashion Brasil</div>
      </div>
    </div>
    <h3>R$ 89,99</h3>
    <div>
      <span><b>Descrição</b></span>
      <p>Camiseta polo de algodão premium, disponível em várias cores. Perfeita para o dia a dia.</p>
    </div>
    <div>
      <span>Quantidade</span>
      <div>
        <span>-</span>
        <span>1</span>
        <span>+</span>
      </div>
    </div>
    <div>
      <ButtonFullFilled text="Adicionar ao carrinho"/>
      <ButtonOutlined text="t"/>
      <ButtonOutlined text="t"/>
    </div>
    <div>
      <ButtonFullFilled text="Comprar Agora"/>
    </div>
    <div>
      <div>
        <img src="" alt="">
        <p>Entrega grátis para todo o Brasil</p>
      </div>
      <div>
        <img src="" alt="">
        <p>Entrega grátis para todo o Brasil</p>
      </div>
      <div>
        <img src="" alt="">
        <p>Entrega grátis para todo o Brasil</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/UI/HomePage/TheHeader.vue';
import ButtonFullFilled from '@/components/UI/buttons/ButtonFullFilled.vue';
import ButtonOutlined from '@/components/UI/buttons/ButtonOutlined.vue';
const ratingT = Math.random()*5
</script>
