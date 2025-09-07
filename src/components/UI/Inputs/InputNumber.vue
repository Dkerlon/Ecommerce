<template>
  <input class="outline-none w-full border text-sm border-[#e5e7eb] p-2 rounded-lg focus:ring-2 focus:ring-blue-500" type="number" id="search" :placeholder="placeHolder">
</template>

<script setup lang="ts">
defineProps<{
    placeHolder: string
}>()
</script>
