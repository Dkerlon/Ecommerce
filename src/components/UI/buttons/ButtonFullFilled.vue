<template>
    <button class="text-sm bg-blue-600 text-white py-2 px-5 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 flex items-center gap-2 justify-center">
      <slot name="img-start"></slot>
      {{ text }}
      <slot name="img-end"></slot>
    </button>
</template>

<script setup lang=ts>
defineProps<{
    text?: string
}>()
</script>
