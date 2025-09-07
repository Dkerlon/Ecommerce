<template>
  <div class="items-center justify-center">
    <div class="
      bg-[url('https://m.media-amazon.com/images/I/516ZcV87uvL._UF1000,1000_QL80_.jpg')]
      flex items-end justify-center p-3 hover:scale-101 hover:cursor-pointer overflow-hidden
      bg-background bg-cover bg-center rounded-xl  h-90 w-90 transition-all duration-500 relative ease-in-out"
    >
    <button class="bg-[#f97316] opacity-0 rounded-md text-white w-full py-2 px-2 text-sm font-semibold cursor-pointer hover:bg-amber-700 btn-bg-background transition-all duration-500 ease-in-out translate-y-5">Adicionar ao carrinho</button>
    <span class="bg-red-500 hover:bg-blue-400 transition-all duration-500 ease-in-out p-1 text-xs rounded-xl text-white absolute top-2 left-2">-30%</span>
    <div class="bg-gray-400 hover:bg-gray-300 p-1 absolute top-2 right-2 rounded-xl transition-all duration-500 ease-in-out">
      <img class="w-5 invert brightness-200" src="/public/img/icons/favorite.png" alt="">
    </div>
  </div>
  <div class="flex flex-col mt-3">
    <label class="text-xs font-bold text-[#6c727f]" for="">ELETRÔNICO</label>
    <h5 class="font-bold text-md py-0.5">Samsung Galaxy S25</h5>
    <div class="stars relative w-32 h-6">
      <div class="stars-empty absolute top-0 left-0 w-full h-full text-gray-300 text-2xl flex">
        ★★★★★
      </div>
      <div class="stars-full absolute top-0 left-0 w-full h-full text-yellow-400 text-2xl flex overflow-hidden"
          :style="{ width: `${(ratingT / 5) * 100}%` }">
        ★★★★★
      </div>
      <span class="text-xs text-[#6c727f] absolute top-2.5 left-27">(2156)</span>
    </div>
    <span class="text-xs text-[#6c727f] py-2">por Samsung</span>
    <div class="flex items-center gap-2 ">
      <span class="text-[#16a249] font-bold">R$ 599,99</span>
      <span class="text-[#6c727f] text-xs"><del>R$ 799,99</del></span>
    </div>
    </div>
  </div>
</template>

<script setup lang=ts>
defineProps({
  rating: {
    type: Number,
    default: 0
  }
})

const ratingT = Math.random() * 5

</script>

<style>

.bg-background:hover .btn-bg-background {
   opacity: 1;
   translate: 0px 0px;
}
</style>
