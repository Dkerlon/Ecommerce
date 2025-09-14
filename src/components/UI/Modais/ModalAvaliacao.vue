<template>
  <div v-if="isOpen" class="bg-modal fixed inset-0 flex items-center justify-center z-50">
    <form @submit.prevent="publicarAvaliacao(produtoId,idCliente)">
      <div class="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
        <h2 class="text-xl font-semibold mb-4">Escrever Avaliação</h2>

        <label class="block mb-1 text-sm font-medium">Seu nome</label>
        <input-text class="mb-2" place-holder="Digite seu nome" :required="true" v-model="nome" />

        <label class="block text-sm font-bold">Avaliação</label>
        <div class="flex gap-2 mb-1">
          <button type="button" v-for="star in 5" :key="star" @click="avaliacao = star" class="text-2xl cursor-pointer">
            <span :class="star <= avaliacao ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </button>
        </div>

        <label class="block mb-1 text-sm font-bold">Comentário</label>
        <textarea
          required
          v-model="comentario"
          rows="4"
          class="w-full border outline-none border-[#e5e7eb] focus:ring-2 focus:ring-blue-500 text-sm rounded-xl p-2 mb-4 resize-none"
          placeholder="Escreva sua avaliação..."
        ></textarea>

        <div class="flex justify-end gap-3">
          <button-outlined type="button" @click="$emit('close')" text="Cancelar" />
          <button-full-filled type="submit" @click="$emit('sendAvaliacao')" text="Publicar Avaliação"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonFullFilled from "../buttons/ButtonFullFilled.vue";
import ButtonOutlined from "../buttons/ButtonOutlined.vue";
import InputText from "../Inputs/InputText.vue";
import { AvaliacaoService } from "@/services/AvaliacaoService";

defineProps({
  isOpen: { type: Boolean, default: false },
  produtoId: { type: String, required: true },
  idCliente: { type: String, required: true },
});
const emit = defineEmits(["close",'sendAvaliacao']);

const nome = ref("");
const avaliacao = ref(0);
const comentario = ref("");

async function publicarAvaliacao(produtoId: string, idCliente: string) {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR"); // dd/mm/aaaa

  try {
    await AvaliacaoService.publicarAvaliacao({
      produtoId,
      idCliente,
      nomeCliente: nome.value,
      avaliacao: avaliacao.value,
      comentario: comentario.value,
      data: dataFormatada,
    });
    emit('close')
  } catch (err) {
    console.log("Erro ao publicar avaliação", err);
  }
}
</script>
<style>
.bg-modal{
  background-color: rgba(0, 0, 0, 0.527);
}
</style>
