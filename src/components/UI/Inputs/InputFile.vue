<template>
  <div class="w-full">
    <div
      class="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#e5e7eb] rounded-lg cursor-pointer hover:border-blue-400 transition"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-12 h-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 7v4a1 1 0 001 1h3m10-5h2a2 2 0 012 2v12a2 2 0 01-2
          2H6a2 2 0 01-2-2v-5h3m0 0l4-4m0 0l4 4m-4-4v12" />
      </svg>

      <p class="mt-2 text-sm text-gray-500">
        Clique para fazer upload ou arraste as imagens aqui
      </p>

      <button
        type="button"
        class="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:border-blue-400 shadow hover:bg-gray-50 cursor-pointer"
      >
        Selecionar imagens
      </button>

      <!-- input escondido -->
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        multiple
        @change="handleFiles"
      />
    </div>

    <!-- Preview das imagens -->
    <div v-if="previews.length" class="mt-4 flex flex-wrap gap-3 hover:cursor-pointer">
      <div
        v-for="(src, index) in previews"
        :key="index"
        class="relative w-24 p-1 h-24 border border-dashed border-transparent rounded overflow-hidden hover:scale-97 hover:border-red-700"
        @click="previews.splice(index, 1)"
      >
        <img :src="src" class="object-cover w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();


const fileInput = ref<HTMLInputElement | null>(null);
const previews = ref<string[]>([]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFiles = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;
  const list = Array.from(files);
  previews.value = list.map((file) => URL.createObjectURL(file));
  emit("update:files", list); // envia pro pai
};

const handleDrop = (event: DragEvent) => {
  if (!event.dataTransfer?.files) return;
  const files = event.dataTransfer.files;
  previews.value = Array.from(files).map((file) => URL.createObjectURL(file));
};
</script>
